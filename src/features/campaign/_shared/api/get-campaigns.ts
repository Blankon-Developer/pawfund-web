import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { CampaignItemData, CampaignStatus } from "../types"

type SortBy = "newest" | "oldest" | "close-to-goal" | "most-donated"

type GetCampaignsParams = {
  search?: string
  sortBy?: SortBy
  filter?: CampaignStatus
  page?: number
  pageSize?: number
}

const getCampaigns = async (
  params?: GetCampaignsParams,
  options?: Omit<ApiClientRequestOptions, "method" | "params">
) => {
  const res = await apiClient.get<CampaignItemData[]>("/campaigns", {
    ...options,
    params,
  })
  return { campaigns: res.data, pagination: res.pagination }
}

export { getCampaigns }
