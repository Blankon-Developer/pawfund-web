import "./globals.css"

import { Geist_Mono, Space_Grotesk } from "next/font/google"

import { cn } from "@/utils"
import RootProvider from "./_components/provider"

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
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
