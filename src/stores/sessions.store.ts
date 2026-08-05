import { AuthMeData } from "@/features/auth"
import { SIWXSession } from "@reown/appkit-siwx"
import { CaipNetworkId } from "@reown/appkit/react"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type PawfundSession = SIWXSession & {
  jwt: string
  user?: AuthMeData
}

type SessionsStoreType = {
  sessions?: PawfundSession[]
  addSession: (session: PawfundSession) => void
  setSessions: (sessions: PawfundSession[]) => void
  getSessions: (chainId: CaipNetworkId, address: string) => PawfundSession[]
  revokeSession: (chainId: CaipNetworkId, address: string) => void
}

const useSessionsStore = create<SessionsStoreType>()(
  persist(
    (set, get) => ({
      addSession: (session: PawfundSession) => {
        const currentSessions = get().sessions || []
        const updatedSessions = [session, ...currentSessions]
        set({ sessions: updatedSessions })
      },
      setSessions: (sessions: PawfundSession[]) => {
        set({ sessions })
      },
      getSessions: (chainId: CaipNetworkId, address: string) => {
        const currentSessions = get().sessions || []
        return currentSessions.filter(
          (session) =>
            session.data.chainId === chainId &&
            session.data.accountAddress === address
        )
      },
      revokeSession: (chainId: CaipNetworkId, address: string) => {
        const currentSessions = get().sessions || []
        const updatedSessions = currentSessions.filter(
          (session) =>
            !(
              session.data.chainId === chainId &&
              session.data.accountAddress === address
            )
        )
        set({ sessions: updatedSessions })
      },
    }),
    {
      name: "@pawfund/sessions",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export { useSessionsStore, type PawfundSession }
