import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { QueryConfig } from "@/lib/react-query"
import { SortBy } from "../list/types"
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

const getMyCampaignsQueryOptions = (params?: GetCampaignsParams) =>
  queryOptions({
    queryKey: Object.values(params ?? {}).every((value) => value === undefined)
      ? ["get-my-campaigns"]
      : ["get-my-campaigns", params],
    queryFn: () => getMyCampaigns(params),
  })

type UseGetMyCampaignsOptions = {
  params?: GetCampaignsParams
  queryConfig?: QueryConfig<typeof getMyCampaignsQueryOptions>
}

const useGetMyCampaigns = ({
  params,
  queryConfig,
}: UseGetMyCampaignsOptions = {}) => {
  return useQuery({
    ...getMyCampaignsQueryOptions(params),
    ...queryConfig,
  })
}

export { getMyCampaigns, useGetMyCampaigns, getMyCampaignsQueryOptions }
