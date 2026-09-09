import { getServerJWTCookie } from "@/actions"
import { getAuthMe, RegisterPage } from "@/features/auth"
import { notFound } from "next/navigation"

export default async function Page() {
  const token = await getServerJWTCookie()
  if (!token) notFound()

  const res = await getAuthMe.cache({ token })
  if (res?.role) notFound()

  return <RegisterPage />
}
