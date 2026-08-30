import {
  HeroSection,
  IntermezzoSection,
  OverviewSection,
} from "@/components/landing"
import { MainContainer } from "@/components/main-container"

export default function LandingPage() {
  return (
    <MainContainer>
      <HeroSection className="-mt-13 sm:-mt-14.5" />
      <IntermezzoSection />
      <OverviewSection />
    </MainContainer>
  )
}
