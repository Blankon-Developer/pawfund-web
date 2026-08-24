import type { CampaignItemData, CampaignStatus } from "@/features/public"
import { ApiSuccessType } from "@/types/api.types"
import { buildApiUrl } from "@/utils/build-url"
import { http, HttpResponse } from "msw"

export function generateCampaigns(count: number): CampaignItemData[] {
  return Array.from({ length: count }, (_, index) => {
    const goalAmount = 10_000_000 + index * 5_000_000
    const progress = Math.random()
    const raisedAmount = Math.floor(goalAmount * progress)

    const status: CampaignStatus = progress >= 1 ? "completed" : "active"

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

const ALL_CAMPAIGNS = generateCampaigns(100)

export const getCampaigns = http.get(
  buildApiUrl("/campaigns"),
  async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const url = new URL(request.url)
    const search = url.searchParams.get("search")?.toLowerCase() ?? ""
    const sortBy = url.searchParams.get("sortBy") ?? "newest"
    const filter = url.searchParams.get("filter") as CampaignStatus | null
    const page = Math.max(1, Number(url.searchParams.get("page") ?? 1))
    const pageSize = Math.max(1, Number(url.searchParams.get("pageSize") ?? 10))

    // 1. Filter
    let result = ALL_CAMPAIGNS.filter((c) => {
      const matchesSearch =
        !search ||
        c.title.toLowerCase().includes(search) ||
        c.shortDescription.toLowerCase().includes(search)

      const matchesFilter = !filter || c.status === filter

      return matchesSearch && matchesFilter
    })

    // 2. Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        case "close-to-goal":
          return b.raisedAmount / b.goalAmount - a.raisedAmount / a.goalAmount
        case "most-donated":
          return b.donorCount - a.donorCount
        case "newest":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
      }
    })

    // 3. Paginate
    const totalItems = result.length
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
    const safePage = Math.min(page, totalPages)
    const start = (safePage - 1) * pageSize
    const data = result.slice(start, start + pageSize)

    return HttpResponse.json<ApiSuccessType<CampaignItemData[]>>(
      {
        code: "SUCCESS",
        message: "Campaigns fetched successfully.",
        data,
        pagination: {
          current: safePage,
          pageSize,
          totalItems,
          totalPages,
        },
      },
      { status: 200 }
    )
  }
)
