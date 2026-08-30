import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { QueryConfig } from "@/lib/react-query"
import {
  FundariserCampaignItemData,
  FundraiserCampaignStatus,
} from "../types/fundraiser-campaign.types"

type SortBy = "newest" | "oldest" | "close-to-goal" | "most-donated"

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

const getCampaignsQueryOptions = (params?: GetCampaignsParams) =>
  queryOptions({
    queryKey: Object.values(params ?? {}).every((value) => value === undefined)
      ? ["public", "get-campaigns"]
      : ["public", "get-campaigns", params],
    queryFn: () => getMyCampaigns(params),
  })

type UseGetMyCampaignsOptions = {
  params?: GetCampaignsParams
  queryConfig?: QueryConfig<typeof getCampaignsQueryOptions>
}

const useGetMyCampaigns = ({
  params,
  queryConfig,
}: UseGetMyCampaignsOptions = {}) => {
  return useQuery({
    ...getCampaignsQueryOptions(params),
    ...queryConfig,
  })
}

export { getMyCampaigns, useGetMyCampaigns, getCampaignsQueryOptions }
