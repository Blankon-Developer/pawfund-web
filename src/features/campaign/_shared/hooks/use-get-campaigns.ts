import { queryOptions } from "@tanstack/react-query"
import { getCampaigns } from "../api"
import { publicQueryKey, QueryConfig } from "@/lib/react-query"
import { useQuery } from "wagmi/query"

type GetCampaignsParams = Parameters<typeof getCampaigns>[0]
const getQueryOptions = (params?: GetCampaignsParams) =>
  queryOptions({
    queryKey: Object.values(params ?? {}).every((value) => value === undefined)
      ? publicQueryKey(["get-campaigns"])
      : publicQueryKey(["get-campaigns", params]),
    queryFn: () => getCampaigns(params),
  })

type UseGetCampaignsOptions = {
  params?: GetCampaignsParams
  queryConfig?: QueryConfig<typeof getQueryOptions>
}

const useGetCampaignsRoot = ({
  params,
  queryConfig,
}: UseGetCampaignsOptions = {}) => {
  return useQuery({
    ...getQueryOptions(params),
    ...queryConfig,
  })
}

export const useGetCampaigns = Object.assign(useGetCampaignsRoot, getQueryOptions)
