import { queryOptions, useQuery } from "@tanstack/react-query"
import { getMyDonations } from "@/features/donation/_shared/api"
import { QueryConfig } from "@/lib/react-query"

type Params = Parameters<typeof getMyDonations>[0]

type UseGetMyDonationsOptions = {
  params?: Params
  queryConfig?: QueryConfig<typeof getMyDonations>
}

const getMyDonationsQueryOptions = (params: Params = {}) =>
  queryOptions({
    queryKey: Object.values(params).every((value) => value === undefined)
      ? ["get-my-donations"]
      : ["get-my-donations", params],
    queryFn: () => getMyDonations(params),
  })

const useGetMyDonations = ({
  params,
  queryConfig,
}: UseGetMyDonationsOptions = {}) => {
  return useQuery({
    ...getMyDonationsQueryOptions(params),
    ...queryConfig,
  })
}

export { useGetMyDonations, getMyDonationsQueryOptions }
