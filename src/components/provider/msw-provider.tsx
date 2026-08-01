"use client"

import { env } from "@/lib/env"
import { Suspense, use } from "react"

const isMockingEnabled =
  process.env.NODE_ENV === "development" && env.NEXT_PUBLIC_MOCK_SERVER

const mockingEnabledPromise =
  isMockingEnabled && typeof window !== "undefined"
    ? import("@/_mocks/worker").then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest: "bypass",
        })
      })
    : Promise.resolve()

export function MSWProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isMockingEnabled) {
    return children
  }
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  )
}

function MSWProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  use(mockingEnabledPromise)
  return children
}
