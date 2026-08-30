"use client"

import { CompoundedPagination } from "@/components/compounded-pagination"
import { MainContainer } from "@/components/main-container"
import { H5, Text } from "@/components/typography"
import { useSearchParameters } from "@/hooks/search-parameters"
import { Button } from "@/shadcn-ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shadcn-ui/empty"
import { Skeleton } from "@/shadcn-ui/skeleton"
import { cn } from "@/utils"
import { ArrowLeftIcon, FolderIcon, PlusIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useGetMyCampaigns } from "@/features/campaign/api"
import { FundraiserCampaignCard } from "@/features/campaign/components"

import { CampaignsSort } from "../components/campaigns-sort"
import { searchParamsSchema } from "../schema"

function MyCampaignListPage() {
  const router = useRouter()

  const {
    state: searchParamsState,
    remove: removeSearchParams,
    setMany: setSearchParams,
  } = useSearchParameters(searchParamsSchema.myCampaignList)
  const { sortBy, page, pageSize } = searchParamsState

  const { data, isLoading } = useGetMyCampaigns({
    params: {
      sortBy,
      page,
      pageSize,
    },
  })

  const { campaigns, pagination } = data ?? {}

  const isCampaignsEmpty = !campaigns || campaigns.length === 0

  return (
    <MainContainer as="div" className="relative min-h-svh">
      <header
        className={`sticky top-0 z-30 flex h-[4.5rem] items-center justify-between bg-background`}
      >
        <div className="flex w-full items-center gap-2">
          <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
            <ArrowLeftIcon strokeWidth={2.1} />
          </Button>
          <H5>Campaign Created</H5>
        </div>
      </header>

      <main className="h-[calc(100svh-4.5rem)] scroll-fade scrollbar-none space-y-4 overflow-y-auto pb-4">
        <div>
          <Text className="font-medium">
            You have{" "}
            <span>
              {isLoading ? (
                <span className="inline-block h-3 w-4 animate-pulse rounded-md bg-card" />
              ) : (
                pagination?.totalItems
              )}
            </span>{" "}
            campaigns that have been created.
          </Text>
          <Text variant={"caption"}>
            Manage the campaigns, view their status and progres and take action
            to update and withdraw them.
          </Text>
        </div>

        <CampaignsSort
          className={cn(isCampaignsEmpty && "hidden")}
          sortBy={sortBy}
          onSortChange={(sortBy) => setSearchParams({ sortBy })}
          onRemove={() => removeSearchParams("sortBy")}
        >
          <CampaignsSort.Items />
        </CampaignsSort>

        {isLoading ? (
          Array.from({ length: 10 }).map((_, idx) => (
            <Skeleton className="h-60 w-full" key={idx} />
          ))
        ) : (
          <div className="space-y-10 sm:space-y-6">
            {campaigns?.map((campaign, idx) => (
              <FundraiserCampaignCard key={idx} {...campaign} />
            ))}
          </div>
        )}

        {isCampaignsEmpty && (
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderIcon />
              </EmptyMedia>
              <EmptyTitle className="text-base">Nothing to see here</EmptyTitle>
              <EmptyDescription className="text-sm">
                No campaigns have been created yet. Get started by creating your
                first campaign
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild variant="outline" size={"sm"}>
                <Link href={"/create-campaign"}>
                  <PlusIcon data-icon="inline-start" />
                  Create Campaign
                </Link>
              </Button>
            </EmptyContent>
          </Empty>
        )}

        <CompoundedPagination
          className={cn(isCampaignsEmpty && "hidden")}
          disabled={isCampaignsEmpty}
          isLoading={isLoading}
          pagination={{
            current: data?.pagination?.current ?? 1,
            pageSize: data?.pagination?.pageSize ?? 12,
            totalItems: data?.pagination?.totalItems ?? 0,
            totalPages: data?.pagination?.totalPages ?? 1,
          }}
          onPageChange={(page, pageSize) => setSearchParams({ page, pageSize })}
        />
      </main>
    </MainContainer>
  )
}

export { MyCampaignListPage }
