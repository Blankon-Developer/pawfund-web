import { PawCircular } from "@/assets/icons/paw-circular"
import { CampaignCard } from "@/features/public"

export function MoreCampaigns() {
  return (
    <>
      <div className="mt-6 flex items-center justify-center gap-6 dark:brightness-80">
        <PawCircular className="size-8" bgColor="#E5E7EB" fgColor="#9CA3AF" />
        <PawCircular bgColor="#E5E7EB" className="size-12" fgColor="#9CA3AF" />
        <PawCircular className="size-14" />
        <PawCircular bgColor="#E5E7EB" className="size-12" fgColor="#9CA3AF" />
        <PawCircular className="size-8" bgColor="#E5E7EB" fgColor="#9CA3AF" />
      </div>
      <h6 className="mt-4 ml-2 text-2xl font-medium">
        More ways to make a difference. Find fundraisers inspired by what you
        care about.
      </h6>
      <div className="mt-2 mb-8 grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <CampaignCard
            key={idx}
            title={"Free Vaccination Drive for Stray Animals Across the City"}
            shortDescription="Unvaccinated strays are a risk to both animals and the public. Join us in providing free vaccinations to over 500 stray animals in our city this year."
            goalAmount={2000}
            raisedAmount={1950}
            donorCount={188}
            campaignImageUrl={`https://picsum.photos/seed/${idx + 1}/300/200`}
            fundraiserImageUrl={`https://picsum.photos/seed/${idx + 1}/50`}
            endAt={"2025-09-01T00:00:00.000Z"}
            contractAddress={"0x0000000000000000000000000000000000000004"}
          />
        ))}
      </div>
    </>
  )
}
