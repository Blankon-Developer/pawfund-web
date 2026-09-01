import { AuthMeData } from "@/features/auth"
import { ApiErrorType, ApiSuccessType } from "@/types/api.types"
import { buildApiUrl } from "@/utils/build-url"
import { SignJWT } from "jose"
import { http, HttpResponse } from "msw"
import { createPublicClient, http as httpTransport } from "viem"
import { baseSepolia } from "viem/chains"

const client = createPublicClient({
  chain: baseSepolia,
  transport: httpTransport(),
})

const accounts: AuthMeData[] = [
  {
    address: "0xF7E86ad7c0E09F3498381d2AaE5F66D3DB2b6Ea4",
    name: "Account 1",
    role: "fundraiser",
    imageUrl:
      "https://picsum.photos/seed/0xF7E86ad7c0E09F3498381d2AaE5F66D3DB2b6Ea4/200",
    isNotRegistered: false,
    chainId: baseSepolia.id,
  },
  {
    address: "0xCbbE0715ea8A2FE659e46B51b0C0df0291D06D81",
    name: "Account 2",
    role: "supporter",
    imageUrl:
      "https://picsum.photos/seed/0xCbbE0715ea8A2FE659e46B51b0C0df0291D06D81/200",
    isNotRegistered: false,
    chainId: baseSepolia.id,
  },
]

export const verify = http.post<never, { signature: string; message: string }>(
  buildApiUrl("/auth/verify"),
  async ({ request }) => {
    const body = await request.clone().json()

    if (!body.signature || !body.message) {
      return HttpResponse.json<ApiErrorType>(
        {
          code: "BAD_REQUEST",
          message: "Signature and message are required.",
        },
        { status: 400 }
      )
    }

    const address = body.message.match(/0x[a-fA-F0-9]{40}/)?.[0]

    const isValid = await client.verifyMessage({
      address: address as `0x${string}`,
      message: body.message,
      signature: body.signature as `0x${string}`,
    })

    if (!isValid) {
      return HttpResponse.json<ApiErrorType>(
        {
          code: "UNAUTHORIZED",
          message: "Invalid signature.",
        },
        { status: 401 }
      )
    }

    const account = accounts.find((acc) => acc.address === address)

    const data: AuthMeData = {
      name: account?.name || null,
      role: account?.role || null,
      imageUrl: account?.imageUrl || null,
      address: address!,
      isNotRegistered: account?.isNotRegistered ?? true,
      chainId: account?.chainId || baseSepolia.id,
    }

    try {
      const accessToken = await new SignJWT(data)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(new TextEncoder().encode("SECRET"))

      return HttpResponse.json<
        ApiSuccessType<typeof data & { accessToken: string }>
      >(
        {
          code: "SUCCESS",
          message: "Signature verified successfully.",
          data: { ...data, accessToken },
        },
        { status: 200 }
      )
    } catch (error) {
      console.log({ error })
      return HttpResponse.json<ApiErrorType>(
        {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate access token.",
        },
        { status: 500 }
      )
    }
  }
)
