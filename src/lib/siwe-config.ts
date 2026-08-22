import { getAuthMe, getMessage, verifySignature } from "@/features/auth"
import { useJWTStore } from "@/stores/jwt.store"
import { useSiweSessionStore } from "@/stores/siwe-session.store"
import type {
  SIWECreateMessageArgs,
  SIWESession,
  SIWEVerifyMessageArgs,
} from "@reown/appkit-siwe"
import { createSIWEConfig } from "@reown/appkit-siwe"
import { baseSepolia } from "viem/chains"
import { queryClient } from "./react-query"
import { getAuthMeQueryOptions } from "@/features/auth"

const siweConfig = createSIWEConfig({
  getMessageParams: async () => ({
    domain: typeof window !== "undefined" ? window.location.host : "",
    uri: typeof window !== "undefined" ? window.location.origin : "",
    chains: [baseSepolia.id],
  }),
  createMessage: ({ nonce: message }: SIWECreateMessageArgs) => {
    return message
  },
  getNonce: async (address) => {
    if (!address) {
      throw new Error("Address is required to get nonce.")
    }

    const message = getMessage({
      address: address,
    }).then((res) => {
      if (!res?.message) {
        throw new Error("Failed to retrieve message/nonce from server.")
      }
      return res.message
    })

    return message
  },
  getSession: async () => {
    try {
      const session = useSiweSessionStore.getState().getSession()
      if (!session) {
        return null
      }
      const authMe = await queryClient
        .fetchQuery({
          queryKey: getAuthMeQueryOptions({ token: session.jwt }).queryKey,
          queryFn: () => getAuthMe({ token: session.jwt }),
          staleTime: 5 * 60 * 1000,
        })
        .then((res) => {
          if (!res) return null
          useJWTStore.getState().setToken(session.jwt)

          return {
            address: res.address,
            chainId: res.chainId,
          } satisfies SIWESession
        })
        .catch((err) => {
          throw err
        })

      return authMe
    } catch (error) {
      console.error("Error getting SIWE session:", error)
      return null
    }
  },
  verifyMessage: async ({ message, signature }: SIWEVerifyMessageArgs) => {
    try {
      const { accessToken, ...user } = await verifySignature({
        signature: signature,
        message: message,
      }).then((res) => {
        if (!res) {
          throw new Error("Invalid signature.")
        }
        return res
      })

      const addSession = useSiweSessionStore.getState().addSession
      useJWTStore.getState().setToken(accessToken)
      queryClient.invalidateQueries({
        queryKey: getAuthMeQueryOptions().queryKey,
      })

      addSession({
        address: user.address,
        chainId: user.chainId,
        jwt: accessToken,
        user,
      })

      return Boolean(accessToken)
    } catch (error) {
      console.error("Error verifying SIWE message:", error)
      return false
    }
  },
  signOut: async () => {
    try {
      useSiweSessionStore.getState().removeSession()
      useJWTStore.getState().clearToken()
      return true
    } catch (error) {
      console.error("Error signing out:", error)
      return false
    }
  },
})

export { siweConfig }
