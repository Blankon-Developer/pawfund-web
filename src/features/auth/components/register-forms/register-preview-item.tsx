import { Label } from "@/shadcn-ui/label"
import { LucideIcon } from "lucide-react"

function RegisterPreviewItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="grid gap-1">
      <div>
        <Label className="font-medium">
          <Icon className="size-4" />
          {label}
        </Label>
      </div>
      <p className="text-muted-foreground">{value}</p>
    </div>
  )
}

export { RegisterPreviewItem }
