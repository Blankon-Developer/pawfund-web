import { CampaignCard, getCampaigns } from "@/features/public"
import { MainContainer } from "@/components/main-container"
import Link from "next/link"
import { H4 } from "@/components/typography"

export default async function Page() {
  const campaigns = await getCampaigns().catch((error) => {
    console.error("Error fetching campaigns:", error)
    return null
  })

  if (!campaigns) {
    return (
      <MainContainer>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 mt-4">
          <h1 className="text-2xl font-bold">No campaigns found</h1>
          <p className="text-sm text-muted-foreground">
            There are no campaigns available at the moment. Please check back
            later.
          </p>
          <Link
            href="/"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Go back to home
          </Link>
        </div>
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      <H4 className="mt-6">Campaigns</H4>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} {...campaign} />
        ))}
      </div>
    </MainContainer>
  )
}
