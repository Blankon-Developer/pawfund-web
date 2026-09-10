"use server"

import { JWT_COOKIE_NAME } from "@/stores/jwt.store"
import { cookies } from "next/headers"

const getServerJWTCookie = async () =>
  (await cookies()).get(JWT_COOKIE_NAME)?.value

export { getServerJWTCookie }
