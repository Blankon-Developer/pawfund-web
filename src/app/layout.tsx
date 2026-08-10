import "./globals.css"

import { Geist_Mono, Space_Grotesk } from "next/font/google"

import { cn } from "@/utils"
import RootProvider from "./_components/provider"
import { mainMetadata } from "@/constants/page-metadata"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TooltipProvider } from "@/shadcn-ui/tooltip"

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

export const metadata = mainMetadata

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
        <RootProvider>
          <TooltipProvider>
            <Header />
            {children}
            <Footer />
          </TooltipProvider>
        </RootProvider>
      </body>
    </html>
  )
}
