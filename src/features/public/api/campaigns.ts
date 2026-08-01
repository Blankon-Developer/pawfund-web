import { apiClient } from "@/lib/api-client"
import { CampaignItem } from "../types/campaign.types"

const getCampaigns = async () => {
  const res = await apiClient.get<CampaignItem[]>("/campaigns")
  return res.data
}

export { getCampaigns }
