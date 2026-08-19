import { MainContainer } from "@/components/main-container"
import {
  HeroSection,
  IntermezzoSection,
  OverviewSection,
} from "@/features/public"

export default async function Page() {
  return (
    <MainContainer>
      <HeroSection className="-mt-13 sm:-mt-14.5" />
      <IntermezzoSection />
      <OverviewSection />
    </MainContainer>
  )
}
