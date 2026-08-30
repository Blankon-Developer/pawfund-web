import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { QueryConfig } from "@/lib/react-query"
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

const getCampaignsQueryOptions = (params?: GetCampaignsParams) =>
  queryOptions({
    queryKey: Object.values(params ?? {}).every((value) => value === undefined)
      ? ["get-campaigns"]
      : ["get-campaigns", params],
    queryFn: () => getCampaigns(params),
  })

type UseGetCampaignsOptions = {
  params?: GetCampaignsParams
  queryConfig?: QueryConfig<typeof getCampaignsQueryOptions>
}

const useGetCampaigns = ({
  params,
  queryConfig,
}: UseGetCampaignsOptions = {}) => {
  return useQuery({
    ...getCampaignsQueryOptions(params),
    ...queryConfig,
  })
}

export { getCampaigns, useGetCampaigns, getCampaignsQueryOptions }
