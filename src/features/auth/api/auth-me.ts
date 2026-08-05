import { apiClient } from "@/lib/api-client"
import { AuthMeData } from "../types/auth.types"

const getAuthMe = async (token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined

  const res = await apiClient.get<AuthMeData>("/auth/me", {
    headers,
  })
  return res.data
}

export { getAuthMe }
