import { Goal, Heart } from "lucide-react"
import Image from "next/image"
import numeral from "numeral"

import { H6 } from "@/components/typography"
import { Progress } from "@/shadcn-ui/progress"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn-ui/tooltip"
import { cn } from "@/utils"
import * as formatDate from "@/utils/format-date"

import type { CampaignItemData } from "../types"

type CampaignCardProps = Omit<
  CampaignItemData,
  "status" | "createdAt" | "id"
> & {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export function CampaignCard(props: CampaignCardProps) {
  const {
    title,
    raisedAmount,
    goalAmount,
    campaignImageUrl,
    fundraiserImageUrl,
    shortDescription,
    donorCount,
    endAt,
    onClick,
  } = props

  const receivedPercentage = numeral(raisedAmount / goalAmount).format("0%")
  return (
    <div
      onClick={onClick}
      className={cn(
        "[--campaign-card-bg-hover:var(--muted)] [--campaign-card-bg:var(--background)]",
        "group max-w-xl min-w-40 cursor-pointer rounded-2xl bg-(--campaign-card-bg) via-50% p-2 hover:bg-linear-to-b hover:from-(--campaign-card-bg-hover) hover:via-(--campaign-card-bg-hover) hover:to-(--campaign-card-bg-hover)/10"
      )}
    >
      <ImageSection
        campaignImageUrl={campaignImageUrl}
        fundraiserImageUrl={fundraiserImageUrl}
        endAt={endAt}
      />

      <Title title={title} className="mt-4" />
      <p className="mt-1 line-clamp-2 text-sm">{shortDescription}</p>
      <p className="mt-2 text-sm font-medium">
        <span className="font-bold">{numeral(raisedAmount).format("0,0")}</span>
        <span> USDC Raised</span>
      </p>

      <CampaignProgress receivedPercentage={receivedPercentage} />

      <div className="mt-2 flex items-center gap-3 text-xs sm:text-sm">
        <DonorCount count={donorCount} />
        <GoalAmount amount={goalAmount} />
      </div>
    </div>
  )
}

// Components

function ImageSection({
  campaignImageUrl,
  fundraiserImageUrl,
  endAt,
}: {
  campaignImageUrl: string
  fundraiserImageUrl: string
  endAt: string
}) {
  return (
    <div className="relative mx-auto aspect-16/10 w-full overflow-clip rounded-2xl bg-gray-200">
      {/* Campaign Image */}
      <Image
        src={campaignImageUrl}
        alt="Card Image"
        width={512}
        height={512}
        className="h-full w-full bg-card object-cover transition-all group-hover:scale-110"
      />
      {/* Image background clipping */}
      <>
        <div
          className={
            "absolute bottom-0 left-0 hidden size-14 rounded-tr-4xl bg-(--campaign-card-bg) group-hover:bg-(--campaign-card-bg-hover) sm:block"
          }
        />
        <div
          className={cn(
            "absolute bottom-14 left-0 z-10 hidden size-7 rounded-bl-4xl bg-transparent shadow-[-3px_3px_var(--campaign-card-bg)] group-hover:shadow-[-3px_3px_var(--campaign-card-bg-hover)] sm:block",
            `before:absolute before:bottom-0 before:-left-0.5 before:h-3 before:w-2 before:rotate-[-20deg] before:bg-(--campaign-card-bg) before:content-[""] group-hover:before:bg-(--campaign-card-bg-hover)`,
            `after:absolute after:-bottom-0.5 after:left-0.5 after:h-1.5 after:w-2.5 after:bg-(--campaign-card-bg) after:content-[""] group-hover:after:bg-(--campaign-card-bg-hover)`
          )}
        />
        <div
          className={cn(
            "absolute bottom-0 left-14 z-10 hidden size-7 rounded-bl-4xl bg-transparent shadow-[-3px_3px_var(--campaign-card-bg)] group-hover:shadow-[-3px_3px_var(--campaign-card-bg-hover)] sm:block",
            `before:absolute before:bottom-0 before:-left-0.5 before:h-3 before:w-2 before:rotate-[-20deg] before:bg-(--campaign-card-bg) before:content-[""] group-hover:before:bg-(--campaign-card-bg-hover)`,
            `after:absolute after:-bottom-0.5 after:left-0.5 after:h-1.5 after:w-2.5 after:bg-(--campaign-card-bg) after:content-[""] group-hover:after:bg-(--campaign-card-bg-hover)`
          )}
        />
      </>
      {/* Fundraiser Image */}
      <Image
        src={fundraiserImageUrl}
        width={44}
        height={44}
        alt="Fundraiser"
        className="absolute bottom-1.5 left-1.5 size-8 rounded-full bg-secondary object-cover sm:bottom-0 sm:left-0 sm:size-11"
      />

      {/* Time Remaining Badge */}
      <div className="absolute top-2 right-2 rounded-full bg-muted-foreground/30 px-2 py-1 text-xs font-medium text-background backdrop-blur-sm">
        <p className="drop-shadow-sm">{formatDate.timeRemaining(endAt)}</p>
      </div>
    </div>
  )
}

function Title({ title, className }: { title: string; className?: string }) {
  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        <H6
          className={cn(
            "line-clamp-2 text-start font-medium sm:text-lg",
            className
          )}
        >
          {title}
        </H6>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="start">
        {title}
      </TooltipContent>
    </Tooltip>
  )
}

function CampaignProgress({
  receivedPercentage,
}: {
  receivedPercentage: string
}) {
  return (
    <div className="flex gap-2">
      <Progress
        value={Number(receivedPercentage.slice(0, -1))}
        className="mt-1.5 h-1.5 dark:bg-neutral-800"
        indicatorClassName="bg-green-600"
      />
      <p className="text-xs font-medium">{receivedPercentage}</p>
    </div>
  )
}

function DonorCount({ count }: { count: number }) {
  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-1">
          <Heart className="size-3 sm:size-3.5" strokeWidth={2.1} />
          <p className="flex gap-1">
            {numeral(count).format("0a")}
            <span className="hidden sm:block">Donation</span>
          </p>
        </div>
      </TooltipTrigger>
      <TooltipContent align="start">
        Total number of donations received for this campaign
      </TooltipContent>
    </Tooltip>
  )
}

function GoalAmount({ amount }: { amount: number }) {
  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-1">
          <Goal className="size-3 sm:size-3.5" strokeWidth={2} />
          <p className="flex gap-1">{numeral(amount).format("0,0")} USDC</p>
        </div>
      </TooltipTrigger>
      <TooltipContent align="start">Goal amount of the campaign</TooltipContent>
    </Tooltip>
  )
}
