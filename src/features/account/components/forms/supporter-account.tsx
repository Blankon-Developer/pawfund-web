"use client"

import { AvatarInput } from "@/components/avatar-input"
import { Text } from "@/components/typography"
import { useAccountFormStore } from "@/features/account/stores/form.store"
import { FileWithPreview } from "@/hooks/file-upload"
import { useHookForm } from "@/lib/hook-form"
import { Button } from "@/shadcn-ui/button"
import { FieldDescription, FieldError } from "@/shadcn-ui/field"
import { Input } from "@/shadcn-ui/input"
import { cn } from "@/utils"
import { TrashIcon } from "lucide-react"
import { useCallback, useEffect } from "react"
import { Controller } from "react-hook-form"
import { toast } from "sonner"
import { useAccount } from "wagmi"
import z from "zod"

import { AccountField } from "../account-field"

const supporterAccountSchema = z.object({
  name: z.string().min(1, "Fundraiser name is required."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  avatar: z.custom<FileWithPreview>().nullish(),
})
type SupporterAccountValues = z.infer<typeof supporterAccountSchema>

type SupporterAccountFormProps = {
  className?: string
  id: string
  defaultValues: SupporterAccountValues
}

function SupporterAccountForm({
  className,
  id,
  defaultValues,
}: SupporterAccountFormProps) {
  const { address } = useAccount()

  const form = useHookForm({
    schema: supporterAccountSchema,
    defaultValues,
  })

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

  return (
    <form
      id={id}
      className={cn("flex flex-col gap-4", className)}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      {/* Avatar */}
      <Controller
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
                  hidden={field.value?.id != defaultValues.avatar?.id}
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

      {/* Supporter Name */}
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <AccountField
            isDirty={fieldState.isDirty}
            labelFor={field.name}
            label="Display Name"
            caption="This is your account's name displayed on PawFund."
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

      {/* Email */}
      <Controller
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

export { SupporterAccountForm }
