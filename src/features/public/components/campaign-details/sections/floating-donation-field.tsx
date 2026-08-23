import { Button } from "@/shadcn-ui/button"
import { ProgressCircle } from "@/shadcn-ui/progress"
import { timeRemaining } from "@/utils/format-date"
import { Calendar, Goal, HandHeart, Heart, Share } from "lucide-react"
import numeral from "numeral"
import { DonationDialogTrigger } from "./input-donation-dialog"
import { cn } from "@/utils"

type FloatingDonationFieldProps = {
  goalAmount: number
  donorCount: number
  endAt: string
  raisedAmount: number
  contractAddress: string
  className?: string
  disabled?: boolean
}

export function FloatingDonationField({
  raisedAmount,
  donorCount,
  endAt,
  goalAmount,
  className,
  disabled,
}: FloatingDonationFieldProps) {
  const raised = `${numeral(raisedAmount)
    .format(raisedAmount >= 10_000 ? "0.0a" : "0,0")
    .toUpperCase()} USDC Raised`

  const goal = `${numeral(goalAmount)
    .format(goalAmount >= 10_000 ? "0.0a" : "0,0")
    .toUpperCase()} USDC Goal`

  const donations = `${numeral(donorCount)
    .format(donorCount >= 1_000 ? "0.0a" : "0")
    .toUpperCase()} Donations`

  const remaining = timeRemaining(endAt)

  const progress = raisedAmount / goalAmount

  return (
    <div
      className={cn(
        "sticky right-0 bottom-3 left-0 flex w-full flex-col justify-between gap-4 rounded-3xl border border-border bg-card p-3 sm:flex-row sm:items-center sm:gap-10",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <ProgressCircle
          value={progress * 100}
          size={48}
          strokeWidth={6}
          className="shrink-0 text-emerald-500"
          indicatorClassName="text-emerald-500"
          trackClassName="text-gray-200 dark:text-neutral-800"
        >
          <div className="text-center">
            <div className="text-xs font-bold text-foreground">
              {numeral(progress).format("0%")}
            </div>
          </div>
        </ProgressCircle>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold">{raised}</p>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <Goal size={14} />
              <p className="text-xs font-medium text-nowrap">{goal}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart size={14} />
              <p className="text-xs font-medium text-nowrap">{donations}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={13} />
              <p className="text-xs font-medium text-nowrap">{remaining}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex grow gap-3">
        <Button
          variant={"secondary"}
          size={"lg"}
          className="bg-gray-200 dark:bg-secondary"
          disabled={disabled}
        >
          <Share />
          Share
        </Button>
        <DonationDialogTrigger disabled={disabled} size={"lg"} className="grow">
          <HandHeart />
          Donate
        </DonationDialogTrigger>
      </div>
    </div>
  )
}
