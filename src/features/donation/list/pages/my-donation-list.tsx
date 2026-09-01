"use client"

import { BackButton } from "@/components/back-button"
import { MainContainer } from "@/components/main-container"
import { H5, Text } from "@/components/typography"
import { Button } from "@/shadcn-ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shadcn-ui/empty"
import { Skeleton } from "@/shadcn-ui/skeleton"
import { cn } from "@/utils"
import { formatRelativeDate } from "@/utils/format-date"
import { ArrowRightIcon, RefreshCwIcon } from "lucide-react"
import Link from "next/link"
import { formatUnits } from "viem"
import { MyDonationCard } from "../components"
import { useGetMyDonations } from "../hooks/use-my-donations"

type MyDonationListProps = {
  className?: string
}
function MyDonationListPage({ className }: MyDonationListProps) {
  const { data, isLoading, refetch, isFetching } = useGetMyDonations({
    params: {
      pageSize: 100,
    },
  })
  const { donations } = data || {}

  const handleRefetch = async () => {
    await refetch()
  }
  const isDonationsEmpty = (!donations || donations.length === 0) && !isLoading

  return (
    <MainContainer as="div" className="max-w-3xl">
      <header
        className={`sticky top-0 z-30 flex h-[4.5rem] items-center justify-between bg-background`}
      >
        <div className="flex w-full items-center gap-2">
          <BackButton className="-ml-3" />
          <H5>My Donations</H5>
        </div>
        <Button
          disabled={isFetching}
          onClick={handleRefetch}
          variant={"ghost"}
          size={"xs"}
        >
          <RefreshCwIcon className={isFetching ? "animate-spin" : ""} />
          Refresh
        </Button>
      </header>
      <main className="h-[calc(100svh-4.5rem)] scroll-fade scrollbar-none space-y-4 overflow-y-auto pb-4">
        <div>
          <Text className="font-medium">List the good deeds you have done</Text>
          <Text variant={"caption"}>
            Thank you for doing good, whatever you give is very useful for us,
          </Text>
        </div>
        <div hidden={isDonationsEmpty} className={cn("grid gap-2", className)}>
          {isLoading &&
            Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton className="h-28 w-full" key={idx} />
            ))}
          {donations?.map(({ amount, donatedOn, ...donation }, idx) => (
            <MyDonationCard
              key={idx}
              amount={formatUnits(BigInt(amount), 6)}
              donatedOn={formatRelativeDate(donatedOn)}
              {...donation}
            />
          ))}
        </div>

        {isDonationsEmpty && (
          <Empty className="border">
            <EmptyHeader>
              <EmptyTitle className="text-base">Nothing to see here</EmptyTitle>
              <EmptyDescription className="text-sm">
                You haven&apos;t made any donations yet. Let&apos;s make your
                first donation.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild variant="outline" size={"sm"}>
                <Link href={"/campaigns"}>
                  Explore Campaigns
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </main>
    </MainContainer>
  )
}

export { MyDonationListPage }
