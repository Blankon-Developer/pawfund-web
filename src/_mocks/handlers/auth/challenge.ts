import { ApiSuccessType } from "@/types/api.types"
import { buildApiUrl } from "@/utils/build-url"
import { http, HttpResponse } from "msw"

export const challenge = http.post<never, { address: string }>(
  buildApiUrl("/auth/challenge"),
  async ({ request }) => {
    const body = await request.clone().json()
    return HttpResponse.json<ApiSuccessType>(
      {
        code: "SUCCESS",
        message: "Challenge nonce has been successfully created.",
        data: {
          challenge: `nonce://${body.address}`,
        },
      },
      { status: 200 }
    )
  }
)
