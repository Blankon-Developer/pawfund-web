"use client"

import { useJWTStore } from "@/stores/jwt.store"

export default function Page() {
  const token = useJWTStore((state) => state.token)
  return (
    <div>
      <p className="text-wrap w-full max-w-sm">Token: {token}</p>
    </div>
  )
}
