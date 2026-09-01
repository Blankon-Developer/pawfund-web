"use client"

import { UnauthorizedPage } from "@/components/unauthorized-page"
import { useGetAuthMe } from "@/features/auth"
import { Spinner } from "@/shadcn-ui/spinner"
import { AccountLayout } from "../components/account-layout"
import { FundraiserAccountForm } from "../components/forms/fundraiser-account"
import { SupporterAccountForm } from "../components/forms/supporter-account"
import { useAccountFormStore } from "../stores/form.store"

export function AccountPage() {
  const {
    data: authData,
    isLoading: isAuthLoading,
    isError: isAuthError,
    isAuthenticated,
  } = useGetAuthMe()

  const isDirty = useAccountFormStore((state) => state.isDirty)

  if (isAuthLoading)
    return (
      <main className="flex h-dvh items-center justify-center">
        <Spinner className="size-5" />
      </main>
    )

  if (isAuthError || !isAuthenticated) return <UnauthorizedPage />

  return (
    <AccountLayout role={authData?.role || undefined} isDirty={isDirty}>
      {authData?.role?.toLowerCase() === "fundraiser" && (
        <FundraiserAccountForm
          id={"fundraiser"}
          defaultValues={fundraiserDefault}
        />
      )}

      {authData?.role?.toLowerCase() === "supporter" && (
        <SupporterAccountForm
          id={"supporter"}
          defaultValues={supporterDefault}
        />
      )}
    </AccountLayout>
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
