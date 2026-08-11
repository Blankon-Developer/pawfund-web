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
        "mx-auto min-h-svh w-[calc(100%-1rem)] max-w-360 sm:w-[calc(100%-2rem)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
