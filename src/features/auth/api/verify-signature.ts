import { apiClient, ApiClientRequestOptions } from "@/lib/api-client"
import { AuthMeData } from "../types/auth.types"

type VerifySignatureParams = {
  signature: string
  message: string
}

const verifySignature = async (
  params: VerifySignatureParams,
  options?: Omit<ApiClientRequestOptions, "body" | "method">
) => {
  const { signature, message } = params
  const body: VerifySignatureParams = {
    signature,
    message,
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
