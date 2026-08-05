import { apiClient } from "@/lib/api-client"

const getChallenge = async (params: { address: string }) => {
  const body = {
    address: params.address,
  }
  const res = await apiClient.post<{ challenge: string }, { address: string }>(
    "/auth/challenge",
    body
  )
  return res.data
}

export { getChallenge }
