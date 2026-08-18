import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { AuthMeData } from "../types/auth.types"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { QueryConfig } from "@/lib/react-query"
import { useJWTStore } from "@/stores/jwt.store"

type AuthMeParams = {
  token?: string
}

const getAuthMe = async (
  params?: AuthMeParams,
  options?: Omit<ApiClientRequestOptions, "method">
) => {
  const bearerToken = params?.token ? `Bearer ${params.token}` : null

  const res = await apiClient.get<AuthMeData>("/auth/me", {
    headers: {
      ...options?.headers,
      ...(bearerToken ? { Authorization: bearerToken } : {}),
    },
    ...options,
  })
  return res.data
}

const getAuthMeQueryOptions = (params: AuthMeParams) =>
  queryOptions({
    queryKey: ["auth", "me", params.token],
    queryFn: () => getAuthMe(params),
  })

type UseGetAuthMeOptions = {
  queryConfig?: QueryConfig<typeof getAuthMeQueryOptions>
}

const useGetAuthMe = ({ queryConfig }: UseGetAuthMeOptions) => {
  const token = useJWTStore((state) => state.token)

  return useQuery({
    ...getAuthMeQueryOptions({ token: token ?? undefined }),
    ...queryConfig,
  })
}

export { getAuthMe, useGetAuthMe, getAuthMeQueryOptions }
