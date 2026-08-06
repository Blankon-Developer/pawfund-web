import { ApiSuccessType } from "@/types/api.types"
import { buildApiUrl } from "@/utils/build-url"
import { http, HttpResponse } from "msw"

export const message = http.post<never, { address: string }>(
  buildApiUrl("/auth/message"),
  async ({ request }) => {
    const { address } = await request.clone().json()
    const message = `
      pawfund.com wants you to sign in with your Ethereum account:
      ${address}

      I want sign in with EVM Wallet to this app.

      URI: https://pawfund.com
      Version: ${"1"}
      Chain ID: ${"11111"}
      Nonce: ${"1209031"}
      Issued At: ${new Date().toISOString()}
    `
    return HttpResponse.json<ApiSuccessType>(
      {
        code: "SUCCESS",
        message: "Challenge nonce has been successfully created.",
        data: {
          message,
        },
      },
      { status: 200 }
    )
  }
)
