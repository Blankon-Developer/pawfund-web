import { queryOptions } from "@tanstack/react-query"
import { getAuthMe } from "../api/get-auth-me"
import { authedQueryKey, QueryConfig } from "@/lib/react-query"
import { useSiweSessionStore } from "@/stores/siwe-session.store"
import { useQuery } from "wagmi/query"

const getQueryOptions = (params?: Parameters<typeof getAuthMe>[0]) =>
  queryOptions({
    queryKey: params?.token
      ? authedQueryKey(["auth", "auth-me", params.token])
      : authedQueryKey(["auth", "auth-me"]),
    queryFn: async () => {
      if (!params?.token) {
        throw new Error("No token provided")
      }

      try {
        return await getAuthMe(params)
      } catch (error) {
        throw error
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 30 * (60 * 1000), // 30 Minutes
  })

type UseGetAuthMeOptions = {
  queryConfig?: QueryConfig<typeof getQueryOptions>
}

const useGetAuthMeRoot = ({ queryConfig }: UseGetAuthMeOptions = {}) => {
  const token = useSiweSessionStore((state) => state.session?.jwt)

  const query = useQuery({
    ...getQueryOptions({ token: token ?? undefined }),
    ...queryConfig,
  })

  const isRegistered = !!query.data?.role

  return {
    ...query,
    isRegistered,
  }
}

export const useGetAuthMe = Object.assign(useGetAuthMeRoot, {
  getQueryOptions
})
