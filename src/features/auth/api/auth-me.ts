import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { AuthMeData } from "../types/auth.types"

type AuthMeParams = {
  token?: string
}

const getAuthMe = async (
  params: AuthMeParams,
  options?: Omit<ApiClientRequestOptions, "method">
) => {
  const { token } = params
  const bearerToken = token ? `Bearer ${token}` : null

  const res = await apiClient.get<AuthMeData>("/auth/me", {
    headers: {
      ...options?.headers,
      ...(bearerToken ? { Authorization: bearerToken } : {}),
    },
    ...options,
  })
  return res.data
}

export { getAuthMe }
