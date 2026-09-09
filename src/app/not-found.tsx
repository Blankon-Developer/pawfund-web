"use client"

import { MainContainer } from "@/components/main-container"
import { Button } from "@/shadcn-ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shadcn-ui/empty"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { create } from "zustand"

const notFoundStore = create<{
  isNotFound: boolean
  setIsNotFound: (isNotFound: boolean) => void
}>((set) => ({
  isNotFound: false,
  setIsNotFound: (isNotFound: boolean) => set({ isNotFound }),
}))

export const useIsNotFound = () => notFoundStore((state) => state.isNotFound)

export default function NotFound() {
  const setIsNotFound = notFoundStore((state) => state.setIsNotFound)

  useEffect(() => {
    setIsNotFound(true)

    return () => {
      setIsNotFound(false)
    }
  }, [setIsNotFound])
  return (
    <MainContainer className="flex items-center justify-center">
      <Empty className="max-w-lg border">
        <EmptyHeader>
          <EmptyTitle>404 — Not Found</EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist. Maybe it was
            moved or deleted.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant={"outline"}>
            <ArrowLeftIcon />
            <Link href={"/"}>Back to Home</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </MainContainer>
  )
}
