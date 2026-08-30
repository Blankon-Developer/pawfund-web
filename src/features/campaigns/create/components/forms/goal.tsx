import { USDCIcon } from "@/assets/icons/usdc"
import { SelectDatetime } from "@/components/select-datetime"
import { useStepperContext } from "@/components/steper"
import { useHookForm } from "@/lib/hook-form"
import { Button } from "@/shadcn-ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/shadcn-ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shadcn-ui/input-group"
import { cn } from "@/utils"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Controller } from "react-hook-form"
import { goalSchema, GoalSchemaType } from "../../schema"
import { useCreateCampaignValuesStore } from "../../store"

function CampaignGoalForm({ className }: { className?: string }) {
  const form = useHookForm({
    schema: goalSchema,
    defaultValues: {
      goalAmount: "",
      endAt: "",
    },
  })
  const { next, previous } = useStepperContext()

  const handleSubmit = (val: GoalSchemaType) => {
    useCreateCampaignValuesStore.getState().setGoal(val)
    next()
  }

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (value: string) => void
  ) => {
    const value = e.target.value
    // Only allow numbers, one decimal point, and only one zero before decimal
    const regex = /^0(\.\d*)?$|^[1-9]\d*(\.\d*)?$|^$/
    if (regex.test(value)) {
      callback(value)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn("space-y-6", className)}
    >
      <Controller
        control={form.control}
        name="goalAmount"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error} className="gap-2">
            <div>
              <FieldLabel htmlFor={field.name}>Goal Amount</FieldLabel>
              <FieldDescription>
                Set the goal amount for the campaign
              </FieldDescription>
            </div>
            <InputGroup className="gap-0.5">
              <InputGroupAddon align={"inline-start"}>
                <USDCIcon className="size-4 opacity-60 dark:text-secondary" />
              </InputGroupAddon>
              <InputGroupInput
                aria-invalid={fieldState.invalid}
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                {...field}
                onChange={(e) => handleAmountChange(e, field.onChange)}
              />
            </InputGroup>
            {!!fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="endAt"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error} className="gap-2">
            <div>
              <FieldLabel htmlFor={field.name}>End Date</FieldLabel>
              <FieldDescription>When does this campaign end</FieldDescription>
            </div>
            <SelectDatetime
              {...field}
              invalid={fieldState.invalid}
              value={field.value ? new Date(field.value) : undefined}
            />
            <FieldDescription className="text-xs">
              At least the campaign ends 1 day (24h) from now
            </FieldDescription>
            {!!fieldState.error && <FieldError errors={[fieldState.error]} />}
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

export { CampaignGoalForm }
