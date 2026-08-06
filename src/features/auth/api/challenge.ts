import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"

type ChallengeParams = {
  address: string
}

const getChallenge = async (
  params: ChallengeParams,
  options?: Omit<ApiClientRequestOptions, "body" | "method">
) => {
  const body = {
    address: params.address,
  }
  const res = await apiClient.post<{ challenge: string }, { address: string }>(
    "/auth/challenge",
    body,
    options
  )
  return res.data
}

export { getChallenge }
