"use client"

import { useRouter } from "next/navigation"
import React from "react"
import { Button } from "./shadcn-ui/button"
import { ArrowLeftIcon } from "lucide-react"

function BackButton({
  variant = "ghost",
  size,
  onClick,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const router = useRouter()
  return (
    <Button
      variant={variant}
      size={children ? size : "icon"}
      onClick={(e) => {
        onClick?.(e)
        router.back()
      }}
      {...props}
    >
      {children ? children : <ArrowLeftIcon />}
    </Button>
  )
}

export { BackButton }
