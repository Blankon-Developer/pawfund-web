import { create } from "zustand"

type AccountFormState = {
  isDirty: boolean
  isSubmitting: boolean
  setIsDirty: (isDirty: boolean) => void
  setIsSubmitting: (isSubmitting: boolean) => void
}

const useAccountFormStore = create<AccountFormState>((set) => ({
  isDirty: false,
  isSubmitting: false,
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setIsDirty: (isDirty) => set({ isDirty }),
}))

export { useAccountFormStore }
