import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { cache } from "react"
import { AuthMeData } from "../types/auth.types"

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

export { getAuthMe }
