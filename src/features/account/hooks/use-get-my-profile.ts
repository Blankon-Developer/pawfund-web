import { QueryConfig } from "@/lib/react-query"
import { queryOptions as queryOpt } from "@tanstack/react-query"
import { useQuery } from "wagmi/query"
import { getMyAccount } from "../api/get-my-account"

const queryOptions = {
  fundraiser: () =>
    queryOpt({
      queryKey: ["get-my-account", "fundraiser"],
      queryFn: () => getMyAccount.fundraiser(),
    }),
  supporter: () =>
    queryOpt({
      queryKey: ["get-my-account", "supporter"],
      queryFn: () => getMyAccount.supporter(),
    }),
}

function useFundraiserAccount(
  queryConfig?: QueryConfig<typeof queryOptions.fundraiser>
) {
  return useQuery({
    ...queryOptions.fundraiser(),
    ...queryConfig,
  })
}

function useSupporterAccount(
  queryConfig?: QueryConfig<typeof queryOptions.supporter>
) {
  return useQuery({
    ...queryOptions.supporter(),
    ...queryConfig,
  })
}

const fundraiserAccount = Object.assign(useFundraiserAccount, {
  queryOptions: queryOptions.fundraiser,
})
const supporterAccount = Object.assign(useSupporterAccount, {
  queryOptions: queryOptions.supporter,
})

export {
  fundraiserAccount as useFundraiserAccount,
  supporterAccount as useSupporterAccount,
}
