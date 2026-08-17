import { cn } from "@/utils"

type MainContainerProps = {} & React.ComponentProps<"div">

export function MainContainer({
  children,
  className,
  ...props
}: MainContainerProps) {
  return (
    <main
      className={cn(
        "mx-auto min-h-[calc(100vh-14.8rem)] w-[calc(100%-1.5rem)] max-w-360 sm:w-[calc(100%-2.5rem)]",
        className
      )}
      {...props}
    >
      {children}
    </main>
  )
}
