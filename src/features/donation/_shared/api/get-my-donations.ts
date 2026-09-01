import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { MyDonationData } from "@/features/donation/list"
import { Pagination } from "@/types/api.types"

type GetMyDonationParams = {
  page?: number
  pageSize?: number
}

type GetMyDonationReturn = {
  donations?: MyDonationData[]
  pagination?: Pagination
}

async function getMyDonations(
  params?: GetMyDonationParams,
  options?: Omit<ApiClientRequestOptions, "method" | "params">
): Promise<GetMyDonationReturn> {
  const res = await apiClient.get<MyDonationData[]>("/supporter/donations", {
    ...options,
    params,
  })

  return {
    donations: res.data,
    pagination: res.pagination,
  }
}

export { getMyDonations }
