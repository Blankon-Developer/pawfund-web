import countries from "@/assets/countries.json"
import { useStepperContext } from "@/components/steper"
import { Text } from "@/components/typography"
import { useHookForm } from "@/lib/hook-form"
import { Button } from "@/shadcn-ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/shadcn-ui/combobox"
import { Field, FieldError, FieldLabel } from "@/shadcn-ui/field"
import { Input } from "@/shadcn-ui/input"
import { cn } from "@/utils"
import { ArrowRightIcon } from "lucide-react"
import { Controller } from "react-hook-form"
import { locationSchema, LocationSchemaType } from "../../schema"
import { useCreateCampaignValuesStore } from "../../store"

function CampaignLocationForm({ className }: { className?: string }) {
  const form = useHookForm({
    schema: locationSchema,
    defaultValues: {
      country: "",
      zipCode: "",
    },
  })

  const { next } = useStepperContext()

  const handleSubmit = (val: LocationSchemaType) => {
    useCreateCampaignValuesStore.getState().setLocation(val)
    next()
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn("space-y-4", className)}
    >
      <div>
        <Text variant={"body-large"} className="font-medium">
          Where the campaign is carried out?
        </Text>
        <Text variant={"caption"}>
          By default the location will be the same as the location of the
          creator (organization)
        </Text>
      </div>
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <Controller
          control={form.control}
          name="country"
          render={({ field, fieldState }) => (
            <Field
              className="min-w-0 flex-1 gap-1"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel htmlFor="combobox-country">Country</FieldLabel>
              <Combobox
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={field.value}
                items={countries}
              >
                <ComboboxInput
                  id="combobox-country"
                  placeholder="Type the country..."
                  className="w-full"
                  aria-invalid={fieldState.invalid}
                />
                <ComboboxContent>
                  <ComboboxEmpty>No country found.</ComboboxEmpty>
                  <ComboboxList>
                    {(country) => (
                      <ComboboxItem
                        key={country.alpha3Code}
                        value={country.name}
                      >
                        {country.name}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="zipCode"
          render={({ field, fieldState }) => (
            <Field
              className="min-w-0 flex-1 gap-1"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel htmlFor="input-zip-code" aria-hidden="true">
                Zip Code
              </FieldLabel>
              <Input
                {...field}
                id="input-zip-code"
                type="text"
                inputMode="text"
                placeholder="eg. 53712"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className="mt-auto flex justify-end">
        <Button type="submit">
          Next
          <ArrowRightIcon />
        </Button>
      </div>
    </form>
  )
}

export { CampaignLocationForm }
