import { getAuthMe, getChallenge, verifySignature } from "@/features/auth/"
import { useJWTStore } from "@/stores/jwt.store"
import { PawfundSession, useSessionsStore } from "@/stores/sessions.store"
import { SIWXMessage } from "@reown/appkit-siwx"
import { SIWXConfig } from "@reown/appkit/react"
import { env } from "./env"

const siwxConfig: SIWXConfig = {
  /*
   * Function to create a SIWX message for signing
   * This function retrieves a challenge from the server and constructs a SIWX message
   */
  createMessage: async (input) => {
    try {
      const response = await getChallenge({
        address: input.accountAddress,
      })

      if (!response?.challenge) {
        throw new Error("Failed to retrieve nonce from server.")
      }

      const message: SIWXMessage = {
        accountAddress: input.accountAddress,
        chainId: input.chainId,
        domain: env.NEXT_PUBLIC_BASE_URL.replace(/^https?:\/\//, ""),
        uri: env.NEXT_PUBLIC_BASE_URL,
        nonce: response.challenge,
        toString: () => {
          return message.nonce
        },
        version: "1",
      }

      return message
    } catch (error) {
      console.error("Error creating SIWX message:", error)
      throw error
    }
  },

  /*
   * Function to add a session after successful signature verification
   * This function verifies the signature and adds the session to the store
   */
  addSession: async (session) => {
    const exsistingSessions = useSessionsStore
      .getState()
      .getSessions(session.data.chainId, session.data.accountAddress)

    try {
      const verified = await verifySignature({
        address: session.data.accountAddress,
        signature: session.signature,
      })

      if (!verified) {
        throw new Error("Invalid session signature.")
      }

      const { accessToken, ...user } = verified

      useJWTStore.getState().setToken(accessToken)

      if (exsistingSessions.length > 0) {
        useSessionsStore
          .getState()
          .revokeSession(session.data.chainId, session.data.accountAddress)
      }

      useSessionsStore.getState().addSession({
        ...session,
        jwt: accessToken,
        user,
      })
    } catch (error) {
      console.error("Error adding session:", error)
      throw error
    }
  },

  /*
   * Function to set multiple sessions at once
   * This function verifies each session and updates the store with valid sessions
   */
  setSessions: async (sessions) => {
    if (sessions.length === 0) {
      useSessionsStore.getState().setSessions([])
      return
    }

    const verifiedSessions: (PawfundSession | null)[] = await Promise.all(
      sessions.map(async (session) => {
        try {
          const verified = await verifySignature({
            address: session.data.accountAddress,
            signature: session.signature,
          })

          if (!verified) {
            throw new Error("Invalid session signature.")
          }

          const { accessToken, ...user } = verified

          return {
            ...session,
            jwt: accessToken,
            user: user,
          }
        } catch (error) {
          console.error("Error verifying session:", error)
          return null
        }
      })
    )

    const validSessions = verifiedSessions.filter(
      (session): session is PawfundSession => session !== null
    )

    useSessionsStore
      .getState()
      .setSessions(validSessions.map((session) => session))
  },

  /*
   * Function to get all sessions for a specific chainId and address
   * This function retrieves sessions from the store and verifies them
   */
  getSessions: async (chainId, address) => {
    const sessions = useSessionsStore.getState().getSessions(chainId, address)

    const verifiedSessions = await Promise.all(
      sessions.map(async (session) => {
        try {
          const verified = await getAuthMe(session.jwt)

          if (!verified) {
            throw new Error("Invalid session JWT.")
          }
          useJWTStore.getState().setToken(session.jwt)

          return { ...session }
        } catch (error) {
          console.error("Error verifying session:", error)
          return null
        }
      })
    )

    const validSessions = verifiedSessions.filter(
      (session): session is PawfundSession => session !== null
    )
    return validSessions
  },

  /*
   * Function to revoke a session for a specific chainId and address
   * This function removes the session from the store
   */
  revokeSession: async (chainId, address) => {
    useSessionsStore.getState().revokeSession(chainId, address)
  },

  /*
   * Function to determine if a session is required for the current route
   */
  getRequired: () => {
    return true
  },

  /*
   * Function to determine if a session should be signed out on disconnect
   */
  signOutOnDisconnect: true,
}

export { siwxConfig }
