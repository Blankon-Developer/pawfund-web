import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { SortBy } from "../../list/types"
import { FundariserCampaignItemData, FundraiserCampaignStatus } from "../types"

type GetCampaignsParams = {
  sortBy?: SortBy
  filter?: FundraiserCampaignStatus
  page?: number
  pageSize?: number
}

const getMyCampaigns = async (
  params?: GetCampaignsParams,
  options?: Omit<ApiClientRequestOptions, "method" | "params">
) => {
  const res = await apiClient.get<FundariserCampaignItemData[]>(
    "/fundraiser/campaigns",
    {
      ...options,
      params,
    }
  )
  return { campaigns: res.data, pagination: res.pagination }
}

export { getMyCampaigns }
