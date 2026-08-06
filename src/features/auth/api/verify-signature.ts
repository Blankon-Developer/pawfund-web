import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { AuthMeData } from "../types/auth.types"

type VerifySignatureParams = {
  address: string
  signature: string
}

const verifySignature = async (
  params: VerifySignatureParams,
  options?: Omit<ApiClientRequestOptions, "body" | "method">
) => {
  const { address, signature } = params
  const body: VerifySignatureParams = {
    address: address,
    signature: signature,
  }
  const res = await apiClient.post<
    AuthMeData & {
      accessToken: string
    },
    VerifySignatureParams
  >("/auth/verify", body, options)
  return res.data
}

export { verifySignature }
