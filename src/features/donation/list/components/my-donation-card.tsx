"use client"

import { H6, Text } from "@/components/typography"
import { cn } from "@/utils"
import { maskAddress } from "@/utils/mask-address"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BanknoteArrowDownIcon,
  CheckCheckIcon,
  ClockIcon,
  CopyIcon,
  LucideIcon,
  OctagonXIcon,
} from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"
import { toast } from "sonner"
import { MyDonationData, MyDonationStatus } from "../types"

type MyDonationCardProps = MyDonationData

function MyDonationCard({
  amount,
  status,
  donatedOn,
  campaign,
  txHash,
}: MyDonationCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="flex items-center justify-between gap-2 rounded-b-2xl bg-card p-4 ring ring-border">
        <div className="space-y-1">
          <H6 className="line-clamp-2 font-medium hover:underline">
            <Link href={`/campaign/${campaign.contractAddress}`}>
              {campaign.title}
            </Link>
          </H6>
          <Text variant={"caption-sm"}>{donatedOn}</Text>
        </div>
        <Amount amount={amount} status={status} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Status status={status} />
        <div className="flex items-center gap-2 text-muted-foreground">
          <Text variant={"caption-sm"}>
            Tx hash:{" "}
            <Link
              href={`https://sepolia.basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {maskAddress(txHash)}
            </Link>
          </Text>
          <button
            onClick={() =>
              navigator.clipboard
                .writeText(txHash)
                .then(() => toast.success("Transaction hash copied!"))
            }
            className="hover:text-foreground"
          >
            <CopyIcon className="size-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

function Amount({
  amount,
  status,
}: {
  amount: number | string
  status: MyDonationStatus
}) {
  const Icon = status === "refund" ? ArrowDownIcon : ArrowUpIcon

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-foreground",
        status === "refund" && "text-warning",
        status === "success" && "text-success",
        status === "failed" && "text-destructive!"
      )}
    >
      <Icon className="size-3.5" strokeWidth={2.5} />
      <Text
        variant={"body-small"}
        className="font-bold text-nowrap text-inherit!"
      >
        {amount} USDC
      </Text>
    </div>
  )
}

function Status({ status }: { status: MyDonationStatus }) {
  const Icon = useMemo<LucideIcon | null>(() => {
    switch (status) {
      case "success":
        return CheckCheckIcon
      case "failed":
        return OctagonXIcon
      case "pending":
        return ClockIcon
      case "refund":
        return BanknoteArrowDownIcon
    }
  }, [status])
  const label = useMemo<string>(() => {
    switch (status) {
      case "success":
        return "Transaction successful"
      case "failed":
        return "Transaction failed"
      case "pending":
        return "Pending transaction..."
      case "refund":
        return "Refund for cancelled campaign"
    }
  }, [status])

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-muted-foreground",
        status === "success" && "text-success",
        status === "failed" && "text-destructive",
        status === "refund" && "text-warning"
      )}
    >
      {Icon && <Icon className="size-3.5" />}
      <Text
        variant={"caption"}
        className={cn("text-inherit!", status === "pending" && "shimmer")}
      >
        {label}
      </Text>
    </div>
  )
}

export { MyDonationCard }
