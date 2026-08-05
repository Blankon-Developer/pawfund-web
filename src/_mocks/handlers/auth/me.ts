import { AuthMeData } from "@/features/auth"
import { ApiErrorType, ApiSuccessType } from "@/types/api.types"
import { buildApiUrl } from "@/utils/build-url"
import { jwtVerify } from "jose"
import { http, HttpResponse } from "msw"

export const me = http.get<never>(
  buildApiUrl("/auth/me"),
  async ({ request }) => {
    const bearerToken = request.headers.get("Authorization")
    const token = bearerToken?.split(" ")[1]

    if (!token) {
      return HttpResponse.json<ApiErrorType>(
        {
          code: "UNAUTHORIZED",
          message: "Authorization token is missing.",
        },
        { status: 401 }
      )
    }

    let jwtPayload: AuthMeData | null

    try {
      // const decoded = jwt.verify(token, "SECRET")
      const { payload } = await jwtVerify<AuthMeData>(
        token,
        new TextEncoder().encode("SECRET")
      )
      jwtPayload = payload
    } catch (err) {
      const error = err as Error
      return HttpResponse.json<ApiErrorType>(
        {
          code: "UNAUTHORIZED",
          message: `Invalid token: ${error.message}`,
        },
        { status: 401 }
      )
    }

    if (!jwtPayload) {
      return HttpResponse.json<ApiErrorType>(
        {
          code: "UNAUTHORIZED",
          message: "Invalid token.",
        },
        { status: 401 }
      )
    }

    return HttpResponse.json<ApiSuccessType<AuthMeData>>(
      {
        code: "SUCCESS",
        message: "Challenge nonce has been successfully created.",
        data: jwtPayload,
      },
      { status: 200 }
    )
  }
)
