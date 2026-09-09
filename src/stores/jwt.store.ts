import { create } from "zustand"
import { createJSONStorage, persist, StateStorage } from "zustand/middleware"

type JWTStore = {
  token?: string | null
  setToken: (token: string) => void
  clearToken: () => void
}

const JWT_COOKIE_NAME = "@pawfund/jwt"

const jwtStorage: StateStorage = {
  getItem(name) {
    if (typeof document === "undefined") {
      return null
    }

    const cookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(`${name}=`))

    const token = cookie ? decodeURIComponent(cookie.split("=")[1]) : undefined

    if (!cookie) return null

    return JSON.stringify({
      state: {
        token: token,
      },
      version: 1,
    })
  },

  setItem(name, value) {
    if (typeof document === "undefined") {
      return
    }

    const parsed = JSON.parse(value)
    const token = parsed?.state?.token

    document.cookie = [
      `${name}=${encodeURIComponent(token)}`,
      "Path=/",
      "Max-Age=Session",
      "SameSite=Lax",
    ].join("; ")
  },

  removeItem(name) {
    if (typeof document === "undefined") {
      return
    }
    document.cookie = `${name}=; Path=/; Max-Age=0`
  },
}

const useJWTStore = create<JWTStore>()(
  persist(
    (set) => ({
      clearToken: () => set({ token: "" }),
      setToken: (token: string) => set({ token }),
    }),
    {
      name: JWT_COOKIE_NAME,
      storage: createJSONStorage(() => jwtStorage),
      version: 1,
    }
  )
)

export { useJWTStore, JWT_COOKIE_NAME }
