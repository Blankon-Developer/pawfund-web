"use client"

import { AuthMeData, withAuth } from "@/features/auth"
import { AccountLayout } from "../components/account-layout"
import { FundraiserAccountForm } from "../components/forms/fundraiser-account"
import { SupporterAccountForm } from "../components/forms/supporter-account"
import { useAccountFormStore } from "../stores/form.store"

function AccountPage({ user }: { user: AuthMeData }) {
  const isDirty = useAccountFormStore((state) => state.isDirty)
  const isSubmitting = useAccountFormStore((state) => state.isSubmitting)

  return (
    <AccountLayout
      formId={`account-${user.role}`}
      isDirty={isDirty}
      isLoading={isSubmitting}
    >
      {user?.role?.toLowerCase() === "fundraiser" && (
        <FundraiserAccountForm id={`account-${user.role}`} />
      )}

      {user?.role?.toLowerCase() === "supporter" && (
        <SupporterAccountForm id={`account-${user.role}`} />
      )}
    </AccountLayout>
  )
}

const Page = withAuth(AccountPage, {
  accept: ["fundraiser", "supporter"],
})

export { Page as AccountPage }
