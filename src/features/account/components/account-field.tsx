import { Badge } from "@/components/reui/badge"
import { Text } from "@/components/typography"
import { FieldLabel } from "@/shadcn-ui/field"
import { cn } from "@/utils"

type AccountFieldProps = {
  label: string
  labelFor?: string
  caption?: string
  className?: string
  isDirty?: boolean
  children: React.ReactNode
  "aria-invalid"?: boolean
}

function AccountField({
  isDirty,
  labelFor,
  label,
  caption,
  children,
  className,
}: AccountFieldProps) {
  const captions = caption?.split("\\n").map((val) => val.trim()) || []
  return (
    <div
      className={cn(
        "relative flex h-fit flex-col gap-4 rounded-xl bg-card p-4 sm:p-6",
        isDirty && "border border-warning/20",
        className
      )}
    >
      <div className="grow space-y-0.5">
        <div className="flex items-center gap-2">
          <FieldLabel className="text-base font-medium" htmlFor={labelFor}>
            {label}
          </FieldLabel>
          {isDirty && (
            <Badge size={"xs"} variant={"warning-light"}>
              Unsaved
            </Badge>
          )}
        </div>
        {caption && (
          <Text
            variant={"caption"}
            className="w-full text-pretty text-foreground"
          >
            {captions.length > 1
              ? captions.map((caption, idx) => (
                  <span className="block" key={idx}>
                    {caption}
                  </span>
                ))
              : captions[0]}
          </Text>
        )}
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  )
}

export { AccountField }
