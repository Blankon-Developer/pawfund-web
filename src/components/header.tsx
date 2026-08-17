"use client"

import Image from "next/image"
import Link from "next/link"
import { LoginButton } from "./login-button"
import { usePathname } from "next/navigation"
import { Route } from "next"

const hideHeaderPaths: Route[] = ["/register"]

export function Header() {
  const pathname = usePathname()

  if (hideHeaderPaths.includes(pathname as Route)) {
    return null
  }

  return (
    <header className="sticky top-4 z-50 mx-auto mt-4 flex w-[calc(100%-1rem)] max-w-360 min-w-62.5 items-center justify-between rounded-full bg-card p-2 pl-5 sm:w-[calc(100%-2rem)]">
      <Link href={"/"} className="relative">
        <span className="absolute right-0.5 -bottom-2.25 rounded-full bg-amber-500 px-1.5 text-[9px] font-extrabold text-white">
          Testnet
        </span>
        <Image
          src="/pawfund-text-logo.svg"
          alt="Pawfund Logo"
          width={110}
          height={26}
          className="drop-shadow-xs h-auto w-28"
        />
      </Link>
      {/* <ToggleTheme variant={"ghost"} /> */}
      <LoginButton className="ring-1 ring-background dark:ring-background/30" />
    </header>
  )
}
