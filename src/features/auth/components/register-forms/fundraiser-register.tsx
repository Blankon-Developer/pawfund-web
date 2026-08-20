"use client"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  GlobeIcon,
  InfoIcon,
  MailIcon,
  MapPinIcon,
  UserIcon,
  UserRoundIcon,
  WalletIcon,
} from "lucide-react"
import Image from "next/image"
import { useCallback } from "react"
import { Controller } from "react-hook-form"
import { toast } from "sonner"
import { useAccount } from "wagmi"
import * as z from "zod"

import countries from "@/assets/countries.json"
import { AvatarInput } from "@/components/avatar-input"
import { H3, Text } from "@/components/typography"
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
  FieldGroup,
  FieldLabel,
} from "@/shadcn-ui/field"
import { Input } from "@/shadcn-ui/input"
import { cn } from "@/utils"

import type { FileWithPreview } from "@/hooks/file-upload"
import { useRegistrationStore } from "../../stores/registration.store"
import { RegisterPreviewItem } from "./register-preview-item"
import { TermsCheckbox, useTermsCheckForm } from "./terms-checkbox"

const fundraiserRegisterSchema = z.object({
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
  country: z.string().min(1, "Please select a country."),
  zipCode: z.string().min(1, "Please enter your zip code."),
  avatar: z.custom<FileWithPreview>().nullish(),
})

type FundraiserRegisterValues = z.infer<typeof fundraiserRegisterSchema>
type FundraiserRegisterFormProps = {
  className?: string
  onSubmit?: (values: FundraiserRegisterValues) => void
  onPrevious?: () => void
}

