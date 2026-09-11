import { authedQueryKey, QueryConfig } from "@/lib/react-query"
import { queryOptions as queryOpt } from "@tanstack/react-query"
import { useQuery } from "wagmi/query"
import { getAccount } from "../api/get-account"

const queryOptions = {
  fundraiser: () =>
    queryOpt({
      queryKey: authedQueryKey(["get-my-account", "fundraiser"]),
      queryFn: () => getAccount.fundraiser(),
    }),
  supporter: () =>
    queryOpt({
      queryKey: authedQueryKey(["get-my-account", "supporter"]),
      queryFn: () => getAccount.supporter(),
    }),
}

function useGetFundraiserAccountRoot(
  queryConfig?: QueryConfig<typeof queryOptions.fundraiser>
) {
  return useQuery({
    ...queryOptions.fundraiser(),
    ...queryConfig,
  })
}

function useGetSupporterAccountRoot(
  queryConfig?: QueryConfig<typeof queryOptions.supporter>
) {
  return useQuery({
    ...queryOptions.supporter(),
    ...queryConfig,
  })
}

export const useGetFundraiserAccount = Object.assign(
  useGetFundraiserAccountRoot,
  {
    queryOptions: queryOptions.fundraiser,
  }
)
export const useGetSupporterAccount = Object.assign(
  useGetSupporterAccountRoot,
  {
    queryOptions: queryOptions.supporter,
  }
)
