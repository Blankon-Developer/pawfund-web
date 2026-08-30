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

type FundariserCampaignItemData = {
  id: string
  title: string
  shortDescription: string
  goalAmount: number
  raisedAmount: number
  donorCount: number
  imageUrl: string
  endAt: string
  createdAt: string
  contractAddress: string
  status: FundraiserCampaignStatus
}

export type {
  FundraiserCampaignStatus,
  FundraiserCampaignDeployStatus,
  FundraiserCampaignDetailData,
  FundariserCampaignItemData,
}
