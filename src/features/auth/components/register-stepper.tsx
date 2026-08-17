import { cn } from "@/utils"

type RegisterStepperProps = {
  className?: string
  clickable?: boolean
  step: 1 | 2 | 3
  onStepClick?: (step: 1 | 2 | 3) => void
}

function RegisterStepper({
  className,
  clickable,
  step,
  onStepClick,
}: RegisterStepperProps) {
  const handleClick = (newStep: 1 | 2 | 3) => {
    if (clickable) {
      onStepClick?.(newStep)
    }
  }

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-1 sm:max-w-sm",
        className
      )}
    >
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold sm:size-10 sm:text-base",
          step >= 1 && "bg-primary text-primary-foreground",
          clickable && "cursor-pointer"
        )}
        onClick={() => handleClick(1)}
      >
        1
      </div>
      <div
        className={cn(
          "h-1 w-full rounded-full bg-muted",
          step >= 2 && "bg-primary"
        )}
      />
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold sm:size-10 sm:text-base",
          step >= 2 && "bg-primary text-primary-foreground",
          clickable && "cursor-pointer"
        )}
        onClick={() => handleClick(2)}
      >
        2
      </div>
      <div
        className={cn(
          "h-1 w-full rounded-full bg-muted",
          step >= 3 && "bg-primary"
        )}
      />
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold sm:size-10 sm:text-base",
          step >= 3 && "bg-primary text-primary-foreground",
          clickable && "cursor-pointer"
        )}
        onClick={() => handleClick(3)}
      >
        3
      </div>
    </div>
  )
}

export { RegisterStepper }
