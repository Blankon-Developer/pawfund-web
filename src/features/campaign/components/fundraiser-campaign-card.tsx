import { Badge } from "@/components/reui/badge"
import { H5, Text } from "@/components/typography"
import { Button } from "@/shadcn-ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn-ui/popover"
import { Progress } from "@/shadcn-ui/progress"
import { Separator } from "@/shadcn-ui/separator"
import { cn } from "@/utils"
import { timeRemaining } from "@/utils/format-date"
import { maskAddress } from "@/utils/mask-address"
import {
  BanknoteArrowDownIcon,
  CalendarIcon,
  EllipsisVerticalIcon,
  GlobeIcon,
  HeartIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react"
import Image from "next/image"
import numeral from "numeral"
import { FundariserCampaignItemData } from "../types"

function FundraiserCampaignCard({
  title,
  imageUrl,
  status,
  endAt,
  donorCount,
  shortDescription,
  raisedAmount,
  goalAmount,
}: FundariserCampaignItemData) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl sm:flex-row sm:gap-4">
      <div className="w-full min-w-2xs grow space-y-3 sm:max-w-sm md:shrink-0">
        <Image
          src={imageUrl}
          height={180}
          width={320}
          alt={"Campaign image"}
          className="aspect-video w-full rounded-xl bg-gray-100"
        />
        <div className="hidden gap-1 sm:flex">
          <Button className="grow" variant={"outline"}>
            Withdraw
            <BanknoteArrowDownIcon />
          </Button>
          <ElipsisPopover />
        </div>
      </div>

      <div className="grow space-y-2">
        <div className="flex items-center gap-4">
          <Badge
            variant={
              status == "active"
                ? "success-light"
                : status == "cancelled"
                  ? "destructive-light"
                  : "info-light"
            }
            size={"sm"}
          >
            <div
              className={cn(
                "size-2 rounded-full",
                status === "active" && "animate-pulse bg-success",
                status === "cancelled" && "bg-destructive",
                status === "completed" && "bg-info"
              )}
            />
            {status.slice(0, 1).toUpperCase() + status.slice(1)}
          </Badge>
          <span className="flex items-center gap-1 text-sm">
            <CalendarIcon className="size-3" strokeWidth={2.4} />
            <span>{timeRemaining(endAt)}</span>
          </span>
          <span className="flex items-center gap-1 text-sm">
            <HeartIcon className="size-3.5" strokeWidth={2.3} />
            <span>{donorCount} Donations</span>
          </span>
        </div>

        <div>
          <H5 className="line-clamp-2">{title}</H5>
          <Text variant={"caption"} className="line-clamp-2 md:line-clamp-3">
            {shortDescription}
          </Text>
        </div>

        <div className="space-y-1">
          <Text variant={"body-small"}>
            <span className="font-semibold">
              {numeral(raisedAmount).format("0,0")} USDC
            </span>{" "}
            raised of {numeral(goalAmount).format("0,0")} USDC goal
          </Text>

          <div className="flex max-w-lg items-center gap-2">
            <Progress
              value={(raisedAmount / goalAmount) * 100}
              className="h-2 bg-gray-200 dark:bg-neutral-800"
              indicatorClassName="bg-green-600"
            />
            <span className="text-xs font-medium">
              {numeral(raisedAmount / goalAmount).format("0%")}
            </span>
          </div>
        </div>

        <div>
          <Text variant={"caption-sm"}>Created at 12 August 2026</Text>
        </div>

        <div className="flex gap-1 sm:hidden">
          <Button className="grow" variant={"outline"}>
            Withdraw
            <BanknoteArrowDownIcon />
          </Button>
          <ElipsisPopover />
        </div>
      </div>
    </div>
  )
}

function ElipsisPopover() {
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <EllipsisVerticalIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="gap-2 p-2">
        <div className="flex flex-col gap-0">
          <Button
            variant={"ghost"}
            className="w-full justify-between rounded-xl px-2"
          >
            Live Preview
            <GlobeIcon className="size-3.5" />
          </Button>
          <Button
            variant={"ghost"}
            className="w-full justify-between rounded-xl px-2"
          >
            <span className="flex items-center gap-1">
              Contract
              <span className="text-xs text-muted-foreground">
                ({maskAddress("0xf436a2443eb5Dc420C2405399f42914A0DbD8AAA", 5)})
              </span>
            </span>
            <SquareArrowOutUpRightIcon className="size-3.5" />
          </Button>
          <Separator className="mx-auto my-1 w-[calc(100%-1rem)]!" />
          <Button
            variant={"ghost"}
            className="w-full justify-between rounded-xl px-2 text-destructive hover:bg-destructive/5 hover:text-destructive"
          >
            Cancel campaign
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { FundraiserCampaignCard }
