# API & Data Fetching

## API Client

**Location:** [`src/lib/api-client.ts`](../src/lib/api-client.ts)

A thin, typed wrapper around the native `fetch` API. **Always use `apiClient` — never use raw `fetch` directly.**

### Features

- **Auto base URL:** Relative paths (e.g., `/campaigns`) are automatically prefixed with `NEXT_PUBLIC_BASE_API_URL`
- **Full URLs:** Paths starting with `http` are used as-is
- **SSR cookie forwarding:** On the server, reads cookies from `next/headers` and forwards them to the backend (enables authenticated Server Components)
- **Default headers:** `Content-Type: application/json`, `Accept: application/json`
- **Default cache:** `no-store` (always fresh)
- **Error handling:** Throws `ApiError` (non-2xx) or `ApiValidationError` (HTTP 422). On the client, shows a Sonner toast automatically when `defaultApiErrorToast: true`

### Methods

```ts
import { apiClient } from '@/lib/api-client'

// GET
const res = await apiClient.get<MyType>('/endpoint', options)

// POST
const res = await apiClient.post<ResponseType, BodyType>('/endpoint', body, options)

// PUT
const res = await apiClient.put<ResponseType, BodyType>('/endpoint', body, options)

// PATCH
const res = await apiClient.patch<ResponseType, BodyType>('/endpoint', body, options)

// DELETE
const res = await apiClient.delete<ResponseType>('/endpoint', options)

// Always extract `.data` — the actual payload is nested inside the response envelope
return res.data
```

### Options

```ts
type ApiClientRequestOptions = {
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean | undefined | null>  // Query params
  cache?: RequestCache
  next?: NextFetchRequestConfig  // Next.js fetch extensions (revalidate, tags)
  defaultApiErrorToast?: boolean  // Show toast on error (default: false)
  cookie?: string                 // Manual cookie override
  // ...standard fetch options
}
```

---

## API Response Envelope

All backend responses follow this shape:

```ts
type ApiResponseType<T> = {
  code: string       // API status code string (e.g., "SUCCESS", "NOT_FOUND")
  message: string    // Human-readable message
  data?: T           // The actual payload — always extract this
  pagination?: {     // Present on paginated list endpoints
    current: number
    pageSize: number
    totalPages: number
    totalItems: number
  }
  errors?: Record<string, string[]>  // Only on HTTP 422 validation errors
}
```

---

## Error Handling

```ts
import { ApiError, ApiValidationError } from '@/utils/api-error'

try {
  const res = await apiClient.get<MyType>('/endpoint')
  return res.data
} catch (error) {
  if (error instanceof ApiValidationError) {
    // HTTP 422 — field validation errors
    // error.errors: Record<string, string[]>
  } else if (error instanceof ApiError) {
    // Other non-2xx errors
    // error.status: number, error.code: string
  }
  throw error
}
```

Errors in Server Components should be handled with **`react-error-boundary`**. Let the async data-fetching function throw, and wrap the component tree in an `ErrorBoundary`:

```tsx
// app/my-page/page.tsx — let it throw
export default async function Page() {
  const data = await getMyData()  // throws on error — caught by ErrorBoundary

  return <MyComponent data={data} />
}
```

```tsx
// app/my-page/layout.tsx (or a parent layout/page)
import { ErrorBoundary } from 'react-error-boundary'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<ErrorState />}>
      {children}
    </ErrorBoundary>
  )
}
```

Alternatively, Next.js's built-in `error.tsx` convention is also supported — create an `error.tsx` file co-located with the route segment. See `node_modules/next/dist/docs/` for the current API.

---

## Writing New API Functions

Place API functions in `src/features/<feature>/api/<name>.ts` and export them from the feature's `index.ts` barrel.

### Template

```ts
// src/features/<feature>/api/get-my-data.ts
import { apiClient, ApiClientRequestOptions } from '@/lib/api-client'
import { MyType } from '../types/my.types'

type GetMyDataParams = {
  id: string
}

export const getMyData = async (
  params: GetMyDataParams,
  options?: Omit<ApiClientRequestOptions, 'method'>
) => {
  const res = await apiClient.get<MyType>(`/my-endpoint/${params.id}`, options)
  return res.data  // Always extract .data
}
```

### Authenticated Requests

Pass a `Bearer` token via `Authorization` header:
```ts
const res = await apiClient.get<AuthMeData>('/auth/me', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
```

The token is available from:
- **Client:** `useJWTStore(state => state.token)`
- **Server:** Via cookie forwarding (automatic — apiClient reads `next/headers` cookies on server)

