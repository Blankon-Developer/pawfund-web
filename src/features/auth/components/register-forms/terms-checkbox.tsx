import { Checkbox } from "@/shadcn-ui/checkbox"
import { Field, FieldError, FieldLabel } from "@/shadcn-ui/field"
import { cn } from "@/utils"
import { Route } from "next"
import Link from "next/link"
import * as z from "zod"
import { useHookForm } from "@/lib/hook-form"
import { Controller } from "react-hook-form"

function useTermsCheckForm() {
  return useHookForm({
    schema: z.object({
      terms: z.boolean().refine((val) => val === true, {
        message: "Please ensure you agree to our policy to proceed.",
      }),
    }),
    defaultValues: {
      terms: false,
    },
  })
}

function TermsCheckbox({
  className,
  disabled,
  onTermsChecked,
  formId,
}: {
  className?: string
  disabled?: boolean
  formId: string
  onTermsChecked?: () => void
}) {
  const form = useTermsCheckForm()

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit((values) => {
        if (!values.terms) return
        onTermsChecked?.()
      })}
    >
      <Controller
        disabled={disabled}
        control={form.control}
        name="terms"
        render={({ field, fieldState }) => (
          <Field>
            <div className={cn("flex items-center gap-2.5", className)}>
              <Checkbox
                id="terms-checkbox"
                name="terms-checkbox"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange?.(checked)}
                aria-invalid={fieldState.invalid}
                disabled={field.disabled}
              />
              <FieldLabel
                htmlFor="terms-checkbox"
                className="felx text- gap-1 font-normal"
              >
                I agree to the
                <Link
                  href={"/terms" as Route}
                  target="_blank"
                  className="underline"
                >
                  Terms of Service
                </Link>
                and
                <Link
                  href={"/privacy" as Route}
                  target="_blank"
                  className="underline"
                >
                  Privacy Policy
                </Link>
                of Paw Fund.
              </FieldLabel>
            </div>
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
    </form>
  )
}

export { TermsCheckbox, useTermsCheckForm }
