// eslint-disable-next-line local/no-cross-feature-deep-imports
import { MyDonationData, MyDonationStatus } from "@/features/donation/list"
import { ApiSuccessType, ApiValidationErrorType } from "@/types/api.types"
import { buildApiUrl } from "@/utils/build-url"
import { http, HttpResponse } from "msw"
import { parseUnits } from "viem"

const CAMPAIGN_TITLES = [
  "Emergency Surgery for Stray Dog Milo",
  "Medical Supplies & Food for Feline Sanctuary",
  "Rescue & Rehabilitation for Abandoned Puppies",
  "Winter Shelter Warmth & Blankets Campaign",
  "Spay & Neuter Initiative for Community Cats",
  "Wildlife Rescue Care & Nutrition Support",
  "Veterinary Hospital Critical Care Fund",
  "Paws & Care Shelter Expansion Project",
  "Emergency Relief for Neglected Farm Animals",
  "Nutritional Care & Vaccine Drive for Rescued Pets",
]

export function generateDonations(count: number): MyDonationData[] {
  return Array.from({ length: count }, (_, index) => {
    const title = CAMPAIGN_TITLES[index % CAMPAIGN_TITLES.length]
    const amount = [10, 25, 50, 100, 250, 500, 15, 30, 75, 120][index % 10]
    const statuses: MyDonationStatus[] = [
      "success",
      "success",
      "success",
      "refund",
      "pending",
      "failed",
    ]
    const status = index === 0 ? "success" : statuses[index % statuses.length]
    const donatedOn = new Date(
      Date.now() - (index * 6 + 1) * 3600 * 1000
    ).toISOString()
    const contractAddress = `0x${crypto.randomUUID().replace(/-/g, "").slice(0, 40)}`
    const txHash = `0x${crypto.randomUUID().replace(/-/g, "")}${crypto.randomUUID().replace(/-/g, "").slice(0, 32)}`

    return {
      amount: parseUnits(amount.toString(), 6).toString(),
      status,
      campaign: {
        title: `${title} #${index + 1}`,
        contractAddress,
      },
      donatedOn,
      txHash,
    }
  })
}

const ALL_DONATIONS = generateDonations(25)

export const getMyDonations = http.get(
  buildApiUrl("/supporter/donations"),
  async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const url = new URL(request.url)
    const pageParam = url.searchParams.get("page")
    const pageSizeParam = url.searchParams.get("pageSize")

    // Validation
    if (
      pageParam !== null &&
      (isNaN(Number(pageParam)) || Number(pageParam) < 1)
    ) {
      return HttpResponse.json<ApiValidationErrorType>(
        {
          code: "VALIDATION_ERROR",
          message: "One or more fields are invalid.",
          errors: {
            page: ["page must be an integer greater than or equal to 1."],
          },
        },
        { status: 422 }
      )
    }

    if (
      pageSizeParam !== null &&
      (isNaN(Number(pageSizeParam)) ||
        Number(pageSizeParam) < 1 ||
        Number(pageSizeParam) > 100)
    ) {
      return HttpResponse.json<ApiValidationErrorType>(
        {
          code: "VALIDATION_ERROR",
          message: "One or more fields are invalid.",
          errors: {
            pageSize: ["pageSize must be an integer between 1 and 100."],
          },
        },
        { status: 422 }
      )
    }

    const page = Math.max(1, Number(pageParam ?? 1))
    const pageSize = Math.max(1, Number(pageSizeParam ?? 10))

    // Results are ordered by blockchain event time from newest to oldest
    const sorted = [...ALL_DONATIONS].sort(
      (a, b) =>
        new Date(b.donatedOn).getTime() - new Date(a.donatedOn).getTime()
    )

    // Paginate
    const totalItems = sorted.length
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
    const safePage = Math.min(page, totalPages)
    const start = (safePage - 1) * pageSize
    const data = sorted.slice(start, start + pageSize)

    return HttpResponse.json<ApiSuccessType<MyDonationData[]>>(
      {
        code: "DONATIONS_RETRIEVED",
        message: "Donations retrieved successfully.",
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
