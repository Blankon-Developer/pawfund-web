import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { FundraiserAccountData, SupporterAccountData } from "../types"

async function fundraiser(
  options?: Omit<ApiClientRequestOptions, "method">
): Promise<FundraiserAccountData> {
  const res = await apiClient.get<FundraiserAccountData>(
    "/fundraiser/profile",
    options
  )
  return res.data
}

async function supporter(
  options?: Omit<ApiClientRequestOptions, "method">
): Promise<SupporterAccountData> {
  const res = await apiClient
    .get<SupporterAccountData>("/supporter/profile", options)
    .catch((err) => {
      console.log(err)
      throw err
    })
  return res.data
}

export const getAccount = {
  fundraiser,
  supporter,
}
