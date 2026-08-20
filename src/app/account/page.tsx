"use client"

import { MainContainer } from "@/components/main-container"
import { H5 } from "@/components/typography"
import { UnauthorizedPage } from "@/components/unauthorized-page"
import {
  FundraiserAccountForm,
  SupporterAccountForm,
  useAccountFormStore,
} from "@/features/account"
import { useGetAuthMe } from "@/features/auth"
import { Button } from "@/shadcn-ui/button"
import { Spinner } from "@/shadcn-ui/spinner"
import { cn } from "@/utils"
import { ArrowLeftIcon, SaveIcon } from "lucide-react"
import { useRouter } from "next/navigation"

const getContentClass = (isDirty: boolean, className?: string) =>
  cn(
    isDirty ? `h-[calc(100svh-4.5rem-4rem)]` : `h-[calc(100svh-4.5rem)] pb-4`,
    "scroll-fade scrollbar-none overflow-y-auto",
    className
  )

export default function AccountPage() {
  const {
    data: authData,
    isLoading: isAuthLoading,
    isError: isAuthError,
    isAuthenticated,
  } = useGetAuthMe()

  const router = useRouter()

  const isDirty = useAccountFormStore((state) => state.isDirty)

  if (isAuthLoading)
    return (
      <main className="flex h-dvh items-center justify-center">
        <Spinner className="size-5" />
      </main>
    )

  if (isAuthError || !isAuthenticated) return <UnauthorizedPage />

  return (
    <MainContainer as="div" className="relative min-h-svh max-w-3xl">
      <header
        className={`sticky top-0 z-30 flex h-[4.5rem] items-center justify-between bg-background`}
      >
        <div className="flex w-full items-center gap-2">
          <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
            <ArrowLeftIcon strokeWidth={2.1} />
          </Button>
          <H5>Account</H5>
        </div>
      </header>
      <main className={getContentClass(isDirty)}>
        {authData?.role === "FUNDRAISER" && (
          <FundraiserAccountForm
            id={"FUNDRAISER"}
            defaultValues={fundraiserDefault}
          />
        )}

        {authData?.role === "SUPPORTER" && (
          <SupporterAccountForm
            id={"SUPPORTER"}
            defaultValues={supporterDefault}
          />
        )}
      </main>

      {isDirty && (
        <footer
          className={`sticky bottom-0 z-30 flex h-[4rem] items-center justify-end gap-2 bg-background`}
        >
          <div className="flex items-center gap-2">
            <Button
              type="reset"
              form={authData?.role ?? ""}
              variant={"secondary"}
              size="sm"
            >
              Reset Changes
            </Button>
            <Button size="sm" type="submit" form={authData?.role ?? ""}>
              <SaveIcon />
              Save
            </Button>
          </div>
        </footer>
      )}
    </MainContainer>
  )
}

// TODO: Implementasi "getFundraiserProfile" API untuk mendapatkan data dari BE
const fundraiserDefault = {
  name: "Galang Fund",
  email: "galang@gmail.com",
  contactPerson: {
    name: "Galang Arsandy",
    phone: "+628123456789",
  },
  socialUrl: "https://galangfund.com",
  country: "Indonesia",
  zipCode: "12345",
  avatar: {
    id: "galang-pp",
    file: {
      id: "galang-pp",
      name: "galang-pp.jpg",
      size: 1024,
      type: "image/jpeg",
      url: "https://picsum.photos/200",
    },
    preview: "https://picsum.photos/200",
  },
}

// TODO: Implementasi "getSupporterProfile" API untuk mendapatkan data dari BE
const supporterDefault = {
  name: "Galang Arsandy",
  email: "galang@gmail.com",
  avatar: {
    id: "galang-pp",
    file: {
      id: "galang-pp",
      name: "galang-pp.jpg",
      size: 1024,
      type: "image/jpeg",
      url: "https://picsum.photos/200",
    },
    preview: "https://picsum.photos/200",
  },
}
