import { env } from "@/lib/env"
import type { NextConfig } from "next"

const imagesRemotePatterns = env.IMAGES_REMOTE_PATTERNS.split(",")
  .map((pattern) => pattern.trim())
  .filter(Boolean)
  .map((pattern) => new URL(`${pattern}/**`))

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding")
    return config
  },
  images: {
    remotePatterns: imagesRemotePatterns,
  },
}

export default nextConfig
