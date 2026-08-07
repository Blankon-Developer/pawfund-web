import { env } from "@/lib/env"
import type { MetadataRoute } from "next"

const APP_URL = env.NEXT_PUBLIC_BASE_URL

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${APP_URL}/sitemap.xml`,
  }
}
