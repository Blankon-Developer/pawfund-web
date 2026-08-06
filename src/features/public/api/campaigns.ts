import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { CampaignItem } from "../types/campaign.types"

const getCampaigns = async (
  options?: Omit<ApiClientRequestOptions, "method">
) => {
  const res = await apiClient.get<CampaignItem[]>("/campaigns", options)
  return res.data
}

export { getCampaigns }
