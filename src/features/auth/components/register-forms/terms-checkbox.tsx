import { Checkbox } from "@/shadcn-ui/checkbox"
import { FieldLabel } from "@/shadcn-ui/field"
import { cn } from "@/utils"
import { Route } from "next"
import Link from "next/link"
import * as z from "zod"
import { useHookForm } from "@/lib/hook-form"

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
  value,
  onValueChange,
  "aria-invalid": ariaInvalid,
  className,
}: {
  value?: boolean
  onValueChange?: (value: boolean | "indeterminate") => void
  "aria-invalid"?: boolean
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Checkbox
        id="terms-checkbox"
        name="terms-checkbox"
        checked={value}
        onCheckedChange={(checked) => onValueChange?.(checked)}
        aria-invalid={ariaInvalid}
      />
      <FieldLabel
        htmlFor="terms-checkbox"
        className="felx text- gap-1 font-normal"
      >
        I agree to the
        <Link href={"/terms" as Route} target="_blank" className="underline">
          Terms of Service
        </Link>
        and
        <Link href={"/privacy" as Route} target="_blank" className="underline">
          Privacy Policy
        </Link>
        of Paw Fund.
      </FieldLabel>
    </div>
  )
}

export { TermsCheckbox, useTermsCheckForm }
