import { useStepperContext } from "@/components/steper"
import { useHookForm } from "@/lib/hook-form"
import { Button } from "@/shadcn-ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/shadcn-ui/field"
import { Input } from "@/shadcn-ui/input"
import { Textarea } from "@/shadcn-ui/textarea"
import { cn } from "@/utils"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Controller } from "react-hook-form"
import { outlineSchema, OutlineSchemaType } from "./_schema"
import { useCreateCampaignValuesStore } from "@/features/fundraiser/stores/create-campaign-values.store"

const minValues = {
  title: 20,
  shortDesc: 30,
}
const maxValues = {
  title: 100,
  shortDesc: 500,
}

function CampaignOutlineForm({ className }: { className?: string }) {
  const form = useHookForm({
    schema: outlineSchema(minValues, maxValues),
    defaultValues: {
      title: "",
      shortDescription: "",
    },
  })

  const { next, previous } = useStepperContext()

  const handleSubmit = (val: OutlineSchemaType) => {
    useCreateCampaignValuesStore.getState().setOutline(val)
    next()
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn("space-y-4", className)}
    >
      <Controller
        control={form.control}
        name="title"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error} className="gap-2">
            <FieldLabel htmlFor={field.name}>Title</FieldLabel>
            <Input
              {...field}
              id={field.name}
              placeholder="Donate to help..."
              aria-invalid={!!fieldState.error}
            />
            <div className="flex justify-between gap-2">
              {!!fieldState.error && <FieldError errors={[fieldState.error]} />}
              <FieldDescription className="ml-auto text-xs">
                {field.value.length}/{maxValues.title}
              </FieldDescription>
            </div>
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="shortDescription"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error} className="gap-2">
            <div>
              <FieldLabel htmlFor={field.name}>Short Description</FieldLabel>
              <FieldDescription>
                A brief summary of the campaign
              </FieldDescription>
            </div>
            <Textarea
              {...field}
              id={field.name}
              placeholder="Donate to help..."
              aria-invalid={!!fieldState.error}
              className="min-h-32! max-w-3xl"
            />
            <div className="flex justify-between gap-2">
              {!!fieldState.error && <FieldError errors={[fieldState.error]} />}
              <FieldDescription className="ml-auto text-xs">
                {field.value.length}/{maxValues.shortDesc}
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

export { CampaignOutlineForm }
