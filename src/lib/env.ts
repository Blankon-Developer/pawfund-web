import { createEnv } from "@t3-oss/env-nextjs"
import z from "zod"

const commaSeparatedUrls = z.string().min(1).refine(
  (value) =>
    value
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)
      .every((part) => z.url().safeParse(part).success),
  {
    message: "IMAGES_REMOTE_PATTERNS must contain one or more valid URLs separated by commas",
  },
)

export const env = createEnv({
  server: {
    IMAGES_REMOTE_PATTERNS: commaSeparatedUrls,
  },
  client: {
    NEXT_PUBLIC_BASE_API_URL: z.url(),
    NEXT_PUBLIC_BASE_URL: z.url(),
    NEXT_PUBLIC_REOWN_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_MOCK_SERVER: z.string().transform((value) => value === "true"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_REOWN_PROJECT_ID: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID,
    NEXT_PUBLIC_MOCK_SERVER: process.env.NEXT_PUBLIC_MOCK_SERVER,
  },
})
