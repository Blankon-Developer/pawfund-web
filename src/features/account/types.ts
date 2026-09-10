export type FundraiserAccountData = {
  name: string
  email: string
  contactPerson: {
    name: string
    phone: string
  }
  socialUrl: string
  country: string
  zipCode: number
  imageUrl: string | null
  walletAddress: string
}

export type SupporterAccountData = {
  name: string
  email: string
  walletAddress: string
  imageUrl: string | null
}
