import { AuthMeData } from "@/features/auth"
import type { SIWESession } from "@reown/appkit-siwe"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { useJWTStore } from "./jwt.store"

type SIWESessionExtended = SIWESession & {
  jwt: string
  user?: Omit<AuthMeData, "address" >
}

type SIWESessionStoreType = {
  session: SIWESessionExtended | null
  addSession: (session: SIWESessionExtended) => void
  getSession: () => SIWESessionExtended | null
  removeSession: () => void
}

const useSiweSessionStore = create<SIWESessionStoreType>()(
  persist(
    (set, get) => ({
      session: null,
      addSession: (session: SIWESessionExtended) => {
        set({ session })
        useJWTStore.getState().setToken(session.jwt)
      },
      getSession: () => {
        return get().session
      },
      removeSession: () => {
        set({ session: null })
        useJWTStore.getState().clearToken()
      },
    }),
    {
      name: "@pawfund/session",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export { useSiweSessionStore, type SIWESessionExtended }
