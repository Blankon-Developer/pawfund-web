"use client"
import { MainContainer } from "@/components/main-container"
import { Stepper, StepperContent } from "@/components/steper"
import { cn } from "@/utils"
import {
  CampaignGoalForm,
  CampaignImageForm,
  CampaignLocationForm,
  CampaignOutlineForm,
  CampaignPreviewForm,
  CampaignStoryForm,
} from "../components/forms"
import { StepAside } from "../components/step-aside"

type StepType = {
  title: string
  description: string
  Content: React.ComponentType<{
    className?: string
    next?: () => void
    previous?: () => void
  }>
}

const steps: StepType[] = [
  {
    title: "Let's begin your fundraising journey",
    description: "We're here to guide you every step of the way.",
    Content: CampaignLocationForm,
  },
  {
    title: "Upload Campaign Banner",
    description:
      "Add a compelling image that represents your campaign. This will help attract attention and communicate your cause effectively.",
    Content: CampaignImageForm,
  },
  {
    title: "What people want to know",
    description:
      "Write a brief, engaging title and summary to highlight your campaign's purpose.",
    Content: CampaignOutlineForm,
  },
  {
    title: "Share the Heart Behind Your Campaign",
    description:
      "Tell the story in a touching and honest way about the reasons behind this campaign so that potential donors can understand the urgency and goals you want to achieve.",
    Content: CampaignStoryForm,
  },
  {
    title: "Set Your Donation Goal",
    description:
      "Define how much USDC you aim to raise so donors can understand the impact of their contributions.",
    Content: CampaignGoalForm,
  },
  {
    title: "Review and Launch Your Campaign",
    description:
      "Take a final look at your campaign details. Make sure everything is accurate before publishing your fundraising campaign to the blockchain.",
    Content: CampaignPreviewForm,
  },
]

export function CreateCampaignPage() {
  return (
    <div className="overflow-x-clip">
      <MainContainer className="relative min-h-svh">
        <Stepper defaultStep={1} steps={steps}>
          {({ step, order, next, previous }) => (
            <StepperContent
              key={order}
              step={order}
              className="flex min-h-svh gap-4"
            >
              <StepAside
                title={step.title}
                description={step.description}
                step={order}
                from={steps.length}
                className="sticky top-0 hidden flex-4 md:flex"
              />
              <div
                className={cn(
                  "relative flex flex-6 flex-col overflow-y-clip border-border/60 py-6 md:rounded-tl-[5rem] md:border-t md:border-l md:bg-card md:pt-16 md:pb-6 md:pl-16",
                  'before: before:absolute before:top-0 before:left-0 before:-z-10 before:h-[200svh] before:w-dvw before:rounded-tl-[6rem] before:bg-card before:content-none md:before:content-[""]'
                )}
              >
                <step.Content
                  className="flex grow flex-col justify-center"
                  next={next}
                  previous={previous}
                />
              </div>
            </StepperContent>
          )}
        </Stepper>
      </MainContainer>
    </div>
  )
}
