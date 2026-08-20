import { create } from "zustand"

type AccountFormState = {
  isDirty: boolean
  setIsDirty: (isDirty: boolean) => void
}

const useAccountFormStore = create<AccountFormState>((set) => ({
  isDirty: false,
  setIsDirty: (isDirty) => set({ isDirty }),
}))

export { useAccountFormStore }
