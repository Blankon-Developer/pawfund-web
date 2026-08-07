import { cn } from "@/utils"

type MainContainerProps = {} & React.ComponentProps<"div">

export function MainContainer({
  children,
  className,
  ...props
}: MainContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto min-h-svh w-full max-w-360 px-4 sm:px-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
