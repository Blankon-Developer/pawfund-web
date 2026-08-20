import { cn } from "@/utils"

type MainContainerProps = {
  as?: "div" | "main" | "section"
} & React.ComponentProps<"div">

export function MainContainer({
  children,
  className,
  as = "main",
  ...props
}: MainContainerProps) {
  const Comp = as
  return (
    <Comp
      className={cn(
        "mx-auto min-h-[calc(100vh-14.8rem)] w-[calc(100%-1.5rem)] max-w-360 sm:w-[calc(100%-2.5rem)]",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
