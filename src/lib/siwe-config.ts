import { getMessage, verifySignature } from "@/features/auth"
import { useSiweSessionStore } from "@/stores/siwe-session.store"
import type {
  SIWECreateMessageArgs,
  SIWESession,
  SIWEVerifyMessageArgs,
} from "@reown/appkit-siwe"
import { createSIWEConfig } from "@reown/appkit-siwe"
import { baseSepolia } from "viem/chains"

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
    const session = useSiweSessionStore.getState().getSession()
    if (!session) {
      return null
    }

    return {
      address: session.address,
      chainId: session.chainId,
    } satisfies SIWESession
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
      return true
    } catch (error) {
      console.error("Error signing out:", error)
      return false
    }
  },
})

export { siweConfig }
