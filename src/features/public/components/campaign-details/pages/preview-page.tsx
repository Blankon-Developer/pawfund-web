"use client"

import { MainContainer } from "@/components/main-container"
import { H3, Text } from "@/components/typography"
import { useGetAuthMe } from "@/features/auth"
import { useCreateCampaignValuesStore } from "@/features/fundraiser"
import { Separator } from "@/shadcn-ui/separator"
import { formatDate } from "@/utils/format-date"
import { maskAddress } from "@/utils/mask-address"
import { TelescopeIcon } from "lucide-react"
import { useShallow } from "zustand/react/shallow"
import {
  CampaignImage,
  CampaignStory,
  DonationField,
  FloatingDonationField,
  Fundraiser,
} from "../sections"

export function CampaignPreviewPage() {
  const { getIsValuesFilled, getValues } = useCreateCampaignValuesStore(
    useShallow((state) => ({
      getIsValuesFilled: state.getIsValuesFilled,
      getValues: state.getCompoundValue,
    }))
  )

  const isFilled = getIsValuesFilled()
  const { data: auth } = useGetAuthMe()

  if (!isFilled) return <Text>Please Fill The Form</Text>

  const { title, shortDescription, story, campaignImage, goalAmount, endAt } =
    getValues()

  const now = new Date()
  const dummyAddress = "0x00000000000000000000000000000000000000000000"

  return (
    <MainContainer className="@container mt-6 px-1">
      <H3>{title}</H3>

      <div className="relative mt-3 flex flex-col gap-6 @5xl:flex-row">
        {/*  */}
        <div className="flex-2 space-y-4">
          <p className="text-sm text-muted-foreground">
            Created at {formatDate(now)}
          </p>

          <CampaignImage
            isLoading={false}
            imageUrl={campaignImage?.preview ?? "/placeholder.png"}
          />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground @2xl:hidden">
              {maskAddress(dummyAddress, 6)}
            </p>
            <p className="hidden truncate text-sm text-muted-foreground @2xl:block">
              {dummyAddress}
            </p>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <TelescopeIcon size={16} />
              <p className="text-sm font-medium text-nowrap underline">
                View in Explorer
              </p>
            </button>
          </div>

          <Text>{shortDescription}</Text>

          <Fundraiser
            imageUrl={auth?.imageUrl ?? undefined}
            name={auth?.name || "John Doe"}
            address={maskAddress(auth?.address ?? dummyAddress, 6)}
          />
          <Separator />
          <CampaignStory story={story!} />
          {/* Floating donation field for mobile */}
          <FloatingDonationField
            contractAddress={dummyAddress}
            raisedAmount={0}
            donorCount={0}
            goalAmount={goalAmount!}
            endAt={endAt!.toISOString()}
            className="@5xl:hidden"
            disabled
          />
        </div>
        {/*  */}
        <div className="hidden flex-[1.4] pt-8.5 @5xl:block">
          <DonationField
            disabled
            contractAddress={dummyAddress}
            raisedAmount={0}
            donorCount={0}
            goalAmount={goalAmount!}
            endAt={endAt!.toISOString()}
          />
        </div>
      </div>
    </MainContainer>
  )
}
