"use client"

import { CompoundedPagination } from "@/components/compounded-pagination"
import { MainContainer } from "@/components/main-container"
import { Badge } from "@/components/reui/badge"
import { H2, Text } from "@/components/typography"
import { CampaignCard, getCampaigns, useGetCampaigns } from "@/features/public"
import { useSearchParameters } from "@/hooks/search-parameters"
import { Button } from "@/shadcn-ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shadcn-ui/input-group"
import { Skeleton } from "@/shadcn-ui/skeleton"
import { cn } from "@/utils"
import { ArrowDownUpIcon, SearchIcon, XIcon } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import z from "zod"

type SortBy = NonNullable<
  NonNullable<Parameters<typeof getCampaigns>[0]>["sortBy"]
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

const searchParamsScema = z.object({
  search: z.string().optional().catch(undefined),
  sortBy: z
    .enum(sortItem.map((item) => item.value))
    .optional()
    .catch(undefined),
  page: z.coerce.number().int().optional().catch(undefined),
  pageSize: z.coerce.number().int().optional().catch(undefined),
})

function CampaignsPage() {
  const searchInputRef = useRef<HTMLInputElement>(null)

  const {
    state: searchParamsState,
    remove: removeSearchParams,
    setMany: setSearchParams,
  } = useSearchParameters(searchParamsScema)
  const { search, sortBy, page, pageSize } = searchParamsState

  const { data, isLoading: campaignsLoading } = useGetCampaigns({
    params: {
      search: search ? search.toLowerCase() : undefined,
      sortBy,
      page: page ?? 1,
      pageSize: pageSize ?? 12,
    },
  })

  const [searchInput, setSearchInput] = useState<string>(search ?? "")

  return (
    <MainContainer>
      <div className="space-y-1 text-center">
        <H2 className="pt-6 text-center font-heading font-normal">
          Find a Campaign
        </H2>
        <Text className="font-medium text-muted-foreground">
          Find ongoing campaigns and channel your support
        </Text>
      </div>
      <div className="mx-auto mt-6 flex max-w-xl items-center gap-2">
        <InputGroup>
          <InputGroupAddon align={"inline-start"}>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            ref={searchInputRef}
            placeholder="Title, fundraiser, or keyword..."
            value={searchInput}
            onChange={(e) => {
              const value = e.target.value.trimStart()
              setSearchInput(value)
              if (!value) {
                setSearchParams({ search: value })
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchParams({ search: searchInput, page: 1 })
                searchInputRef.current?.blur()
              }
            }}
          />
          <InputGroupAddon align={"inline-end"}>
            {searchInput.length > 0 && (
              <Button
                variant={"ghost"}
                size={"icon-xs"}
                onClick={() => {
                  setSearchInput("")
                  removeSearchParams("search")
                }}
              >
                <XIcon />
              </Button>
            )}
          </InputGroupAddon>
        </InputGroup>
        <Button
          onClick={() => {
            if (!searchInput) {
              return
            }
            setSearchParams({ search: searchInput, page: 1 })
            searchInputRef.current?.blur()
          }}
        >
          Search
        </Button>
      </div>

      <div className="mt-8 flex items-center gap-2">
        <span className="flex items-center gap-1 font-medium">
          <ArrowDownUpIcon className="size-4" />
          <span className="hidden sm:inline">Sort</span>
        </span>
        <div className="flex flex-wrap items-center gap-2 sm:ml-2">
          {sortItem.map((item) => (
            <Badge
              className={cn(
                "h-6 px-2 hover:border-primary/20 hover:bg-primary/10 dark:hover:bg-primary/10",
                item.value !== sortBy && "cursor-pointer"
              )}
              key={item.value}
              variant={item.value === sortBy ? "primary-light" : "outline"}
              onClick={() =>
                setSearchParams({
                  sortBy: item.value,
                })
              }
              size={"lg"}
            >
              {item.label}
              {item.value === sortBy && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeSearchParams("sortBy")
                  }}
                  className="-mr-1 flex size-4 items-center justify-center rounded-full hover:bg-primary/20"
                >
                  <XIcon strokeWidth={2.2} />
                </button>
              )}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {campaignsLoading &&
          Array.from({ length: 12 }).map((_, idx) => (
            <Skeleton key={idx} className="h-80 w-full max-w-xl rounded-2xl" />
          ))}

        {!campaignsLoading &&
          data?.campaigns?.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/campaign/${campaign.contractAddress}`}
            >
              <CampaignCard {...campaign} />
            </Link>
          ))}
      </div>

      <CompoundedPagination
        className="my-6"
        pagination={data?.pagination}
        isLoading={campaignsLoading}
        onPageChange={(page, size) => {
          if (size == pageSize) {
            setSearchParams({
              page,
            })
          } else {
            setSearchParams({
              page,
              pageSize: size,
            })
          }
        }}
      />
    </MainContainer>
  )
}

export { CampaignsPage }
