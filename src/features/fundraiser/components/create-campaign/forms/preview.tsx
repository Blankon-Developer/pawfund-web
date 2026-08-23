import { useStepperContext } from "@/components/steper"
import { Text } from "@/components/typography"
import { useCreateCampaignValuesStore } from "@/features/fundraiser/stores/create-campaign-values.store"
import { CampaignPreviewPage } from "@/features/public"
import { Button } from "@/shadcn-ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn-ui/dialog"
import { cn } from "@/utils"
import { ArrowLeftIcon, ArrowRightIcon, Maximize2Icon } from "lucide-react"
import { useShallow } from "zustand/react/shallow"

function CampaignPreviewForm({ className }: { className?: string }) {
  const { previous } = useStepperContext()

  const { getValues } = useCreateCampaignValuesStore(
    useShallow((state) => ({
      getValues: state.getCompoundValue,
    }))
  )

  const values = getValues()

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Text variant="body-large" className="font-medium">
          Preview
        </Text>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <Maximize2Icon />
            </Button>
          </DialogTrigger>
          <DialogContent
            forceMount
            className="flex max-h-[calc(100vh-3rem)]! w-full max-w-[calc(100vw-3rem)]! flex-col"
          >
            <DialogHeader>
              <DialogTitle className="font-bold">Campaign Preview</DialogTitle>
            </DialogHeader>
            <div className="h-[calc(100vh-8rem)] grow overflow-clip overflow-y-auto rounded-3xl bg-background ring-1 ring-border/30">
              <CampaignPreviewPage />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="h-[calc(100svh-16rem)] w-full overflow-y-auto rounded-3xl bg-background ring-1 ring-border/30">
        <CampaignPreviewPage />
      </div>

      <div className="mt-auto flex justify-between">
        <Button variant={"outline"} onClick={previous}>
          <ArrowLeftIcon />
          Previous
        </Button>
        <Button onClick={() => console.log({ values })}>
          Publish Campaign
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  )
}

export { CampaignPreviewForm }
