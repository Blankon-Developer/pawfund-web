import { create } from "zustand"
import { Role } from "../types/auth.types"
import { SupporterRegisterValues } from "../components/register-forms/supporter-register"
import { FundraiserRegisterValues } from "../components/register-forms/fundraiser-register"

type RegistrationStore = {
  step: 1 | 2 | 3
  setStep: (step: 1 | 2 | 3) => void
  selectedRole?: Role
  setSelectedRole: (role: Role) => void
  supporterValues?: SupporterRegisterValues
  setSupporterValues: (values: SupporterRegisterValues) => void
  fundraiserValues?: FundraiserRegisterValues
  setFundraiserValues: (values: FundraiserRegisterValues) => void
}

const useRegistrationStore = create<RegistrationStore>((set) => ({
  step: 1,
  setStep: (step: 1 | 2 | 3) => set({ step }),
  selectedRole: undefined,
  setSelectedRole: (role: Role) => set({ selectedRole: role }),
  supporterValues: undefined,
  setSupporterValues: (values: SupporterRegisterValues) =>
    set({ supporterValues: values }),
  fundraiserValues: undefined,
  setFundraiserValues: (values: FundraiserRegisterValues) =>
    set({ fundraiserValues: values }),
}))

export { useRegistrationStore }
