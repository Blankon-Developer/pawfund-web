"use client"

import { Badge } from "@/components/reui/badge"
import type { getMyCampaigns } from "@/features/fundraiser/api/get-my-campaigns"
import { cn } from "@/utils"
import { XIcon } from "lucide-react"
import { createContext, useContext } from "react"

export type SortBy = NonNullable<
  NonNullable<Parameters<typeof getMyCampaigns>[0]>["sortBy"]
>

const sortItem: { label: string; value: SortBy }[] = [
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Oldest",
    value: "oldest",
  },
  {
    label: "Close to goal",
    value: "close-to-goal",
  },
  {
    label: "Most donated",
    value: "most-donated",
  },
]

type MyCampaignsSortValues = {
  sortBy?: SortBy
  onSortChange?: (value: SortBy) => void
  onRemove?: () => void
}

const MyCampaignsSortContext = createContext<MyCampaignsSortValues | null>(null)

const useMyCampaignsSort = () => {
  const context = useContext(MyCampaignsSortContext)
  if (!context) {
    throw new Error("useMyCampaignsSort must be used within MyCampaignsSort")
  }
  return context
}

function MyCampaignsSortRoot(
  props: {
    children: React.ReactNode
    className?: string
  } & MyCampaignsSortValues
) {
  const { sortBy, onSortChange, onRemove, className, children } = props
  return (
    <MyCampaignsSortContext.Provider value={{ sortBy, onSortChange, onRemove }}>
      <div className={cn("flex items-center gap-2", className)}>{children}</div>
    </MyCampaignsSortContext.Provider>
  )
}
function MyCampaignsSortItems() {
  const { onRemove, onSortChange, sortBy } = useMyCampaignsSort()

  return (
    <div className="flex flex-wrap items-center gap-2">
      {sortItem.map((item) => (
        <Badge
          className={cn(
            "h-6 px-2 hover:border-primary/20 hover:bg-primary/10 dark:hover:bg-primary/10",
            item.value !== sortBy && "cursor-pointer"
          )}
          key={item.value}
          variant={item.value === sortBy ? "primary-light" : "outline"}
          onClick={() => onSortChange?.(item.value)}
          size={"lg"}
        >
          {item.label}
          {item.value === sortBy && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRemove?.()
              }}
              className="-mr-1 flex size-4 items-center justify-center rounded-full hover:bg-primary/20"
            >
              <XIcon strokeWidth={2.2} />
            </button>
          )}
        </Badge>
      ))}
    </div>
  )
}

export const MyCampaignsSort = Object.assign(MyCampaignsSortRoot, {
  Items: MyCampaignsSortItems,
})
