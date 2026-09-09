import { Role } from "./auth.types"

export type RegisterSupporterParams = {
  name: string
  email: string
  imageObjectKey?: string
}
export type RegisterSupporterResponse = {
  name: string
  email: string
  walletAddress: string
  imageUrl?: string
  role: Role
}

export type RegisterFundraiserResponse = {
  name: string
  email: string
  contactPerson: {
    name: string
    phone: string
  }
  socialUrl: string
  country: string
  zipCode: string
  imageUrl?: string
  walletAddress: string
  role: Role
}

export type RegisterFundraiserParams = {
  name: string
  email: string
  contactPerson: {
    name: string
    phone: string
  }
  socialUrl: string
  country: string
  zipCode: string
  imageObjectKey?: string
}
