import { env } from "@/lib/env"
import type { MetadataRoute } from "next"

const APP_URL = env.NEXT_PUBLIC_BASE_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const campaigns = Array.from({ length: 1000 }, (_, i) => i + 1) // Replace with actual campaign IDs

  return campaigns.map((id) => ({
    url: `${APP_URL}/campaign/${id}`,
    lastModified: new Date(),
  }))
}
