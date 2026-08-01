import { env } from "@/lib/env"
import type { NextConfig } from "next"

const imagesRemotePatterns = env.IMAGES_REMOTE_PATTERNS.split(",")
  .map((pattern) => pattern.trim())
  .filter(Boolean)
  .map((pattern) => new URL(`${pattern}/**`))

const nextConfig: NextConfig = {
  images: {
    remotePatterns: imagesRemotePatterns,
  },
}

export default nextConfig
