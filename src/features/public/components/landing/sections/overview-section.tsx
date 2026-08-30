import { PawCircular } from "@/assets/icons/paw-circular"
import { Button } from "@/shadcn-ui/button"
import Link from "next/link"
import { cn } from "@/utils"
import { ErrorBoundary } from "react-error-boundary"
import { getCampaigns } from "@/features/public/api/campaigns"
import { CampaignCard } from "../../campaign-card"

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
  return (
    <div
      className={cn(
        `grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:grid-cols-4`,
        className
      )}
    >
      {data.campaigns?.slice(0, 8).map((campaign) => (
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

export { OverviewSection }
