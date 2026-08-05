import { MSWProvider } from "@/components/provider/msw.provider"
import { ReactQueryProvider } from "@/components/provider/react-query.provider"
import { ReownProvider } from "@/components/provider/reown.provider"
import { ThemeProvider } from "@/components/provider/theme.provider"
import { Toaster } from "@/shadcn-ui/sonner"
import { headers } from "next/headers"

export default async function RootProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersObj = await headers()
  const cookies = headersObj.get("cookie")

  return (
    <MSWProvider>
      <ReownProvider cookies={cookies}>
        <ReactQueryProvider>
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>
      </ReownProvider>
    </MSWProvider>
  )
}
