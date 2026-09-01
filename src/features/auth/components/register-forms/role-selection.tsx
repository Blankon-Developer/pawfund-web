"use client"

import { H3, Text } from "@/components/typography"
import { useHookForm } from "@/lib/hook-form"
import { Button } from "@/shadcn-ui/button"
import { Field, FieldError } from "@/shadcn-ui/field"
import { cn } from "@/utils"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Controller } from "react-hook-form"
import * as z from "zod"
import { useRegistrationStore } from "../../stores/registration.store"
import { Role } from "../../types/auth.types"
import { RoleRadio } from "../role-radio"

type RoleSelectionValues = z.infer<typeof roleSelectionSchema>
type RoleSelectionFormProps = {
  className?: string
  onSubmit?: (values: RoleSelectionValues) => void
}
const roleSelectionSchema = z.object({
  role: z.enum(["fundraiser", "supporter"] as [Role, ...Role[]], {
    error: "Please select a role to continue.",
  }),
})

function RoleSelectionForm({ className, onSubmit }: RoleSelectionFormProps) {
  const router = useRouter()
  const selectedRole = useRegistrationStore((state) => state.selectedRole)
  const setSelectedRole = useRegistrationStore((state) => state.setSelectedRole)
  const setStep = useRegistrationStore((state) => state.setStep)

  const form = useHookForm({
    schema: roleSelectionSchema,
    defaultValues: {
      role: selectedRole,
    },
  })

  const handleFormSubmit = form.handleSubmit((values) => {
    onSubmit?.(values)
    setSelectedRole(values.role)
    setStep(2)
  })

  return (
    <form
      className={cn("flex flex-col items-center gap-8", className)}
      onSubmit={handleFormSubmit}
    >
      <div className="space-y-1 text-center">
        <H3>Tell Us Who You Are</H3>
        <Text variant={"body"} className="mt-4">
          How Would You Like to Get Involved?
        </Text>
        <Text variant={"body-small"} className="text-muted-foreground">
          At Paw Fund, every kind of help matters. Whether you&apos;re here to
          support rescue efforts or to lead them.
        </Text>
      </div>

      <Controller
        control={form.control}
        name="role"
        render={({ field, fieldState }) => (
          <Field className="flex w-full flex-col items-center">
            <RoleRadio
              {...field}
              onValueChange={(role) => field.onChange(role)}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.error && (
              <FieldError className="text-center" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <div className="mt-auto flex w-full justify-between gap-4">
        <Button type="button" variant={"ghost"} onClick={() => router.back()}>
          <ArrowLeftIcon data-icon="inline-start" />
          Cancel
        </Button>
        <Button type="submit">
          Next
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </div>
    </form>
  )
}

export { RoleSelectionForm }
export type { RoleSelectionValues }
