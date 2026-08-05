"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { queryConfig } from "../../lib/react-query"
import { useState } from "react"

type ReactQueryProviderProps = {
  children: React.ReactNode
}

function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export { ReactQueryProvider }
