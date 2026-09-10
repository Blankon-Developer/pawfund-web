"use client"

import { BackButton } from "@/components/back-button"
import { MainContainer } from "@/components/main-container"
import { H5 } from "@/components/typography"
import { Button } from "@/shadcn-ui/button"
import { cn } from "@/utils"
import { ArrowLeftIcon, SaveIcon } from "lucide-react"

export function AccountLayout({
  children,
  isDirty,
  formId,
}: {
  children?: React.ReactNode
  isDirty?: boolean
  formId: string
}) {
  return (
    <MainContainer as="div" className="relative min-h-svh max-w-3xl">
      <header
        className={`sticky top-0 z-30 flex h-[4.5rem] items-center justify-between bg-background`}
      >
        <div className="flex w-full items-center gap-2">
          <BackButton variant={"ghost"} size={"icon"}>
            <ArrowLeftIcon strokeWidth={2.1} />
          </BackButton>
          <H5>Account</H5>
        </div>
      </header>

      <main
        className={cn(
          isDirty
            ? `h-[calc(100svh-4.5rem-4rem)]`
            : `h-[calc(100svh-4.5rem)] pb-4`,
          "scroll-fade scrollbar-none overflow-y-auto"
        )}
      >
        {children}
      </main>

      {isDirty && (
        <footer
          className={`sticky bottom-0 z-30 flex h-[4rem] items-center justify-end gap-2 bg-background`}
        >
          <div className="flex items-center gap-2">
            <Button form={formId} type="reset" variant={"secondary"} size="sm">
              Reset Changes
            </Button>
            <Button size="sm" type="submit" form={formId}>
              <SaveIcon />
              Save
            </Button>
          </div>
        </footer>
      )}
    </MainContainer>
  )
}
