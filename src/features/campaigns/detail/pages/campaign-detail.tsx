import { BackButton } from "@/components/back-button"
import { MainContainer } from "@/components/main-container"
import { H3, Text } from "@/components/typography"
import { Button } from "@/shadcn-ui/button"
import { Separator } from "@/shadcn-ui/separator"
import { formatDate } from "@/utils/format-date"
import { maskAddress } from "@/utils/mask-address"
import { ArrowLeftIcon, FlagIcon, TelescopeIcon } from "lucide-react"
import Link from "next/link"
import { CampaignImage } from "../components/campaign-image"
import { CampaignStory } from "../components/campaign-story"
import { DonationField } from "../components/donation-field"
import { Donors } from "../components/donors"
import { FloatingDonationField } from "../components/floating-donation-field"
import { Fundraiser } from "../components/fundraiser"
import { MoreCampaignsSection } from "../components/more-campaigns-section"

const campaignMarkdown = `
# Provide Comfort for Cats/Animals on the Road

Every day, countless stray cats and animals wander the streets searching for food, shelter, and care. Many of them suffer from hunger, injuries, or untreated illnesses — silently struggling to survive.

## Our Mission

This campaign aims to **provide comfort and care for stray animals** by offering:

- **Nutritious meals** for hungry cats and dogs  
- **Medical treatment** for the sick and injured  
- **Shelter and warmth** for those without a home  
- **Spaying and neutering programs** to prevent overpopulation  

Through your support, we can make their days safer, their nights warmer, and their lives filled with hope.

## How You Can Help

- 🐾 **Donate:** Every small contribution helps provide food and medical aid.  
- ❤️ **Share:** Spread this campaign to raise awareness and compassion.  
- 🏡 **Volunteer:** Join us in feeding and rescuing street animals.

Together, we can bring kindness to those who need it the most — one meal, one rescue, and one warm heart at a time.

> “The greatness of a nation and its moral progress can be judged by the way its animals are treated.”  
> — *Mahatma Gandhi*
`

function CampaignDetailPage() {
  const data = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    title:
      "Spay & Neuter Stray Cats to Prevent Overpopulation Lorem ipsum dolor sit amet",
    shortDescription: `Providing care Provide a safe and comfortable space, Provideheating, Feed the kitten the right way, Stimulate the kitten to g to the bathroom, and Clean the kitten. Your support can empowe these young minds, opening doors that poverty has closed.`,
    story: campaignMarkdown,
    fundraiser: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "Galang Fund",
      imageUrl: "https://picsum.photos/300",
      address: "0xA7Dd557C3628e35D4CC9618F13Aa94D57FDb7E7C",
    },
    raisedAmount: 1_880,
    goalAmount: 5_000,
    donorCount: 239,
    endAt: "2026-10-21T07:40:43.797Z",
    contractAddress: "0xA7Dd557C3628e35D4CC9618F13Aa94D57FDb7E7C",
    createdAt: "2026-08-21T08:19:53.854Z",
    imageUrl: "https://picsum.photos/600",
    country: "Indonesia",
    zipCode: "53461",
    status: "active",
  }

  return (
    <MainContainer className="mt-6 px-1">
      <div className="flex items-center gap-1">
        <BackButton size={"icon"} className="-ml-3">
          <ArrowLeftIcon strokeWidth={2.5} />
        </BackButton>
        <H3>{data.title}</H3>
      </div>

      <div className="relative mt-3 flex flex-col gap-6 lg:flex-row">
        {/*  */}
        <div className="flex-2 space-y-4">
          <p className="text-sm text-muted-foreground">
            Created at {formatDate(data.createdAt)}
          </p>

          <CampaignImage isLoading={false} imageUrl={data.imageUrl} />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground sm:hidden">
              {maskAddress(data.contractAddress, 6)}
            </p>
            <p className="hidden text-sm text-muted-foreground sm:block">
              {data.contractAddress}
            </p>
            <Link
              target="_blank"
              href={`https://eth-sepolia.blockscout.com/address/${data.contractAddress}`}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <TelescopeIcon size={16} />
              <p className="text-sm font-medium underline">View in Explorer</p>
            </Link>
          </div>

          <Text>{data.shortDescription}</Text>

          <Fundraiser
            imageUrl={data.fundraiser.imageUrl}
            name={data.fundraiser.name}
            address={maskAddress(data.fundraiser.address, 6)}
          />
          <Separator />
          <CampaignStory story={data.story} />
          <Separator />
          <Donors contractAddress={data.contractAddress} />
          {/* <Separator /> */}
          {/* Floating donation field for mobile */}
          <FloatingDonationField
            contractAddress={data.contractAddress}
            raisedAmount={data.raisedAmount}
            donorCount={data.donorCount}
            goalAmount={data.goalAmount}
            endAt={data.endAt}
            className="lg:hidden"
          />
          <Button variant={"ghost"}>
            <FlagIcon /> Report This Campaign
          </Button>
        </div>
        {/*  */}
        <div className="hidden flex-[1.4] pt-8.5 lg:block">
          <DonationField
            contractAddress={data.contractAddress}
            raisedAmount={data.raisedAmount}
            donorCount={data.donorCount}
            goalAmount={data.goalAmount}
            endAt={data.endAt}
          />
        </div>
      </div>

      <MoreCampaignsSection />
    </MainContainer>
  )
}

export { CampaignDetailPage }
