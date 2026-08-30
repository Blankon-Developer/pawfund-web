import z from "zod"
import { SortBy } from "./types"

const myCampaignListSearchParams = z.object({
  sortBy: z
    .enum<readonly SortBy[]>([
      "newest",
      "oldest",
      "close-to-goal",
      "most-donated",
    ])
    .optional()
    .catch(undefined),
  page: z.coerce.number().int().optional().catch(undefined),
  pageSize: z.coerce.number().int().optional().catch(undefined),
})

const campaignListSearchParams = z.object({
  search: z.string().optional().catch(undefined),
  sortBy: z
    .enum<readonly SortBy[]>([
      "newest",
      "oldest",
      "close-to-goal",
      "most-donated",
    ])
    .optional()
    .catch(undefined),
  page: z.coerce.number().int().optional().catch(undefined),
  pageSize: z.coerce.number().int().optional().catch(undefined),
})

export const searchParamsSchema = {
  myCampaignList: myCampaignListSearchParams,
  campaignList: campaignListSearchParams,
}
