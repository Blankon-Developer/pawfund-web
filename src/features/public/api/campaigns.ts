import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { CampaignItemData } from "../types/campaign.types"

const getCampaigns = async (
  options?: Omit<ApiClientRequestOptions, "method">
) => {
  const res = await apiClient.get<CampaignItemData[]>("/campaigns", options)
  return res.data
}

export { getCampaigns }
