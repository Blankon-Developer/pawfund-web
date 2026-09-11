"use client"

import countries from "@/assets/countries.json"
import { AvatarInput } from "@/components/avatar-input"
import { Text } from "@/components/typography"
import { useAccountFormStore } from "@/features/account/stores/form.store"
import { FileWithPreview } from "@/hooks/file-upload"
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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel as FieldLabelPrimitive,
} from "@/shadcn-ui/field"
import { Input } from "@/shadcn-ui/input"
import { cn } from "@/utils"
import { TrashIcon } from "lucide-react"
import { useCallback, useEffect } from "react"
import { Controller } from "react-hook-form"
import { toast } from "sonner"
import { useAccount } from "wagmi"
import z from "zod"

import { AccountField } from "../account-field"
import { useGetFundraiserAccount } from "../../hooks/use-get-account"

function FieldLabel(props: React.ComponentProps<typeof FieldLabelPrimitive>) {
  return (
    <FieldLabelPrimitive
      className={cn("font-normal text-muted-foreground", props.className)}
      {...props}
    />
  )
}

const fundraiserAccountSchema = z.object({
  name: z.string().min(1, "Fundraiser name is required."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  contactPerson: z.object({
    name: z.string().min(1, "Please enter contact person's name."),
    phone: z
      .string()
      .min(1, "Please enter contact person's phone number.")
      .regex(/^\+[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  }),
  socialUrl: z.httpUrl("Please enter a valid URL."),
  country: z
    .string("Select a valid country")
    .min(1, "Please select a country."),
  zipCode: z.string().min(1, "Please enter your zip code."),
  avatar: z.custom<FileWithPreview>().nullish(),
})

type FundraiserAccountFormProps = {
  className?: string
  id: string
}

function FundraiserAccountForm({ className, id }: FundraiserAccountFormProps) {
  const { address } = useAccount()

  const { data, isLoading } = useGetFundraiserAccount()

  const form = useHookForm({
    schema: fundraiserAccountSchema,
    defaultValues: {
      avatar: null,
      name: "",
      email: "",
      contactPerson: {
        name: "",
        phone: "",
      },
      socialUrl: "",
      country: "",
      zipCode: "",
    },
  })

  useEffect(() => {
    if (!data) return
    form.reset(
      {
        avatar: data.imageUrl
          ? {
              id: `id-${data.imageUrl}`,
              preview: data.imageUrl ?? undefined,
            }
          : null,
        name: data.name,
        email: data.email,
        contactPerson: data.contactPerson,
        country: data.country,
        socialUrl: data.socialUrl,
        zipCode: String(data.zipCode),
      },
      { keepDirtyValues: true }
    )
  }, [form, data])

  const isDirty = form.formState.isDirty
  const setIsDirty = useAccountFormStore((state) => state.setIsDirty)

  useEffect(() => {
    setIsDirty(isDirty)
  }, [isDirty, setIsDirty])

  const handleSubmit = form.handleSubmit((values) => {
    console.log({ values })
  })

  const handleReset = useCallback(() => {
    form.reset()
  }, [form])

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, onChange: (v: string) => void) => {
      let value = e.target.value
      // to ensure the value always starts with "+"
      if (!value.startsWith("+") && value !== "") {
        value = "+" + value.replace(/^\+*/, "")
      }
      onChange(value)
    },
    []
  )

  return (
    <form
      id={id}
      className={cn("flex flex-col gap-4", className)}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      {/* Fundraiser Name */}
      <Controller
        disabled={isLoading}
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <AccountField
            isDirty={fieldState.isDirty}
            labelFor={field.name}
            label="Fundraiser Name"
            caption="This is the name that will be publicly displayed on your campaigns and profile."
          >
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Pawfund Rescue"
            />
            {fieldState.error && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </AccountField>
        )}
      />

      {/* Avatar */}
      <Controller
        disabled={isLoading}
        control={form.control}
        name="avatar"
        render={({ field, fieldState, formState }) => (
          <AccountField
            isDirty={fieldState.isDirty}
            label="Avatar"
            caption="This is your organization’s logo. \n Click on the avatar to upload a custom one."
            className="relative sm:flex-row"
          >
            <div className="flex gap-3">
              <div className="flex flex-col items-center gap-2">
                <AvatarInput
                  disabled={field.disabled}
                  className="w-fit"
                  hideInstruction
                  value={field.value ?? undefined}
                  onFileChange={(file) => {
                    if (!file)
                      return field.onChange(formState.defaultValues?.avatar)
                    field.onChange(file)
                  }}
                  showErrorAlert={false}
                  aria-invalid={fieldState.invalid}
                  onError={(err) =>
                    toast.error("Error uploading avatar", {
                      description: `${err.join("\n")}`,
                    })
                  }
                />
                <Button
                  hidden={
                    !data?.imageUrl || field.value?.preview !== data?.imageUrl
                  }
                  onClick={() => {
                    field.onChange(null)
                  }}
                  variant={"outline"}
                  className="mx-auto bg-transparent text-destructive hover:text-destructive/60"
                  size={"xs"}
                >
                  <TrashIcon />
                  Delete
                </Button>
              </div>
              <FieldDescription className="bottom-4 left-4 mb-6 text-xs sm:absolute sm:bottom-6 sm:left-6 sm:mb-0">
                An organization logo is optional but strongly recommended.
              </FieldDescription>
            </div>
          </AccountField>
        )}
      />

      {/* Email */}
      <Controller
        disabled={isLoading}
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <AccountField
            isDirty={fieldState.isDirty}
            labelFor={field.name}
            label="Email"
            caption="Enter your email address to get updates and notifications."
          >
            <Input
              {...field}
              id={field.name}
              type="text"
              inputMode="email"
              aria-invalid={fieldState.invalid}
              placeholder="pawfund@example.com"
            />
            {fieldState.error && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </AccountField>
        )}
      />

      {/* Contact Person */}
      <AccountField
        isDirty={form.getFieldState("contactPerson").isDirty}
        label="Contact Person"
        caption="Provide a name of someone we can reach out to if needed. This won’t be shown publicly."
      >
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Controller
            disabled={isLoading}
            control={form.control}
            name="contactPerson.name"
            render={({ field, fieldState }) => (
              <Field
                className="min-w-0 flex-1 gap-1"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel htmlFor="input-contact-name">Name</FieldLabel>
                <Input
                  {...field}
                  id="input-contact-name"
                  type="text"
                  placeholder="Full name"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            disabled={isLoading}
            control={form.control}
            name="contactPerson.phone"
            render={({ field, fieldState }) => (
              <Field
                className="min-w-0 flex-1 gap-1"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel htmlFor="input-contact-name">Phone</FieldLabel>
                <Input
                  {...field}
                  id="input-contact-phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="Phone Number"
                  aria-invalid={fieldState.invalid}
                  onChange={(e) => handlePhoneChange(e, field.onChange)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription className="flex items-center gap-1">
                  Include country code (e.g. +14161234567)
                </FieldDescription>
              </Field>
            )}
          />
        </div>
      </AccountField>

      {/* Social URL */}
      <Controller
        disabled={isLoading}
        control={form.control}
        name="socialUrl"
        render={({ field, fieldState }) => (
          <AccountField
            isDirty={fieldState.isDirty}
            labelFor={field.name}
            label="Website or Social Media"
            caption="Add a link to your official website or profile (Instagram, Facebook, etc)."
          >
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              type="text"
              inputMode="url"
              placeholder="https://instagram.com/pawfund"
            />
            {fieldState.error && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </AccountField>
        )}
      />

      {/* Location */}
      <AccountField
        isDirty={
          form.getFieldState("country").isDirty ||
          form.getFieldState("zipCode").isDirty
        }
        label="Location"
        caption="Let supporters know where your as fundraiser is based. This helps build transparency and trust."
      >
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Controller
            disabled={isLoading}
            control={form.control}
            name="country"
            render={({ field, fieldState }) => (
              <Field
                className="min-w-0 flex-1 gap-1"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel htmlFor="combobox-country">Country</FieldLabel>
                <Combobox
                  disabled={field.disabled}
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
                    disabled={field.disabled}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            disabled={isLoading}
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
                  placeholder="53712"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </AccountField>

      {/* Linked Wallet */}

      <AccountField
        label="Linked Wallet"
        caption="Wallet to access blockchain features like secure donations, campaign transparency, and real-time contribution tracking."
      >
        <Text className="truncate">{address ?? "N/A"}</Text>
        <Button
          size={"xs"}
          variant={"outline"}
          className="mt-1 bg-transparent"
          onClick={() => {
            if (!address) return
            navigator.clipboard
              .writeText(address)
              .then(() => toast.success("Address copied!"))
          }}
        >
          Copy Address
        </Button>
      </AccountField>
    </form>
  )
}

export { FundraiserAccountForm }
