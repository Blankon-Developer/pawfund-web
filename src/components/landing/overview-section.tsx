import { PawCircular } from "@/assets/icons/paw-circular"
import { Button } from "@/shadcn-ui/button"
import Link from "next/link"
import { cn } from "@/utils"
import { ErrorBoundary } from "react-error-boundary"
import { CampaignCard, getCampaigns } from "@/features/campaign"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shadcn-ui/empty"

async function OverviewSection() {
  return (
    <section className="my-24 flex flex-col items-center">
      <div className="flex items-center justify-center gap-6 dark:brightness-80">
        <PawCircular className="size-10" bgColor="#E5E7EB" fgColor="#9CA3AF" />
        <PawCircular bgColor="#E5E7EB" className="size-14" fgColor="#9CA3AF" />
        <PawCircular className="size-16" />
        <PawCircular bgColor="#E5E7EB" className="size-14" fgColor="#9CA3AF" />
        <PawCircular className="size-10" bgColor="#E5E7EB" fgColor="#9CA3AF" />
      </div>
      <h3 className="mt-6 max-w-2xl text-center font-heading text-4xl">
        Find a campaign, make an impact, and change lives today!
      </h3>
      <ErrorBoundary
        fallback={
          <div className="mt-8 flex h-20 w-full items-center justify-center rounded-2xl border border-dashed border-destructive/50 bg-destructive/5 p-4 text-center text-destructive">
            Failed to load campaigns.
          </div>
        }
      >
        <CampaignList className="mt-8" />
      </ErrorBoundary>
      <Button
        asChild
        size={"lg"}
        className="mx-auto mt-8 bg-foreground px-6 text-background hover:bg-foreground/90"
      >
        <Link href={"/campaigns"}>Find Other Campaign</Link>
      </Button>
    </section>
  )
}

async function CampaignList({ className }: { className?: string }) {
  const data = await getCampaigns().catch(() => {
    throw new Error("Failed to fetch campaigns")
  })

  const { campaigns } = data

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="mt-6 flex w-full items-center justify-center">
        <Empty className="border border-dashed border-border">
          <EmptyHeader>
            <EmptyMedia>
              <StackedCardsIllustration />
            </EmptyMedia>
            <EmptyTitle>No campaigns yet</EmptyTitle>
            <EmptyDescription>
              Be the first to create a campaign and make a difference!
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    )
  }

  return (
    <div
      className={cn(
        `grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:grid-cols-4`,
        className
      )}
    >
      {campaigns?.slice(0, 8).map((campaign) => (
        <Link key={campaign.id} href={`/campaign/${campaign.contractAddress}`}>
          <CampaignCard
            title={campaign.title}
            shortDescription={campaign.shortDescription}
            goalAmount={campaign.goalAmount}
            raisedAmount={campaign.raisedAmount}
            donorCount={campaign.donorCount}
            campaignImageUrl={campaign.campaignImageUrl}
            fundraiserImageUrl={campaign.fundraiserImageUrl}
            endAt={campaign.endAt}
            contractAddress={campaign.contractAddress}
          />
        </Link>
      ))}
    </div>
  )
}

function StackedCardsIllustration() {
  return (
    <div className="relative h-24 w-52" aria-hidden="true">
      {/* Back card */}
      <div className="absolute inset-x-6 top-0 h-6 rounded-t-lg border border-border/50 bg-muted/60 dark:bg-muted/30" />
      {/* Middle card */}
      <div className="absolute inset-x-3 top-3 h-6 rounded-t-lg border border-border/60 bg-muted/80 dark:bg-muted/50" />
      {/* Front card */}
      <div className="absolute inset-x-0 top-6 flex h-16 items-center gap-3 rounded-lg border border-border bg-background px-4 shadow-sm">
        <div className="size-8 shrink-0 rounded bg-muted" />
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="h-2.5 w-3/4 rounded bg-muted" />
          <div className="h-2 w-1/2 rounded bg-muted/60" />
        </div>
      </div>
      {/* Fade overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-b from-background/0 via-background/60 to-background" />
    </div>
  )
}

export { OverviewSection }
