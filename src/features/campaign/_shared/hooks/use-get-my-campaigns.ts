import { authedQueryKey, QueryConfig } from "@/lib/react-query"
import { queryOptions } from "@tanstack/react-query"
import { getMyCampaigns } from "../api"
import { useQuery } from "wagmi/query"

type GetCampaignsParams = Parameters<typeof getMyCampaigns>[0]

const getQueryOptions = (params?: GetCampaignsParams) =>
  queryOptions({
    queryKey: Object.values(params ?? {}).every((value) => value === undefined)
      ? authedQueryKey(["get-my-campaigns"])
      : authedQueryKey(["get-my-campaigns", params]),
    queryFn: () => getMyCampaigns(params),
  })

type UseGetMyCampaignsOptions = {
  params?: GetCampaignsParams
  queryConfig?: QueryConfig<typeof getQueryOptions>
}

const useGetMyCampaignsRoot = ({
  params,
  queryConfig,
}: UseGetMyCampaignsOptions = {}) => {
  return useQuery({
    ...getQueryOptions(params),
    ...queryConfig,
  })
}

export const useGetMyCampaigns = Object.assign(useGetMyCampaignsRoot, {
  getQueryOptions,
})
