import { MainContainer } from "@/components/main-container"
import {
  HeroSection,
  IntermezzoSection,
  OverviewSection,
} from "@/features/public"

export default async function Page() {
  return (
    <MainContainer>
      <HeroSection className="-mt-14" />
      <IntermezzoSection />
      <OverviewSection />
    </MainContainer>
  )
}
