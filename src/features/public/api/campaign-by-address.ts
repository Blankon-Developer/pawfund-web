import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { CampaignDetailData } from "../types/campaign.types"

type GetCampaignByAddressParams = {
  address: string
}

const getCampaignByAddress = async (
  params: GetCampaignByAddressParams,
  options?: Omit<ApiClientRequestOptions, "method">
) => {
  const res = await apiClient.get<CampaignDetailData>(
    `/campaigns/${params.address}`,
    options
  )
  return res.data
}

export { getCampaignByAddress }
