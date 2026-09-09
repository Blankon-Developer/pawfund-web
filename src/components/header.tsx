"use client"

import Image from "next/image"
import Link from "next/link"
import { LoginButton } from "./login-button"
import { usePathname } from "next/navigation"
import { Route } from "next"
import { cn } from "@/utils"
import { ToggleTheme } from "./toggle-theme"
import { useIsNotFound } from "@/app/not-found"

const hideHeaderPaths: Route[] = [
  "/register",
  "/account",
  "/create-campaign",
  "/my-campaigns",
  "/my-donations",
]

export function Header() {
  const pathname = usePathname()
  const is404 = useIsNotFound()

  if (!is404 && hideHeaderPaths.includes(pathname as Route)) {
    return null
  }

  return (
    <header
      className={cn(
        "sticky top-4 z-50 mx-auto mt-10 flex h-10 w-[calc(100%-1.5rem)] max-w-360 min-w-62.5 items-center justify-between rounded-full bg-transparent px-3 sm:w-[calc(100%-2.5rem)] sm:px-5",
        "transition-padding transition-margin duration-300",
        pathname !== "/" && "mt-4 px-0 sm:px-0"
      )}
    >
      <Link
        href={"/"}
        className="relative flex h-10 items-center rounded-full bg-gray-200 px-3 shadow-md ring-2 ring-background dark:bg-secondary dark:shadow-none dark:ring-0"
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
      <div className="flex items-center rounded-full bg-card">
        <ToggleTheme variant={"ghost"} />
        <LoginButton className="shadow-sm ring-1 ring-background dark:shadow-none dark:ring-0" />
      </div>
    </header>
  )
}
