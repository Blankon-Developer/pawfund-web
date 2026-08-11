"use client"

import { Route } from "next"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import HalfCircle from "@/assets/half-circle.svg"
import { cn } from "@/utils/cn"
import { ArrowTopRightShape } from "@/assets/shape/arrow-top-right"
import { PawCircular } from "@/assets/icons/paw-circular"
import { ToggleTheme } from "./toggle-theme"

const hideFooterPaths: Route[] = []

export function Footer() {
  const pathname = usePathname()

  if (hideFooterPaths.includes(pathname as Route)) {
    return null
  }

  return (
    <>
      <div
        className={cn("h-7 w-full bg-transparent")}
        style={{
          mask: `url(${HalfCircle.src})`,
          background: "var(--primary)",
          maskSize: "auto 18px",
          maskRepeat: "repeat-x",
          maskPosition: "center bottom",
        }}
      />
      <footer className={"-mt-px w-full bg-primary py-8"}>
        <div className="bg relative mx-auto flex w-[calc(100%-2rem)] max-w-360 flex-col justify-between gap-8 sm:w-[calc(100%-3rem)] sm:flex-row sm:items-center">
          <div>
            <Image
              src={"/pawfund-text-logo-white.svg"}
              alt="Pawfund Logo"
              width={160}
              height={40}
              className="h-auto w-40 dark:invert-89"
            />
            <p className="mt-4 flex items-center gap-0.5 text-primary-foreground">
              Made With
              <span>
                <svg
                  width="16"
                  height="22"
                  viewBox="0 0 16 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6 stroke-primary-foreground"
                >
                  <path
                    d="M14.4617 7.161C16.3093 10.6967 12.8521 14.4084 11.3258 15.8761C9.79949 17.3439 5.28872 19.9248 5.28872 19.9248C5.21154 19.6388 2.63335 14.8872 1.82577 12.376C0.816286 9.23687 0.571437 0.83704 4.27857 1.73201C7.24427 2.44798 7.9409 7.92619 7.82577 10.376C9.48373 8.25896 12.9837 4.33244 14.4617 7.161Z"
                    stroke="currentColor"
                    strokeWidth="1.1"
                  />
                </svg>
              </span>
              by Paw Fund Team
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <nav className="flex flex-wrap items-center gap-4">
              <Link
                href={"#testnet-resources"}
                target="_blank"
                className="relative flex items-center gap-1 font-bold text-primary-foreground hover:underline"
              >
                FAUCET
                <ArrowTopRightShape className="size-3 fill-primary-foreground" />
                <span className="absolute -top-2 left-0 text-[8px]">
                  Testnet
                </span>
              </Link>
              <Link
                href={"#contract"}
                className="flex items-center gap-1 font-bold text-primary-foreground hover:underline"
              >
                CONTRACT
                <ArrowTopRightShape className="size-3 text-primary-foreground" />
              </Link>
              <Link
                href={"https://github.com/noverdanRain/pawfund-web"}
                target="_blank"
                className="flex items-center gap-1 font-bold text-primary-foreground hover:underline"
              >
                GITHUB
                <ArrowTopRightShape className="size-3 fill-primary-foreground" />
              </Link>
            </nav>
            <div className="flex items-center justify-between gap-2 sm:justify-start">
              <Link
                href={"#privacy"}
                className="text-sm font-medium text-primary-foreground underline hover:text-primary-foreground/80"
              >
                Privacy Policy
              </Link>
              <ToggleTheme
                className="text-background! hover:bg-muted/10! sm:-mr-2"
                variant="ghost"
                size="icon-sm"
              />
            </div>
            <PawCircular
              className="absolute -top-1 right-0 size-12 transform [--paw-circ-bg:var(--primary-foreground)] [--paw-circ-fg:var(--color-rose-500)] sm:top-2 sm:left-1/2 sm:size-14 sm:-translate-x-1/2 dark:[--paw-circ-bg:var(--color-neutral-900)] dark:[--paw-circ-fg:var(--primary)]"
              bgColor="var(--paw-circ-bg)"
              fgColor="var(--paw-circ-fg)"
            />
          </div>
        </div>
      </footer>
    </>
  )
}
