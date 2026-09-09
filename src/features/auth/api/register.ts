import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import {
  RegisterFundraiserParams,
  RegisterFundraiserResponse,
  RegisterSupporterParams,
  RegisterSupporterResponse,
} from "../types/register.types"

async function supporter(
  params: RegisterSupporterParams,
  options?: Omit<ApiClientRequestOptions, "body" | "method">
) {
  const res = await apiClient.post<
    RegisterSupporterResponse,
    RegisterSupporterParams
  >("/register/supporter", params, options)

  return res.data
}

async function fundraiser(
  params: RegisterFundraiserParams,
  options?: Omit<ApiClientRequestOptions, "body" | "method">
) {
  const res = await apiClient.post<
    RegisterFundraiserResponse,
    RegisterFundraiserParams
  >("/register/fundraiser", params, options)

  return res.data
}

async function getPresignImage(
  params: {
    contentType: "image/jpeg" | "image/png" | "image/webp" | string
    size: number
  },
  options?: Omit<ApiClientRequestOptions, "body" | "method">
) {
  const res = await apiClient.post<{
    objectKey: string
    url: string
  }>("/uploads/profile-image/presign", params, options)

  return res.data
}

async function uploadImage(image: File) {
  try {
    const { objectKey, url: presignUrl } =
      (await getPresignImage({
        contentType: image.type,
        size: image.size,
      })) || {}

    if (!presignUrl || !objectKey) throw new Error("Failed to get presign URL")

    await fetch(presignUrl, {
      method: "PUT",
      body: image,
      headers: {
        "Content-Type": image.type,
      },
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to upload image")
    })

    return {
      objectKey,
    }
  } catch (error) {
    throw error
  }
}

export const register = {
  supporter,
  fundraiser,
  getPresignImage,
  uploadImage,
}
