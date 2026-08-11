"use client"

import { USDCIcon } from "@/assets/icons/usdc"
import { useErc20TokenBalance } from "@/hooks/erc20-token-balance"
import { cn } from "@/utils"
import { maskAddress } from "@/utils/mask-address"
import { useAppKit } from "@reown/appkit/react"
import { useAccount } from "wagmi"
import { MenuPopover } from "./menu-popover"
import { Button } from "./shadcn-ui/button"
import { Skeleton } from "./shadcn-ui/skeleton"

export function LoginButton({ className }: { className?: string }) {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()

  const { data: balanceData, isLoading: isBalanceLoading } =
    useErc20TokenBalance({
      balanceOf: address as `0x${string}`,
      tokenAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    })

  if (isConnected) {
    return (
      <MenuPopover
        trigger={
          <Button
            variant={"secondary"}
            className={cn("bg-gray-200 px-1.5 dark:bg-secondary", className)}
          >
            {isBalanceLoading ? (
              <Skeleton className="hidden h-3 w-16 bg-gray-100 sm:block dark:bg-neutral-900/90" />
            ) : (
              <div className="ml-0.5 hidden items-center gap-0.5 sm:flex">
                <USDCIcon className="size-5.5 text-gray-700 dark:text-neutral-300" />
                <span className="">{balanceData?.formatedBalance}</span>
                <span className="text-muted-foreground">{balanceData?.symbol}</span>
              </div>
            )}

            <span className="rounded-full p-1 px-2 shadow-xs sm:bg-gray-100 sm:ring-1 sm:ring-background dark:sm:bg-neutral-900/90 dark:sm:ring-background/70">
              {maskAddress(address!).toUpperCase()}
            </span>
          </Button>
        }
        asChildTrigger
      />
    )
  }

  return (
    <Button
      variant={"secondary"}
      onClick={() => open()}
      className={cn("", className)}
    >
      Login
    </Button>
  )
}
