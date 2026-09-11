"use client"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MailIcon,
  UserIcon,
  UserRoundIcon,
  WalletIcon,
} from "lucide-react"
import Image from "next/image"
import { Controller } from "react-hook-form"
import { toast } from "sonner"
import { useAccount } from "wagmi"
import * as z from "zod"

import { AvatarInput } from "@/components/avatar-input"
import { H3, Text } from "@/components/typography"
import { useHookForm } from "@/lib/hook-form"
import { Button } from "@/shadcn-ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shadcn-ui/field"
import { Input } from "@/shadcn-ui/input"
import { cn } from "@/utils"

import { useRegistrationStore } from "../../stores/registration.store"

import type { FileWithPreview } from "@/hooks/file-upload"
import { Spinner } from "@/shadcn-ui/spinner"
import {
  useSupporterRegister,
  useUploadProfileImage,
} from "../../hooks/use-register"
import { RegisterPreviewItem } from "./register-preview-item"
import { TermsCheckbox } from "./terms-checkbox"
import { useRouter } from "next/navigation"
import { useSearchParameters } from "@/hooks/search-parameters"

const supporterRegisterSchema = z.object({
  name: z.string().min(1, "Full name is required."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  avatar: z.custom<FileWithPreview>().nullish(),
})

type SupporterRegisterValues = z.infer<typeof supporterRegisterSchema>
type SupporterRegisterFormProps = {
  className?: string
  onSubmit?: (values: SupporterRegisterValues) => void
  onPrevious?: () => void
}

function SupporterRegisterForm({
  className,
  onSubmit,
  onPrevious,
}: SupporterRegisterFormProps) {
  const setSupporterValues = useRegistrationStore(
    (state) => state.setSupporterValues
  )
  const supporterValues = useRegistrationStore((state) => state.supporterValues)

  const setStep = useRegistrationStore((state) => state.setStep)

  const form = useHookForm({
    schema: supporterRegisterSchema,
    defaultValues: {
      name: supporterValues?.name ?? "",
      email: supporterValues?.email ?? "",
      avatar: supporterValues?.avatar ?? null,
    },
  })

  const handleAcceptTerms = form.handleSubmit((values) => {
    setSupporterValues(values)
    setStep(3)
    onSubmit?.(values)
  })

  return (
    <form
      className={cn("flex flex-col items-center gap-8", className)}
      onSubmit={handleAcceptTerms}
    >
      <div className="space-y-1 text-center">
        <H3>Let’s Get to Know You</H3>
        <Text variant={"body"} className="mt-4">
          Tell Us a Bit About You
        </Text>
      </div>

      <div className="flex w-full max-w-xl flex-col-reverse items-center gap-6 sm:flex-row">
        <FieldGroup className="w-full grow gap-5 sm:w-auto">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field className="w-full gap-1" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="input-full-name">Full Name</FieldLabel>
                <Input
                  {...field}
                  id="input-full-name"
                  type="text"
                  placeholder="eg. Johnathan Doe"
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
            name="email"
            render={({ field, fieldState }) => (
              <Field className="w-full gap-1" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="input-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="input-email"
                  inputMode="email"
                  type="text"
                  placeholder="eg. name@example.com"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
        <Button type="submit">
          Next
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </div>
    </form>
  )
}

const TERMS_FORM_ID = "supporter-terms-check"

function SupporterRegisterPreview({
  className,
  onPrevious,
}: {
  className?: string
  onPrevious?: () => void
}) {
  const router = useRouter()
  const { state: searchParams } = useSearchParameters()

  const supporterValues = useRegistrationStore((state) => state.supporterValues)
  const resetRegistration = useRegistrationStore((state) => state.reset)

  const { address } = useAccount()

  const uploadImage = useUploadProfileImage({
    onError: (error) => {
      toast.error("Error while uploading image", {
        description: `${error.message}`,
      })
    },
  })
  const register = useSupporterRegister({
    onError: (error) => {
      toast.error("Failed to register", {
        description: `${error.message}`,
      })
    },
    onSuccess: () => {
      toast.success("Supporter registered successfully")
      router.replace(searchParams.redirect ?? "/")
      resetRegistration()
    },
  })

  const isLoading = uploadImage.isPending || register.isPending

  const handleRegister = async () => {
    if (typeof supporterValues === "undefined") {
      toast.error("The form has not been fully completed.", {
        description:
          "Please double-check and complete any missing information.",
      })
      return
    }

    const { avatar, ...values } = supporterValues

    const image = avatar?.file instanceof File ? avatar.file : undefined

    const { objectKey } =
      (image && (await uploadImage.mutateAsync(image))) || {}

    register.mutate({
      ...values,
      imageObjectKey: objectKey,
    })
  }

  return (
    <div className={cn("flex flex-col items-center gap-8", className)}>
      <div className="space-y-1 text-center">
        <H3>You’re Almost In!</H3>
        <Text variant={"body"} className="mt-4">
          Here’s what you’ve shared. Make sure it looks good.
        </Text>
      </div>
      <div className="mt-4 grid w-full max-w-lg gap-4">
        <div className="mx-auto aspect-square size-24 overflow-clip rounded-full border">
          {supporterValues?.avatar?.preview ? (
            <Image
              src={supporterValues?.avatar?.preview}
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
          label="Full Name"
          value={supporterValues?.name ?? "N/A"}
        />
        <RegisterPreviewItem
          icon={MailIcon}
          label="Email"
          value={supporterValues?.email ?? "N/A"}
        />
        <TermsCheckbox
          formId={TERMS_FORM_ID}
          className="mt-3"
          disabled={isLoading}
          onTermsChecked={handleRegister}
        />
      </div>
      <div className="mt-auto flex w-full justify-between gap-4">
        <Button
          type="button"
          variant={"outline"}
          size={"icon"}
          onClick={() => onPrevious?.()}
          disabled={isLoading}
        >
          <ArrowLeftIcon data-icon="inline-start" />
        </Button>
        <Button type="submit" disabled={isLoading} form={TERMS_FORM_ID}>
          {isLoading && <Spinner />}
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </div>
    </div>
  )
}

export { SupporterRegisterForm, SupporterRegisterPreview }
export type { SupporterRegisterValues }
