/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSiweSessionStore } from "@/stores/siwe-session.store"
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
  bearerToken?: string
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
    bearerToken: token,
  } = options

  // Get user access token from the store if it's not provided in the options (on client-side)
  let bearerToken = token
  if (typeof window !== "undefined" && !token) {
    bearerToken = useSiweSessionStore.getState().session?.jwt
  }

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
        ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials,
      cache,
      next,
    })

    if (!response.ok) {
      const apiRes = (await response.json()) as ApiResponseType

      if (response.status === 422) {
        throw new ApiValidationError(
          apiRes.message,
          response.status,
          apiRes.code,
          apiRes.errors
        )
      } else {
        throw new ApiError(apiRes.message, response.status, apiRes.code)
      }
    }
    return response.json()
  } catch (error) {
    if (typeof window !== "undefined") {
      if (error instanceof ApiError) {
        if (defaultApiErrorToast) error.showToast()
      } else if (error instanceof Error) {
        toast.error("An error occurred", {
          description: error.message,
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
