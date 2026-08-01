export type CampaignStatus = "ACTIVE" | "COMPLETED" | "CANCELLED"

export type CampaignItem = {
  id: string
  title: string
  shortDescription: string
  goalAmount: number
  raisedAmount: number
  donorCount: number
  campaignImageUrl: string
  fundraiserImageUrl: string
  endAt: string
  createdAt: string
  contractAddress: string
  status: CampaignStatus
}

export type CampaignDetail = {
  id: string
  title: string
  shortDescription: string
  story: string
  fundraiser: {
    name: string
    imageUrl: string
    address: string
    id: string
  }
  goalAmount: number
  raisedAmount: number
  donorCount: number
  contractAddress: string
  endAt: string
  createdAt: string
  imageUrl: string
  country: string
  zipCode: string
  status: CampaignStatus
}
