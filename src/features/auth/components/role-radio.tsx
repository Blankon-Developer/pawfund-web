import { Building2Icon, HandHeart } from "lucide-react"
import { Field, FieldLabel, FieldTitle } from "@/shadcn-ui/field"
import { RadioGroup, RadioGroupItem } from "@/shadcn-ui/radio-group"
import { cn } from "@/utils"
import { Role } from "../types/auth.types"
import type { LucideIcon } from "lucide-react"

const roleItems: {
  title: string
  description: string
  value: Role
  icon: LucideIcon
}[] = [
  {
    title: "I’m a Supporter",
    description:
      "I want to explore campaigns and make donations to help animals in need.",
    value: "supporter",
    icon: HandHeart,
  },
  {
    title: "I’m a Fundraiser",
    description:
      "I represent a shelter, rescue, or individual and would like to create a fundraising campaign.",
    value: "fundraiser",
    icon: Building2Icon,
  },
]

type RoleRadioProps = {
  defaultValue?: Role
  value?: Role
  onValueChange?: (role: Role) => void
  className?: string
  name?: string
  "aria-invalid"?: boolean
}

function RoleRadio({
  className,
  defaultValue,
  value,
  onValueChange,
  name,
  "aria-invalid": ariaInvalid,
}: RoleRadioProps) {
  return (
    <RadioGroup
      className={cn(
        "grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2",
        className
      )}
      defaultValue={defaultValue}
      name={name}
      value={value ?? ""}
      onValueChange={(v) => onValueChange?.(v as Role)}
      aria-invalid={ariaInvalid}
    >
      {roleItems.map((item) => (
        <FieldLabel
          key={item.value}
          htmlFor={item.value}
          className="relative cursor-pointer! rounded-xl! bg-muted/30! p-0! has-data-checked:border-primary/40! has-data-checked:bg-muted! aria-invalid:border-destructive/40! aria-invalid:bg-destructive/2! data-[disabled=true]:cursor-not-allowed! data-[disabled=true]:opacity-50!"
          aria-invalid={ariaInvalid}
        >
          <Field orientation="horizontal" className="p-5!">
            <div className="absolute top-5 right-5">
              <RadioGroupItem value={item.value} id={item.value} />
            </div>
            <FieldTitle className="flex flex-col items-start">
              <item.icon className="size-6" />
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-lg font-semibold">{item.title}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {item.description}
                </span>
              </div>
            </FieldTitle>
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  )
}

export { RoleRadio }
