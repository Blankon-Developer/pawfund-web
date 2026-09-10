"use client"

import NotFound from "@/app/not-found"
import { AuthMeData, Role, useGetAuthMe } from "@/features/auth"
import { Spinner } from "@/shadcn-ui/spinner"

type WithAuthProps = {
  user: AuthMeData
}

type WithAuthOptions = {
  accept: (Role | "unregistered")[]
  loadingFallback?: React.ReactNode
  notAcceptedFallback?: React.ReactNode
  uknownUserFallback?: React.ReactNode
}

function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P & WithAuthProps>,
  options: WithAuthOptions
) {
  const { accept, loadingFallback, notAcceptedFallback, uknownUserFallback } =
    options
  return function AuthComponent(props: P) {
    const { data: user, isLoading } = useGetAuthMe()

    if (isLoading) {
      return (
        <>
          {loadingFallback ? (
            loadingFallback
          ) : (
            <main className="flex h-dvh items-center justify-center">
              <Spinner className="size-5" />
            </main>
          )}
        </>
      )
    }

    if (!user) return uknownUserFallback ? uknownUserFallback : <NotFound />

    const role = user.role ?? "unregistered"
    if (!accept.includes(role))
      return notAcceptedFallback ? notAcceptedFallback : <NotFound />

    return <WrappedComponent {...props} user={user} />
  }
}

export { withAuth }
