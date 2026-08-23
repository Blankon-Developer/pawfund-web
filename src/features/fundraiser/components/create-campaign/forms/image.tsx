import { useStepperContext } from "@/components/steper"
import { useCreateCampaignValuesStore } from "@/features/fundraiser/stores/create-campaign-values.store"
import { useHookForm } from "@/lib/hook-form"
import { Button } from "@/shadcn-ui/button"
import { Field, FieldDescription, FieldError } from "@/shadcn-ui/field"
import { cn } from "@/utils"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Controller } from "react-hook-form"
import { toast } from "sonner"
import { CampaignImageInput } from "../../campaign-image-input"
import { imageSchema, ImageSchemaType } from "./_schema"

function CampaignImageForm({ className }: { className?: string }) {
  const form = useHookForm({
    schema: imageSchema,
    defaultValues: {
      campaignImage: undefined,
    },
  })

  const { next, previous } = useStepperContext()

  const handleSubmit = (val: ImageSchemaType) => {
    useCreateCampaignValuesStore.getState().setImage(val)
    next()
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn("space-y-4", className)}
    >
      <Controller
        control={form.control}
        name="campaignImage"
        render={({ field, fieldState }) => (
          <Field className="mx-auto w-full max-w-2xl min-w-0 flex-1 gap-3">
            <CampaignImageInput
              defaultAvatar={field.value?.preview}
              onFileChange={(file) => field.onChange(file)}
              aria-invalid={fieldState.invalid}
              onError={(err) => toast.error(err)}
            />
            <div>
              {fieldState.invalid && (
                <FieldError className="mb-1" errors={[fieldState.error]} />
              )}
              <FieldDescription>
                The recommended image format is an image with an aspect ratio of
                16:9.
              </FieldDescription>
              <FieldDescription>
                Maximum image size uploaded is up to 2 MB
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

export { CampaignImageForm }
