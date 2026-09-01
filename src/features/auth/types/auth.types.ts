export type Role = "fundraiser" | "supporter"

export type AuthMeData = {
  name: string | null
  role: Role | null
  imageUrl: string | null
  address: string
  isNotRegistered: boolean
  chainId: number
}
