import type { CampaignDetail } from "@/features/public"
import { ApiSuccessType } from "@/types/api.types"
import { buildApiUrl } from "@/utils/build-url"
import { http, HttpResponse } from "msw"

export const getCampaignByAddress = http.get<{ address: string }>(
  buildApiUrl("/campaigns/:address"),
  (req) => {
    const { address } = req.params
    return HttpResponse.json<ApiSuccessType<CampaignDetail>>(
      {
        code: "SUCCESS",
        message: "Campaigns fetched successfully.",
        data: {
          id: crypto.randomUUID(),
          title: `Campaign ${address} - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          shortDescription: `This is the description for campaign ${address}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
          goalAmount: 10_000_000,
          raisedAmount: 5_000_000,
          donorCount: 500,
          fundraiser: {
            name: `Fundraiser ${address}`,
            imageUrl: `https://picsum.photos/seed/fundraiser-${address}/200/200`,
            address: `0x${address}`,
            id: `fundraiser-${address}`,
          },
          imageUrl: `https://picsum.photos/seed/campaign-${address}/800/600`,
          endAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date(
            Date.now() - 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
          contractAddress: address,
          status: "ACTIVE",
          country: "Indonesia",
          zipCode: "12345",
          story: `This is the story for campaign ${address}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        },
      },
      { status: 200 }
    )
  }
)
