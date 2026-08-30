import { H2, Text } from "@/components/typography"
import { Button } from "@/shadcn-ui/button"
import { cn } from "@/utils"
import Image from "next/image"

type CreateCampaignStepInfoProps = {
  title: string
  description: string
  step: number
  from: number
  className?: string
}

function StepAside({
  title,
  description,
  from,
  step,
  className,
}: CreateCampaignStepInfoProps) {
  return (
    <div className={cn("flex h-svh flex-col justify-between py-6", className)}>
      <div>
        <Image
          src="/pawfund-text-logo.svg"
          alt="Pawfund Logo"
          width={110}
          height={26}
          className="h-auto w-23 sm:w-28"
        />
        <div className="mt-16">
          <Text variant={"caption"}>
            {step} of {from}
          </Text>
          <H2 className="mt-2 font-medium text-pretty">{title}</H2>
          <Text className="mt-4 text-pretty">{description}</Text>
        </div>
      </div>
      <Button
        size={"sm"}
        variant="ghost"
        className="w-fit text-destructive hover:text-destructive"
      >
        Cancel
      </Button>
    </div>
  )
}

export { StepAside }
