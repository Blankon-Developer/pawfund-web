import { apiClient } from "@/lib/api-client"
import { AuthMeData } from "../types/auth.types"

type BodyType = {
  address: string
  signature: string
}

type ResponseType = {
  accessToken: string
} & AuthMeData

const verifySignature = async (params: BodyType) => {
  const body: BodyType = {
    address: params.address,
    signature: params.signature,
  }
  const res = await apiClient.post<ResponseType, BodyType>("/auth/verify", body)
  return res.data
}

export { verifySignature }
