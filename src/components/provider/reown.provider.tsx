"use client"

import { env } from "@/lib/env"
import { siwxConfig } from "@/lib/siwx-config"
import {
  networks,
  projectId,
  wagmiAdapter,
  wagmiConfig,
} from "@/lib/wagmi-adapter"
import { baseSepolia } from "@reown/appkit/networks"
import type { Metadata as ReownMetadata } from "@reown/appkit/react"
import { createAppKit } from "@reown/appkit/react"
import { type ReactNode } from "react"
import { cookieToInitialState, WagmiProvider } from "wagmi"

// Set up metadata
const metadata: ReownMetadata = {
  name: "Pawfund Web",
  description: "Web3 based animal donation platform on the EVM network",
  url: env.NEXT_PUBLIC_BASE_URL,
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
}

// Create the modal
createAppKit({
  adapters: [wagmiAdapter],
  metadata,
  projectId,
  networks,
  defaultNetwork: networks[0],
  features: {
    analytics: true,
    reownAuthentication: false,
    socials: ["google", "github", "apple", "x", "discord", "farcaster"],
  },
  themeVariables: {
    "--apkt-accent": "var(--primary)",
  },
  siwx: siwxConfig,
  tokens: {
    [`eip155:${baseSepolia.id}`]: {
      address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC Base Sepolia
    },
  },
})

function ReownProvider({
  children,
  cookies,
}: {
  children: ReactNode
  cookies: string | null
}) {
  const initialState = cookieToInitialState(wagmiConfig, cookies)

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      {children}
    </WagmiProvider>
  )
}

export { ReownProvider }
