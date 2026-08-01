import { apiClient } from "@/lib/api-client"
import { CampaignDetail } from "../types/campaign.types"

const getCampaignByAddress = async (address: string) => {
  const res = await apiClient.get<CampaignDetail>(`/campaigns/${address}`)
  return res.data
}

export { getCampaignByAddress }