---

## Known API Endpoints

| Method | Path | Description | Auth |
|---|---|---|---|
| `GET` | `/auth/message?address={addr}` | Get signing challenge | No |
| `POST` | `/auth/verify` | Verify signature, get JWT | No |
| `GET` | `/auth/me` | Get current user data | Yes (Bearer) |
| `GET` | `/campaigns` | List all campaigns | No |
| `GET` | `/campaigns/{address}` | Get campaign by contract address | No |

> More endpoints will be added as features are built (campaign creation, donations, withdrawal, profile, etc.).

---

## TanStack Query (React Query)

**Version:** v5 (note: v5 has breaking changes from v4)

**Provider:** [`src/components/provider/react-query.provider.tsx`](../src/components/provider/react-query.provider.tsx)

**Global defaults** (from [`src/lib/react-query.ts`](../src/lib/react-query.ts)):

```ts
const queryConfig = {
  queries: {
    throwOnError: false,   // Don't throw to error boundary by default
    retry: false,           // No automatic retries
    staleTime: 1000 * 60 * 5,   // 5 minutes — data stays fresh
    gcTime: 1000 * 60 * 60,     // 1 hour — data kept in cache
  },
}
```

### Type Helpers

```ts
import { ApiFnReturnType, QueryConfig, MutationConfig } from '@/lib/react-query'

// Get the return type of an async API function
type MyDataType = ApiFnReturnType<typeof getMyData>

// Omit queryKey + queryFn from queryOptions (for passing custom options)
type MyQueryConfig = QueryConfig<typeof getMyDataQueryOptions>

// Typed mutation options
type MyMutationConfig = MutationConfig<typeof postMyData>
```

### Pattern: Query Hook

Define a `queryOptions` factory and a `useQuery` hook together:

```ts
// src/features/<feature>/api/get-my-data.ts
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getMyData } from './get-my-data-fn'
import { QueryConfig } from '@/lib/react-query'

export const getMyDataQueryOptions = (params: { id: string }) =>
  queryOptions({
    queryKey: ['my-data', params.id],
    queryFn: () => getMyData(params),
  })

type UseGetMyDataOptions = {
  params: { id: string }
  queryConfig?: QueryConfig<typeof getMyDataQueryOptions>
}

export const useGetMyData = ({ params, queryConfig }: UseGetMyDataOptions) =>
  useQuery({
    ...getMyDataQueryOptions(params),
    ...queryConfig,
  })
```

### Pattern: Mutation Hook

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MutationConfig } from '@/lib/react-query'
import { postMyData } from './post-my-data'

type UsePostMyDataOptions = {
  mutationConfig?: MutationConfig<typeof postMyData>
}

export const usePostMyData = ({ mutationConfig }: UsePostMyDataOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postMyData,
    onSuccess: () => {
      // Invalidate related queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ['my-data'] })
    },
    ...mutationConfig,
  })
}
```

---

## Server Component Data Fetching

For **Server Components**, call the API function directly without hooks. Catch errors at the page level:

```ts
// src/app/campaigns/page.tsx
export default async function Page() {
  const campaigns = await getCampaigns().catch((error) => {
    console.error('Error fetching campaigns:', error)
    return null
  })

  if (!campaigns) {
    return <ErrorState />
  }

  return <CampaignList campaigns={campaigns} />
}
```

For server-side **cache control**, pass `next` options:
```ts
const res = await apiClient.get<MyType>('/endpoint', {
  next: { revalidate: 60 },  // ISR: revalidate every 60 seconds
  // or
  next: { tags: ['my-tag'] }, // On-demand revalidation
})
```

---

## MSW (Mock Service Worker)

**Version:** v2

Mock the backend API during development when the backend is unavailable.

**Enable:** Set `NEXT_PUBLIC_MOCK_SERVER=true` in `.env.development`

**Handler location:** `src/_mocks/`

**Provider:** [`src/components/provider/msw.provider.tsx`](../src/components/provider/msw.provider.tsx) — conditionally activates MSW based on the env var.

**Service worker:** Already initialized in `public/` (`mockServiceWorker.js`).

To add a new mock handler:
```ts
// src/_mocks/handlers/campaigns.ts
import { http, HttpResponse } from 'msw'

export const campaignHandlers = [
  http.get('/campaigns', () => {
    return HttpResponse.json({
      code: 'SUCCESS',
      message: 'OK',
      data: [/* mock campaigns */],
    })
  }),
]
```
