import { useStepperContext } from "@/components/steper"
import { useHookForm } from "@/lib/hook-form"
import { Button } from "@/shadcn-ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/shadcn-ui/field"
import { Textarea } from "@/shadcn-ui/textarea"
import { cn } from "@/utils"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Controller } from "react-hook-form"
import { storySchema, StorySchemaType } from "./_schema"
import { useCreateCampaignValuesStore } from "@/features/fundraiser/stores/create-campaign-values.store"

const minValues = 100
const maxValues = 1500

function CampaignStoryForm({ className }: { className?: string }) {
  const form = useHookForm({
    schema: storySchema(minValues, maxValues),
    defaultValues: {
      story: "",
    },
  })

  const { next, previous } = useStepperContext()

  const handleSubmit = (val: StorySchemaType) => {
    useCreateCampaignValuesStore.getState().setStory(val)
    next()
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn("space-y-6", className)}
    >
      <Controller
        control={form.control}
        name="story"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error} className="gap-2">
            <div>
              <FieldLabel htmlFor={field.name}>Tell Your Story</FieldLabel>
              <FieldDescription>
                The more details you share, the more likely people will be to
                trust and support your campaign.
              </FieldDescription>
            </div>
            <Textarea
              {...field}
              id={field.name}
              placeholder="Donate to help..."
              aria-invalid={!!fieldState.error}
              className="min-h-96! max-w-3xl"
            />
            <div className="flex justify-between gap-2">
              {!!fieldState.error && <FieldError errors={[fieldState.error]} />}
              <FieldDescription className="ml-auto text-xs">
                {field.value.length}/{maxValues}
              </FieldDescription>
            </div>
          </Field>
        )}
      />
      <div className="mt-auto flex justify-between">
        <Button variant={"outline"} onClick={previous}>
          <ArrowLeftIcon />
          Previous
        </Button>
        <Button type="submit">
          Next
          <ArrowRightIcon />
        </Button>
      </div>
    </form>
  )
}

export { CampaignStoryForm }
