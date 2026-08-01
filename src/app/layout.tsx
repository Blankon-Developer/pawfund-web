import "./globals.css"

import { Geist_Mono, Space_Grotesk } from "next/font/google"

import { MSWProvider } from "@/components/provider/msw-provider"
import { ThemeProvider } from "@/components/provider/theme-provider"
import { Toaster } from "@/shadcn-ui/sonner"
import { cn } from "@/utils"

const fontHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontHeading.variable,
        fontSans.variable,
        fontMono.variable,
        "font-sans"
      )}
    >
      <body>
        <ThemeProvider>
          <MSWProvider>
            {children}
            <Toaster />
          </MSWProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
