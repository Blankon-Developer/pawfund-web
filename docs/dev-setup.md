# Dev Setup

## Prerequisites

- **Node.js** 20+
- **Bun** — the project uses Bun exclusively as the package manager and runtime
  ```bash
  # Install Bun (if not already installed)
  curl -fsSL https://bun.sh/install | bash
  ```

---

## First-Time Setup

```bash
# 1. Clone the repo and install dependencies
bun install

# 2. Set up environment variables
cp .example.env .env.development
# Then fill in the values (see below)

# 3. Start the dev server
bun dev
```

---

## Environment Variables

All env vars are validated at startup by `@t3-oss/env-nextjs` + Zod. Missing or invalid values cause an immediate startup error.

Reference: [`.example.env`](../.example.env) | Validation: [`src/lib/env.ts`](../src/lib/env.ts)

### Required Variables

| Variable | Description | Example |
|---|---|---|
| `IMAGES_REMOTE_PATTERNS` | Comma-separated allowed image CDN URLs (for `next/image`) | `https://images.example.com, https://cdn.example.com` |
| `NEXT_PUBLIC_BASE_API_URL` | Backend REST API base URL | `https://api.pawfund.example` |
| `NEXT_PUBLIC_BASE_URL` | This frontend's base URL | `http://localhost:3000` |
| `NEXT_PUBLIC_REOWN_PROJECT_ID` | Reown (WalletConnect) project ID | `abc123...` |
| `NEXT_PUBLIC_MOCK_SERVER` | Enable MSW mock server | `true` or `false` |

### Getting the Reown Project ID

1. Go to [dashboard.reown.com](https://dashboard.reown.com)
2. Create a project
3. Copy the Project ID
4. Set `NEXT_PUBLIC_REOWN_PROJECT_ID=<id>`

---

## Scripts

```bash
bun dev          # Start Next.js dev server (hot reload)
bun build        # Production build (validates TypeScript + generates output)
bun start        # Start production server (requires bun build first)
bun lint         # Run ESLint across src/
bun format       # Run Prettier on all .ts/.tsx files
bun typecheck    # TypeScript type check without emitting (tsc --noEmit)
```

> **Never use npm/yarn/pnpm** — use Bun for everything.

---

## Next.js Version

This project uses **Next.js 16.2.6** — a version with breaking changes from prior versions.

> ⚠️ **Before writing any Next.js-specific code**, read the relevant guide from `node_modules/next/dist/docs/`

This applies to:
- App Router layouts and pages
- Route Handlers (API routes)
- Metadata API (`generateMetadata`, `metadata` export)
- Image component (`next/image`)
- Font optimization (`next/font`)
- Middleware
- Server Actions
- Cache and revalidation APIs

Do **not** rely on your training data for Next.js APIs — they may have changed.

---

## MSW (Mock Service Worker)

MSW allows frontend development without a running backend.

**Enable:** Set `NEXT_PUBLIC_MOCK_SERVER=true` in `.env.development`

**Handler location:** `src/_mocks/`

The service worker script is already initialized at `public/mockServiceWorker.js`. If it ever needs to be regenerated:

```bash
bunx msw init public/
```

---

## Adding a New Feature Module

1. Create the directory structure:
   ```
   src/features/<feature-name>/
   ├── api/           # API function files
   ├── components/    # Feature-specific UI components
   ├── types/         # TypeScript types for this feature
   ├── stores/        # Zustand store (only if needed)
   └── index.ts       # Barrel export — the only public interface
   ```

2. Export everything from `index.ts`:
   ```ts
   // src/features/<feature-name>/index.ts
   export { MyComponent } from './components/my-component'
   export { getMyData } from './api/get-my-data'
   export type { MyType } from './types/my.types'
   ```

3. Import in pages/other features only via the barrel:
   ```ts
   import { MyComponent, getMyData } from '@/features/<feature-name>'
   ```

---

## Adding a New Page

1. Create the file at `src/app/<route>/page.tsx`
2. Export a default async Server Component function
3. Keep the page thin — import from features, compose, return JSX

```tsx
// src/app/my-page/page.tsx
import { MyComponent, getMyData } from '@/features/my-feature'
import { MainContainer } from '@/components/main-container'

export default async function Page() {
  const data = await getMyData().catch(() => null)

  return (
    <MainContainer>
      <MyComponent data={data} />
    </MainContainer>
  )
}
```

---

## Adding a shadcn Component

```bash
bunx shadcn add <component-name>
# Example:
bunx shadcn add dialog
bunx shadcn add select
bunx shadcn add sheet
```

Components are placed in `src/components/shadcn-ui/` and should be imported via `@/shadcn-ui/<name>`.

---

## TypeScript Path Aliases

Configured in `tsconfig.json`:

| Alias | Resolves to |
|---|---|
| `@/*` | `src/*` |
| `@/shadcn-ui/*` | `src/components/shadcn-ui/*` |

---

## Code Style

- **Prettier** — formatting is enforced via `bun format`. Config: [`.prettierrc`](../.prettierrc)
- **ESLint** — linting via `bun lint`. Config: [`eslint.config.mjs`](../eslint.config.mjs)
- **TypeScript strict mode** — no implicit `any`, all types must be explicit

Run both before committing:
```bash
bun format && bun typecheck && bun lint
```
