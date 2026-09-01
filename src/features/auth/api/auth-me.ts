import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { AuthMeData } from "../types/auth.types"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { QueryConfig } from "@/lib/react-query"
import { useJWTStore } from "@/stores/jwt.store"
import { ApiError } from "@/utils/api-error"
import { useSiweSessionStore } from "@/stores/siwe-session.store"
import { baseSepolia } from "viem/chains"

type AuthMeParams = {
  token?: string
}

const getAuthMe = async (
  params?: AuthMeParams,
  options?: Omit<ApiClientRequestOptions, "method">
): Promise<AuthMeData | undefined> => {
  const bearerToken = params?.token ? `Bearer ${params.token}` : null

  try {
    const res = await apiClient.get<AuthMeData>("/auth/me", {
      headers: {
        ...options?.headers,
        ...(bearerToken ? { Authorization: bearerToken } : {}),
      },
      ...options,
    })
    return res.data
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        const session =
          typeof window !== "undefined"
            ? useSiweSessionStore.getState().getSession()
            : null
        return {
          address: session?.address ?? "",
          chainId: session?.chainId ?? baseSepolia.id,
          imageUrl: null,
          isNotRegistered: true,
          name: null,
          role: null,
        }
      }
    }
    throw error
  }
}

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
  const token = useJWTStore((state) => state.token)

  const query = useQuery({
    ...getAuthMeQueryOptions({ token: token ?? undefined }),
    ...queryConfig,
  })

  const isAuthenticated = !!query.data?.role

  return {
    ...query,
    isAuthenticated,
  }
}

export { getAuthMe, useGetAuthMe, getAuthMeQueryOptions }
