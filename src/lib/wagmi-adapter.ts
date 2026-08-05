import { env } from "@/lib/env"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { baseSepolia, type AppKitNetwork } from "@reown/appkit/networks"
import { cookieStorage, createStorage } from "@wagmi/core"
import type { Config } from "wagmi"

// Get projectId from https://dashboard.reown.com
export const projectId = env.NEXT_PUBLIC_REOWN_PROJECT_ID

if (!projectId) {
  throw new Error("Reown project ID is not defined")
}

// The network in the first index will be used as the default network
export const networks = [baseSepolia] satisfies [
  AppKitNetwork,
  ...AppKitNetwork[],
]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
})

export const wagmiConfig = wagmiAdapter.wagmiConfig satisfies Config
