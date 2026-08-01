import { env } from "@/lib/env"

type QueryParams = Record<
  string,
  string | number | boolean | null | undefined
>

function createSearchParams(params?: QueryParams): URLSearchParams {
  const searchParams = new URLSearchParams()

  if (!params) {
    return searchParams
  }

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value))
    }
  }

  return searchParams
}

export function buildUrlWithParams(
  url: string,
  params?: QueryParams
): string {
  const searchParams = createSearchParams(params)

  if (!searchParams.size) {
    return url
  }

  return `${url}?${searchParams.toString()}`
}

export function buildApiUrl(
  path: string,
  params?: QueryParams
): string {
  const baseUrl = env.NEXT_PUBLIC_BASE_API_URL

  if (!baseUrl) {
    return buildUrlWithParams(path, params)
  }

  const url = new URL(path, baseUrl)

  const searchParams = createSearchParams(params)

  if (searchParams.size) {
    url.search = searchParams.toString()
  }

  return url.href
}