import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { QueryConfig } from "@/lib/react-query"
import { useSiweSessionStore } from "@/stores/siwe-session.store"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { AuthMeData } from "../types/auth.types"
import { cache } from "react"

type AuthMeParams = {
  token?: string
}

const authMeRoot = async (
  params?: AuthMeParams,
  options?: Omit<ApiClientRequestOptions, "method">
): Promise<AuthMeData | undefined> => {
  const bearerToken = params?.token

  const res = await apiClient.get<AuthMeData>("/auth/me", {
    bearerToken,
    ...options,
  })
  return res.data
}

const getAuthMe = Object.assign(authMeRoot, {
  cache: cache(authMeRoot),
})

const getAuthMeQueryOptions = (params?: AuthMeParams) =>
  queryOptions({
    queryKey: params?.token
      ? ["auth", "auth-me", params.token]
      : ["auth", "auth-me"],
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
  queryConfig?: QueryConfig<typeof getAuthMeQueryOptions>
}

const useGetAuthMe = ({ queryConfig }: UseGetAuthMeOptions = {}) => {
  const token = useSiweSessionStore((state) => state.session?.jwt)

  const query = useQuery({
    ...getAuthMeQueryOptions({ token: token ?? undefined }),
    ...queryConfig,
  })

  const isRegistered = !!query.data?.role

  return {
    ...query,
    isRegistered,
  }
}

export { getAuthMe, getAuthMeQueryOptions, useGetAuthMe }
