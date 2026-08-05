import { create } from "zustand"
import { AuthMeData } from "../types/auth.types"

type User = AuthMeData

type UserStore = {
  user?: User
  setUser: (user: User) => void
  clearUser: () => void
}

const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: undefined }),
}))

export { useUserStore }
