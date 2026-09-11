import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"

export type EditFundraiserProfileParams = {
  name: string
  email: string
  imageObjectKey?: string | null
  contactPerson: {
    name: string
    phone: string
  }
  socialUrl: string
  country: string
  zipCode: string
}

export type EditSupporterProfileParams = {
  name: string
  email: string
  imageObjectKey?: string | null
}

async function fundraiser(
  params: EditFundraiserProfileParams,
  options?: Omit<ApiClientRequestOptions, "method" | "body">
): Promise<void> {
  await apiClient.put("/fundraiser/profile", params, options)
}

async function supporter(
  params: EditSupporterProfileParams,
  options?: Omit<ApiClientRequestOptions, "method" | "body">
): Promise<void> {
  await apiClient.put("/supporter/profile", params, options)
}

export const editAccount = {
  fundraiser,
  supporter,
}