function FundraiserRegisterForm({
  className,
  onSubmit,
  onPrevious,
}: FundraiserRegisterFormProps) {
  const fundraiserValues = useRegistrationStore(
    (state) => state.fundraiserValues
  )
  const setFundraiserValues = useRegistrationStore(
    (state) => state.setFundraiserValues
  )
  const setStep = useRegistrationStore((state) => state.setStep)

  const form = useHookForm({
    schema: fundraiserRegisterSchema,
    defaultValues: {
      name: fundraiserValues?.name ?? "",
      email: fundraiserValues?.email ?? "",
      contactPerson: {
        name: fundraiserValues?.contactPerson?.name ?? "",
        phone: fundraiserValues?.contactPerson?.phone ?? "",
      },
      socialUrl: fundraiserValues?.socialUrl ?? "",
      country: fundraiserValues?.country ?? "",
      zipCode: fundraiserValues?.zipCode ?? "",
      avatar: fundraiserValues?.avatar ?? null,
    },
  })

  const handleFormSubmit = form.handleSubmit((values) => {
    setFundraiserValues(values)
    setStep(3)
    onSubmit?.(values)
    console.log({ values })
  })

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, onChange: (v: string) => void) => {
      let value = e.target.value
      // Always ensure the value starts with "+"
      if (!value.startsWith("+") && value !== "") {
        value = "+" + value.replace(/^\+*/, "")
      }
      onChange(value)
    },
    []
  )

  return (
    <form
      className={cn("flex flex-col items-center gap-8", className)}
      onSubmit={handleFormSubmit}
    >
      <div className="space-y-1 text-center">
        <H3>Let&apos;s Get to Know You</H3>
        <Text variant={"body"} className="mt-4">
          Tell Us a Bit About You
        </Text>
      </div>

      <div className="flex w-full max-w-2xl flex-col-reverse items-center gap-6 sm:flex-row">
        <FieldGroup className="w-full grow gap-5 sm:w-auto">
          <div className="flex w-full flex-col-reverse items-center gap-6 sm:flex-row">
            <div className="w-full space-y-5 sm:w-auto sm:grow">
              {/* Fundraiser Name */}
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field
                    className="w-full gap-1"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel htmlFor="input-fundraiser-name">
                      Fundraiser Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="input-fundraiser-name"
                      type="text"
                      placeholder="Paws & Care Foundation"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field
                    className="w-full gap-1"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel htmlFor="input-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="input-email"
                      inputMode="email"
                      type="text"
                      placeholder="contact@pawscare.org"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            {/* Avatar */}
            <Controller
              control={form.control}
              name="avatar"
              render={({ field, fieldState }) => (
                <Field className="w-fit">
                  <AvatarInput
                    label={
                      <>
                        Avatar
                        <span className="text-xs text-muted-foreground">
                          {" "}
                          (Optional)
                        </span>
                      </>
                    }
                    defaultAvatar={field.value?.preview}
                    onFileChange={(file) => field.onChange(file)}
                    showErrorAlert={false}
                    aria-invalid={fieldState.invalid}
                    onError={(err) =>
                      toast.error("Error uploading avatar", {
                        description: `${err.join("\n")}`,
                      })
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Contact Person */}
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Controller
              control={form.control}
              name="contactPerson.name"
              render={({ field, fieldState }) => (
                <Field
                  className="min-w-0 flex-1 gap-1"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor="input-contact-name">
                    Contact Person
                  </FieldLabel>
                  <Input
                    {...field}
                    id="input-contact-name"
                    type="text"
                    placeholder="Fullname"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="contactPerson.phone"
              render={({ field, fieldState }) => (
                <Field
                  className="min-w-0 flex-1 gap-1"
                  data-invalid={fieldState.invalid}
                >
                  {/* Spacer to align input with the one on the left that has a label */}
                  <FieldLabel
                    htmlFor="input-contact-phone"
                    className="hidden sm:invisible sm:block"
                    aria-hidden="true"
                  >
                    &nbsp;
                  </FieldLabel>
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
                    <InfoIcon className="size-3" />
                    Include country code (e.g. +14161234567)
                  </FieldDescription>
                </Field>
              )}
            />
          </div>

          {/* Website / Social URL */}
          <Controller
            control={form.control}
            name="socialUrl"
            render={({ field, fieldState }) => (
              <Field className="w-full gap-1" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="input-social-url">
                  Website or Social Media URL
                </FieldLabel>
                <Input
                  {...field}
                  id="input-social-url"
                  type="text"
                  inputMode="url"
                  placeholder="https://instagram.com/pawfund"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Country + Zip Code */}
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Controller
              control={form.control}
              name="country"
              render={({ field, fieldState }) => (
                <Field
                  className="min-w-0 flex-1 gap-1"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor="combobox-country">
                    Where is the fundraiser based?
                  </FieldLabel>
                  <Combobox
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    items={countries}
                  >
                    <ComboboxInput
                      id="combobox-country"
                      placeholder="Country"
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                  <FieldLabel
                    htmlFor="input-zip-code"
                    className="hidden sm:invisible sm:block"
                    aria-hidden="true"
                  >
                    &nbsp;
                  </FieldLabel>
                  <Input
                    {...field}
                    id="input-zip-code"
                    type="text"
                    inputMode="numeric"
                    placeholder="Zip Code"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </div>

      <div className="mt-auto flex w-full justify-between gap-4">
        <Button
          type="button"
          variant={"outline"}
          size={"icon"}
          onClick={() => onPrevious?.()}
        >
          <ArrowLeftIcon data-icon="inline-start" />
        </Button>
        <Button type="submit">
          Next
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </div>
    </form>
  )
}

function FundraiserRegisterPreview({
  className,
  onPrevious,
}: {
  className?: string
  onPrevious?: () => void
}) {
  const form = useTermsCheckForm()

  const fundraiserValues = useRegistrationStore(
    (state) => state.fundraiserValues
  )
  const { address } = useAccount()

  const selectedCountry = countries.find(
    (c) => c.alpha2Code === fundraiserValues?.country
  )

  const handleFormSubmit = form.handleSubmit((values) => {
    console.log({ ...fundraiserValues, isTermsAgreed: values.terms })
  })

  return (
    <form
      onSubmit={handleFormSubmit}
      className={cn("flex flex-col items-center gap-8", className)}
    >
      <div className="space-y-1 text-center">
        <H3>You&apos;re Almost In!</H3>
        <Text variant={"body"} className="mt-4">
          Here&apos;s what you&apos;ve shared. Make sure it looks good.
        </Text>
      </div>

      <div className="mt-4 grid w-full max-w-lg gap-4">
        <div className="mx-auto aspect-square size-24 overflow-clip rounded-full border">
          {fundraiserValues?.avatar?.preview ? (
            <Image
              src={fundraiserValues?.avatar?.preview}
              alt="Avatar"
              className="aspect-square w-full object-cover"
              width={80}
              height={80}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted/60">
              <UserRoundIcon className="size-6 text-muted-foreground" />
            </div>
          )}
        </div>
        <RegisterPreviewItem
          icon={WalletIcon}
          label="Wallet Address"
          value={address ?? "N/A"}
        />
        <RegisterPreviewItem
          icon={UserIcon}
          label="Fundraiser Name"
          value={fundraiserValues?.name ?? "N/A"}
        />
        <RegisterPreviewItem
          icon={MailIcon}
          label="Email"
          value={fundraiserValues?.email ?? "N/A"}
        />
        <RegisterPreviewItem
          icon={UserIcon}
          label="Contact Person"
          value={
            fundraiserValues?.contactPerson?.name
              ? `${fundraiserValues.contactPerson.name}, ${fundraiserValues.contactPerson.phone}`
              : "N/A"
          }
        />
        <RegisterPreviewItem
          icon={GlobeIcon}
          label="Website / Social"
          value={fundraiserValues?.socialUrl ?? "N/A"}
        />
        <RegisterPreviewItem
          icon={MapPinIcon}
          label="Location"
          value={
            fundraiserValues?.country
              ? `${selectedCountry?.name ?? fundraiserValues.country}${fundraiserValues.zipCode ? `, ${fundraiserValues.zipCode}` : ""}`
              : "N/A"
          }
        />
        <Controller
          control={form.control}
          name="terms"
          render={({ field, fieldState }) => (
            <Field>
              <TermsCheckbox
                className="mt-3"
                value={field.value}
                onValueChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError className="text-xs" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </div>
      <div className="mt-auto flex w-full justify-between gap-4">
        <Button
          type="button"
          variant={"outline"}
          size={"icon"}
          onClick={() => onPrevious?.()}
        >
          <ArrowLeftIcon data-icon="inline-start" />
        </Button>
        <Button type="submit">Create Account</Button>
      </div>
    </form>
  )
}

export { FundraiserRegisterForm, FundraiserRegisterPreview }
export type { FundraiserRegisterValues }
