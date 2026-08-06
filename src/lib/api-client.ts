/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApiResponseType } from "@/types/api.types"
import { ApiError, ApiValidationError } from "@/utils/api-error"
import { buildApiUrl, buildUrlWithParams } from "@/utils/build-url"
import { toast } from "sonner"

type ApiClientRequestOptions = {
  method?: string
  headers?: Record<string, string>
  body?: any
  cookie?: string
  params?: Record<string, string | number | boolean | undefined | null>
  cache?: RequestCache
  next?: NextFetchRequestConfig
  signal?: AbortSignal
  keepalive?: boolean
  redirect?: RequestRedirect
  referrer?: string
  integrity?: string
  mode?: RequestMode
  priority?: RequestPriority
  credentials?: RequestCredentials
  defaultApiErrorToast?: boolean
}

// Create a separate function for getting server-side cookies that can be imported where needed
function getServerCookies() {
  if (typeof window !== "undefined") return ""

  // Dynamic import next/headers only on server-side
  return import("next/headers").then(async ({ cookies }) => {
    try {
      const cookieStore = await cookies()
      return cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ")
    } catch (error) {
      console.error("Failed to access cookies:", error)
      return ""
    }
  })
}

async function fetchApi<T>(
  url: string,
  options: ApiClientRequestOptions = {}
): Promise<ApiResponseType<T>> {
  const {
    method = "GET",
    params,
    body,
    headers = {},
    cookie,
    cache = "no-store",
    credentials = "same-origin",
    next,
    defaultApiErrorToast = false,
  } = options

  // Get cookies from the request when running on server
  let cookieHeader = cookie
  if (typeof window === "undefined" && !cookie) {
    cookieHeader = await getServerCookies()
  }

  const fullUrl = url.startsWith("http")
    ? buildUrlWithParams(url, params)
    : buildApiUrl(url, params)

  try {
    const response = await fetch(fullUrl, {
      ...options,
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials,
      cache,
      next,
    })

    if (!response.ok) {
      const res = (await response.json()) as ApiResponseType
      if (response.status === 422) {
        throw new ApiValidationError(
          res.message,
          response.status,
          res.code,
          res.errors
        )
      } else {
        throw new ApiError(res.message, response.status, res.code)
      }
    }
    return response.json()
  } catch (error) {
    if (typeof window !== "undefined") {
      if (error instanceof ApiError) {
        if (defaultApiErrorToast) error.showToast()
      } else if (error instanceof Error) {
        toast.error("Something went wrong", {
          description: `${error.name}: ${error.message}`,
        })
      } else {
        toast.error("Something went wrong", {
          description: "An unexpected error occurred, please try again.",
        })
      }
    }
    throw error
  }
}

const apiClient = {
  get<T>(
    url: string,
    options?: ApiClientRequestOptions
  ): Promise<ApiResponseType<T>> {
    return fetchApi<T>(url, { ...options, method: "GET" })
  },
  post<TRes, TBody = any>(
    url: string,
    body?: TBody,
    options?: ApiClientRequestOptions
  ): Promise<ApiResponseType<TRes>> {
    return fetchApi<TRes>(url, { ...options, method: "POST", body })
  },
  put<TRes, TBody = any>(
    url: string,
    body?: TBody,
    options?: ApiClientRequestOptions
  ): Promise<ApiResponseType<TRes>> {
    return fetchApi<TRes>(url, { ...options, method: "PUT", body })
  },
  patch<TRes, TBody = any>(
    url: string,
    body?: TBody,
    options?: ApiClientRequestOptions
  ): Promise<ApiResponseType<TRes>> {
    return fetchApi<TRes>(url, { ...options, method: "PATCH", body })
  },
  delete<T>(
    url: string,
    options?: ApiClientRequestOptions
  ): Promise<ApiResponseType<T>> {
    return fetchApi<T>(url, { ...options, method: "DELETE" })
  },
}

export { apiClient, type ApiClientRequestOptions }
