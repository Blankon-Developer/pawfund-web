"use client"

import { useSiweSessionStore } from "@/stores/siwe-session.store"
import { useAppKit, useDisconnect } from "@reown/appkit/react"
import {
  ArrowRightIcon,
  HandHeartIcon,
  LogOutIcon,
  MegaphoneIcon,
  PlusIcon,
  UserIcon,
  WalletIcon,
} from "lucide-react"
import { Button } from "./shadcn-ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn-ui/popover"
import { Separator } from "./shadcn-ui/separator"
import { Text } from "./typography"

type MenuPopoverProps = {
  trigger?: React.ReactElement
  asChildTrigger?: boolean
} & React.ComponentProps<typeof Popover>

export function MenuPopover({
  trigger,
  asChildTrigger,
  ...props
}: MenuPopoverProps) {
  const session = useSiweSessionStore((state) => state.session)

  return (
    <Popover {...props}>
      {trigger && (
        <PopoverTrigger asChild={asChildTrigger}>{trigger}</PopoverTrigger>
      )}
      <PopoverContent
        align="end"
        className="px-2 py-2.5"
        onInteractOutside={(e) => {
          const target = e.target as Element | null

          if (target?.nodeName === "W3M-MODAL") {
            e.preventDefault()
          }
        }}
      >
        {session?.user?.role === "FUNDRAISER" && <FundraiserMenuContent />}
        {session?.user?.role === "SUPPORTER" && <SupporterMenuContent />}
        {session?.user?.isNotRegistered && <UnregisteredMenuContent />}
      </PopoverContent>
    </Popover>
  )
}

function MyWalletButton() {
  const { open } = useAppKit()
  return (
    <Button
      onClick={() => open()}
      variant="ghost"
      className="w-full justify-start"
    >
      <WalletIcon />
      My Wallet
    </Button>
  )
}

function LogoutButton() {
  const { disconnect } = useDisconnect()
  const handleLogout = () => {
    disconnect()
  }
  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className="w-full justify-start text-destructive hover:text-destructive/80"
    >
      <LogOutIcon />
      Logout
    </Button>
  )
}

function FundraiserMenuContent() {
  return (
    <div className="flex flex-col gap-1">
      <Button variant={"outline"}>
        <PlusIcon />
        Create Campaign
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        <UserIcon />
        Account
      </Button>
      <MyWalletButton />
      <Button variant="ghost" className="w-full justify-start">
        <MegaphoneIcon />
        My Campaigns
      </Button>
      <Separator className="bg-muted" />
      <LogoutButton />
    </div>
  )
}

function SupporterMenuContent() {
  return (
    <div className="flex flex-col gap-1">
      <Button variant="ghost" className="w-full justify-start">
        <UserIcon />
        Account
      </Button>
      <MyWalletButton />
      <Button variant="ghost" className="w-full justify-start">
        <HandHeartIcon />
        My Donations
      </Button>
      <Separator className="bg-muted" />
      <LogoutButton />
    </div>
  )
}

function UnregisteredMenuContent() {
  return (
    <div className="flex flex-col gap-1">
      <Text variant={"label"} className="mt-2 mb-1 ml-2 text-muted-foreground">
        You are not registered yet.
      </Text>
      <Button variant={"secondary"} className="w-full justify-start">
        <UserIcon strokeWidth={2.5} />
        Register
        <ArrowRightIcon className="ml-auto" />
      </Button>
      <MyWalletButton />
      <Separator className="bg-muted" />
      <LogoutButton />
    </div>
  )
}
