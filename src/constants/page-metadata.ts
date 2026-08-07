import { env } from "@/lib/env"
import type { Metadata } from "next"

const APP_NAME = "Pawfund"
const TITLE = `Web3 Crowdfunding Platform for Animal Welfare - ${APP_NAME}`
const APP_DESCRIPTION =
  "Pawfund is a Web3 crowdfunding platform for animal welfare, enabling transparent and secure donations using USDC on the Base network."

const APP_URL = env.NEXT_PUBLIC_BASE_URL

export const mainMetadata: Metadata = {
  metadataBase: new URL(APP_URL),

  title: {
    default: TITLE,
    template: `%s - ${APP_NAME}`,
  },

  description: APP_DESCRIPTION,

  applicationName: APP_NAME,

  keywords: [
    "Pawfund",
    "Animal Welfare",
    "Crowdfunding",
    "Crypto Donation",
    "Web3",
    "Blockchain",
    "Base",
    "Base Sepolia",
    "Ethereum",
    "USDC",
    "Fundraising",
    "Donation Platform",
    "Decentralized Donation",
  ],

  authors: [
    {
      name: "Pawfund Team",
    },
  ],

  creator: "Pawfund Team",

  publisher: "Pawfund",

  category: "Finance",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: APP_NAME,
    title: TITLE,
    description: APP_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pawfund",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/icon.svg" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: "default",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}
