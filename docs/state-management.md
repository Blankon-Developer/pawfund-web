# State Management

## Guiding Principles

1. **Server state → TanStack Query.** Any data that comes from the API belongs in TanStack Query's cache — not Zustand. Use `useQuery` / `useMutation` for all API-sourced state.

2. **Client-only global state → Zustand.** Use Zustand only for state that is:
   - Global (shared across distant components)
   - Purely client-side (auth tokens, UI preferences)
   - Not API data

3. **Local state → `useState` / `useReducer`.** Component-local concerns stay local.

---

## Existing Stores

### 1. `useJWTStore` — JWT Access Token

**File:** [`src/stores/jwt.store.ts`](../src/stores/jwt.store.ts)

**Purpose:** Stores the authenticated user's JWT access token, persisted in a browser cookie for SSR compatibility.

**Storage:** Custom cookie adapter
- Cookie name: `@pawfund/jwt`
- Attributes: `Path=/`, `SameSite=Lax`, `Max-Age=Session` (expires on tab/browser close)
- Cookies are readable server-side via `next/headers`, enabling authenticated SSR API calls

**Shape:**
```ts
type JWTStore = {
  token?: string | null
  setToken: (token: string) => void
  clearToken: () => void
}
```

**Usage:**
```ts
import { useJWTStore } from '@/stores/jwt.store'

// In a component
const token = useJWTStore(state => state.token)
const setToken = useJWTStore(state => state.setToken)

// Outside React (e.g., in siwxConfig callbacks)
useJWTStore.getState().setToken(accessToken)
useJWTStore.getState().clearToken()
```

**Lifecycle:**
- Set: after successful `POST /auth/verify` (inside `siwxConfig.addSession`)
- Refreshed: when `getSessions` validates the session via `GET /auth/me`
- Cleared: when wallet disconnects (`ReownDisconnectHandler` detects `status === 'disconnected'`)

---

### 2. `useSiwxSessionsStore` — SIWX Sessions

**File:** [`src/stores/siwx-sessions.store.ts`](../src/stores/siwx-sessions.store.ts)

**Purpose:** Stores SIWX session objects (one per connected wallet+chain combination). Managed by the SIWX config lifecycle callbacks — not typically accessed directly by UI components.

**Storage:** `localStorage` under key `@pawfund/sessions`

**Extended session type:**
```ts
type SIWXSessionsExtended = SIWXSession & {
  jwt: string
  user?: AuthMeData
}
```

**Shape:**
```ts
type SIWXSessionsStoreType = {
  sessions?: SIWXSessionsExtended[]
  addSession: (session: SIWXSessionsExtended) => void
  setSessions: (sessions: SIWXSessionsExtended[]) => void
  getSessions: (chainId: CaipNetworkId, address: string) => SIWXSessionsExtended[]
  revokeSession: (chainId: CaipNetworkId, address: string) => void
}
```

**Usage (primarily in `siwxConfig`):**
```ts
import { useSiwxSessionsStore } from '@/stores/siwx-sessions.store'

// Get sessions for a specific wallet+chain
const sessions = useSiwxSessionsStore.getState().getSessions(chainId, address)

// Add a new session after sign-in
useSiwxSessionsStore.getState().addSession({ ...session, jwt, user })

// Revoke on disconnect or re-auth
useSiwxSessionsStore.getState().revokeSession(chainId, address)
```

---

### 3. `siwe-session.store.ts` — SIWE Session

**File:** [`src/stores/siwe-session.store.ts`](../src/stores/siwe-session.store.ts)

Parallel to `useSiwxSessionsStore` but for the SIWE (Sign-In with Ethereum) flow. The architecture supports both flows; the active one depends on which config is passed to `createAppKit`.

---

## When to Create a New Store

Create a new Zustand store when you need **global client-side state** that is:

- Not derived from API calls (use TanStack Query for that)
- Needed by many unrelated components (not just a parent-child relationship)
- Needs to persist across page navigation (use `persist` middleware)

**Examples of valid Zustand state:**
- Auth tokens (already handled)
- Current network/chain preference
- User's selected role during onboarding flow
- Toast/notification queue (though Sonner handles this)

**Do NOT use Zustand for:**
- API response data (campaigns, user profile, etc.) → use TanStack Query
- Form state → use React Hook Form
- UI state local to one component → use `useState`

---

## Creating a New Store

Follow this template:

```ts
// src/stores/my-feature.store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type MyFeatureStore = {
  someValue: string | null
  setSomeValue: (value: string) => void
  clearSomeValue: () => void
}

const useMyFeatureStore = create<MyFeatureStore>()(
  persist(
    (set) => ({
      someValue: null,
      setSomeValue: (value) => set({ someValue: value }),
      clearSomeValue: () => set({ someValue: null }),
    }),
    {
      name: '@pawfund/my-feature',  // Storage key — prefix with @pawfund/
      storage: createJSONStorage(() => localStorage),  // or sessionStorage, or custom
      version: 1,
    }
  )
)

export { useMyFeatureStore }
```

**Naming conventions:**
- File: `<name>.store.ts`
- Hook: `use<Name>Store`
- Storage key: `@pawfund/<name>`

**Choosing storage:**
| Storage | Use when |
|---|---|
| `localStorage` | Non-sensitive state that should persist across browser sessions |
| `sessionStorage` | State that should clear on tab close |
| Custom cookie storage | Auth tokens that need to be readable server-side (see `jwt.store.ts`) |
| No persistence (default) | Ephemeral state that resets on page refresh |
