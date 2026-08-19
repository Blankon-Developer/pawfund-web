"use client"

import Image from "next/image"
import Link from "next/link"
import { LoginButton } from "./login-button"
import { usePathname } from "next/navigation"
import { Route } from "next"

const hideHeaderPaths: Route[] = ["/register", "/account"]

export function Header() {
  const pathname = usePathname()

  if (hideHeaderPaths.includes(pathname as Route)) {
    return null
  }

  return (
    <header className="sticky top-4 z-50 mx-auto mt-10 flex h-10 w-[calc(100%-1.5rem)] max-w-360 min-w-62.5 items-center justify-between rounded-full bg-transparent px-3 sm:w-[calc(100%-2.5rem)] sm:px-5">
      <Link
        href={"/"}
        className="relative flex h-10 items-center rounded-full bg-gray-200 px-3 shadow-md ring-2 ring-background dark:bg-secondary dark:ring-background/30"
      >
        <span className="absolute right-3 -bottom-0.5 rounded-full bg-amber-500 px-1.5 text-[9px] font-extrabold text-white">
          Testnet
        </span>
        <Image
          src="/pawfund-text-logo.svg"
          alt="Pawfund Logo"
          width={110}
          height={26}
          className="h-auto w-23 sm:w-28"
        />
      </Link>
      {/* <ToggleTheme variant={"ghost"} /> */}
      <div className="flex items-center rounded-full bg-card">
        <LoginButton className="shadow-sm ring-1 ring-background dark:ring-background/30" />
      </div>
    </header>
  )
}
