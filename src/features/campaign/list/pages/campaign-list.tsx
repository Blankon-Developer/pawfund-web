"use client"

import { CompoundedPagination } from "@/components/compounded-pagination"
import { MainContainer } from "@/components/main-container"
import { H2, Text } from "@/components/typography"
import { useSearchParameters } from "@/hooks/search-parameters"
import { Button } from "@/shadcn-ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shadcn-ui/input-group"
import { Skeleton } from "@/shadcn-ui/skeleton"
import { cn } from "@/utils"
import { SearchIcon, XIcon } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"

import { CampaignCard, useGetCampaigns } from "@/features/campaign"

import { CampaignsSort } from "../components/campaigns-sort"
import { searchParamsSchema } from "../schema"

function CampaignListPage() {
  const searchInputRef = useRef<HTMLInputElement>(null)

  const {
    state: searchParamsState,
    remove: removeSearchParams,
    setMany: setSearchParams,
  } = useSearchParameters(searchParamsSchema.campaignList)
  const { search, sortBy, page, pageSize } = searchParamsState

  const { data, isLoading: campaignsLoading } = useGetCampaigns({
    params: {
      search: search ? search.toLowerCase() : undefined,
      sortBy,
      page: page ?? 1,
      pageSize: pageSize ?? 12,
    },
  })

  const { campaigns } = data || {}

  const isCampaignsEmpty = !campaigns || campaigns.length === 0

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

      <CampaignsSort
        className={cn("mt-8", isCampaignsEmpty && "hidden")}
        sortBy={sortBy}
        onSortChange={(sortBy) => setSearchParams({ sortBy })}
        onRemove={() => removeSearchParams("sortBy")}
      >
        <CampaignsSort.Items />
      </CampaignsSort>

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

export { CampaignListPage }
