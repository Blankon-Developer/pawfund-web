import { env } from "@/lib/env"
import type { MetadataRoute } from "next"

const APP_URL = env.NEXT_PUBLIC_BASE_URL

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: APP_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${APP_URL}/campaigns/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]
}
