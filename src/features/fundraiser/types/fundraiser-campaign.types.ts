type FundraiserCampaignStatus = "active" | "completed" | "cancelled"
type FundraiserCampaignDeployStatus =
  "pending" | "submitted" | "deployed" | "failed"

type FundraiserCampaignDetailData = {
  title: string
  shortDescription: string
  story: string
  goalAmount: number
  raisedAmount: number
  donorCount: number
  contractAddress: string
  endAt: string
  createdAt: string
  imageUrl?: string | null
  country: string
  zipCode: string
  status: FundraiserCampaignStatus
  deploymentStatus: FundraiserCampaignDeployStatus
}

export type {
  FundraiserCampaignStatus,
  FundraiserCampaignDeployStatus,
  FundraiserCampaignDetailData,
}
