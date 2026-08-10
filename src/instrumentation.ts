import { env } from "./lib/env"

export async function register() {
  // Register the mock server only in development mode and when the NEXT_PUBLIC_MOCK_SERVER environment variable is set to true
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NODE_ENV === "development" &&
    env.NEXT_PUBLIC_MOCK_SERVER
  ) {
    console.log("=== [MSW@instrumentation] initializing! ===")
    const { server } = await import("@/_mocks/server")
    server.listen()
  }
}
