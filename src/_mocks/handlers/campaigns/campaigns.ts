import type { CampaignItemData, CampaignStatus } from "@/features/public"
import { ApiSuccessType } from "@/types/api.types"
import { buildApiUrl } from "@/utils/build-url"
import { http, HttpResponse } from "msw"

export function generateCampaigns(count: number): CampaignItemData[] {
  return Array.from({ length: count }, (_, index) => {
    const goalAmount = 10_000_000 + index * 5_000_000
    const progress = Math.random()
    const raisedAmount = Math.floor(goalAmount * progress)

    const status: CampaignStatus = progress >= 1 ? "COMPLETED" : "ACTIVE"

    return {
      id: crypto.randomUUID(),
      title: `Campaign ${index + 1} - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      shortDescription: `This is the description for campaign ${index + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      goalAmount,
      raisedAmount,
      donorCount: Math.floor(Math.random() * 1000),
      campaignImageUrl: `https://picsum.photos/seed/campaign-${index}/800/600`,
      fundraiserImageUrl: `https://picsum.photos/seed/fundraiser-${index}/200/200`,
      endAt: new Date(
        Date.now() + (index + 1) * 24 * 60 * 60 * 1000
      ).toISOString(),
      createdAt: new Date(
        Date.now() - (index + 1) * 24 * 60 * 60 * 1000
      ).toISOString(),
      contractAddress: `0x${crypto.randomUUID().replace(/-/g, "").slice(0, 40)}`,
      status,
    }
  })
}

export const getCampaigns = http.get(buildApiUrl("/campaigns"), () => {
  return HttpResponse.json<ApiSuccessType<CampaignItemData[]>>(
    {
      code: "SUCCESS",
      message: "Campaigns fetched successfully.",
      data: generateCampaigns(10),
    },
    { status: 200 }
  )
})
