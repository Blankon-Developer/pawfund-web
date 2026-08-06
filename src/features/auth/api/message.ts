import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"

type MessageParams = {
  address: string
}

const getMessage = async (
  params: MessageParams,
  options?: Omit<ApiClientRequestOptions, "body" | "method">
) => {
  const { address } = params
  const body = {
    address: address,
  }
  const res = await apiClient.post<{ message: string }, { address: string }>(
    "/auth/message",
    body,
    options
  )
  return res.data
}

export { getMessage }
