import { AuthMeData } from "@/features/auth"
import { SIWXSession } from "@reown/appkit-siwx"
import { CaipNetworkId } from "@reown/appkit/react"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type SIWXSessionsExtended = SIWXSession & {
  jwt: string
  user?: AuthMeData
}

type SIWXSessionsStoreType = {
  sessions?: SIWXSessionsExtended[]
  addSession: (session: SIWXSessionsExtended) => void
  setSessions: (sessions: SIWXSessionsExtended[]) => void
  getSessions: (chainId: CaipNetworkId, address: string) => SIWXSessionsExtended[]
  revokeSession: (chainId: CaipNetworkId, address: string) => void
}

const useSiwxSessionsStore = create<SIWXSessionsStoreType>()(
  persist(
    (set, get) => ({
      addSession: (session: SIWXSessionsExtended) => {
        const currentSessions = get().sessions || []
        const updatedSessions = [session, ...currentSessions]
        set({ sessions: updatedSessions })
      },
      setSessions: (sessions: SIWXSessionsExtended[]) => {
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

export { useSiwxSessionsStore, type SIWXSessionsExtended }
