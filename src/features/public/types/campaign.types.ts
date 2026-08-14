export type CampaignStatus = "ACTIVE" | "COMPLETED" | "CANCELLED"

export type CampaignItemData = {
  id: string
  title: string
  shortDescription: string
  goalAmount: number
  raisedAmount: number
  donorCount: number
  campaignImageUrl: string
  fundraiserImageUrl: string
  /**
   * The date and time when the campaign ends, in ISO 8601 format.
   * Example:
   * "2023-12-31T23:59:59Z"
   */
  endAt: string
  /**
   * The date and time when the campaign was created, in ISO 8601 format.
   * Example:
   * "2023-12-31T23:59:59Z"
   */
  createdAt: string
  contractAddress: string
  status: CampaignStatus
}

export type CampaignDetailData = {
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
