import { create } from "zustand"
import { Role } from "../types/auth.types"
import { SupporterRegisterValues } from "../components/register-forms/supporter-register"
import { FundraiserRegisterValues } from "../components/register-forms/fundraiser-register"

type Step = 1 | 2 | 3
type RegistrationStoreValue = {
  step: Step
  selectedRole?: Role
  supporterValues?: SupporterRegisterValues
  fundraiserValues?: FundraiserRegisterValues
}
type RegistrationStoreAction = {
  setStep: (step: Step) => void
  setSelectedRole: (role: Role) => void
  setSupporterValues: (values: SupporterRegisterValues) => void
  setFundraiserValues: (values: FundraiserRegisterValues) => void
  reset: () => void
}

const defaultValues: RegistrationStoreValue = {
  step: 1,
  selectedRole: undefined,
  supporterValues: undefined,
  fundraiserValues: undefined,
}

const useRegistrationStore = create<
  RegistrationStoreValue & RegistrationStoreAction
>((set) => ({
  ...defaultValues,
  setStep: (step: Step) => set({ step }),
  setSelectedRole: (role: Role) => set({ selectedRole: role }),
  setSupporterValues: (values: SupporterRegisterValues) =>
    set({ supporterValues: values }),
  setFundraiserValues: (values: FundraiserRegisterValues) =>
    set({ fundraiserValues: values }),
  reset: () => set(defaultValues),
}))

export { useRegistrationStore }
