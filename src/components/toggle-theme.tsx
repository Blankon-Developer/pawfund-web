"use client"

import { cn } from "@/utils/cn"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button, buttonVariants } from "./shadcn-ui/button"
import { VariantProps } from "class-variance-authority"
import { useEffect, useState } from "react"

export function ToggleTheme({
  variant = "outline",
  size = "icon",
  className,
}: Omit<VariantProps<typeof buttonVariants>, "size"> & {
  className?: string
  size?: "icon" | "icon-xs" | "icon-sm" | "icon-lg"
}) {
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    function applyMounted() {
      setMounted(true)
    }
    applyMounted()
  }, [])

  if (!mounted)
    return (
      <Button size={size} variant={variant}>
        <span className="sr-only">Toggle theme</span>
      </Button>
    )

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={className}
      suppressHydrationWarning
    >
      <SunIcon
        className={cn(
          "transition-all duration-300",
          theme === "dark"
            ? "scale-0 -rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        )}
      />
      <MoonIcon
        className={cn(
          "absolute transition-all duration-300",
          theme === "dark"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-90 opacity-0"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
