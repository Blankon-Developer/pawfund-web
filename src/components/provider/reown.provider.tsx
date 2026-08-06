"use client"

import { env } from "@/lib/env"
import { siwxConfig } from "@/lib/siwx-config"
import {
  networks,
  projectId,
  wagmiAdapter,
  wagmiConfig,
} from "@/lib/wagmi-adapter"
import { useJWTStore } from "@/stores/jwt.store"
import { baseSepolia } from "@reown/appkit/networks"
import type { Metadata as ReownMetadata } from "@reown/appkit/react"
import { createAppKit, useAppKitAccount } from "@reown/appkit/react"
import { QueryClientContext } from "@tanstack/react-query"
import { useContext, useEffect } from "react"
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
  children: React.ReactNode
  cookies: string | null
}) {
  const initialState = cookieToInitialState(wagmiConfig, cookies)

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      {children}
    </WagmiProvider>
  )
}

function ReownDisconnectHandler({ children }: { children: React.ReactNode }) {
  const queryClient = useContext(QueryClientContext)

  if (!queryClient) {
    throw new Error(
      "ReownDisconnectHandler must be used within a ReactQueryProvider"
    )
  }

  const { status } = useAppKitAccount()
  const jwtToken = useJWTStore((state) => state.token)
  console.log({jwtToken});
  const clearToken = useJWTStore((state) => state.clearToken)
  useEffect(() => {
    if (status === "disconnected") {
      if (jwtToken) clearToken()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return <>{children}</>
}

export { ReownDisconnectHandler, ReownProvider }
