# Pawfund Web — Agent Context

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## What is Pawfund?

**Pawfund** is a Web3-based crowdfunding/donation platform focused on animal welfare. Users can create donation campaigns and contribute USDC to active campaigns via smart contracts on the Base blockchain.

This repository is the **Next.js 16 frontend** (App Router). It communicates with a backend REST API and interacts with EVM smart contracts using Wagmi + Viem + Reown AppKit.

**MVP constraints:**
- Blockchain: Base Sepolia (testnet) / Base (mainnet — future)
- Donation token: USDC only (ERC-20)
- Wallets: Any EVM wallet (MetaMask, Coinbase Wallet, WalletConnect, Smart Wallet, etc.)

---

## Documentation Index

| File | Description |
|---|---|
| [docs/architecture.md](docs/architecture.md) | Folder structure, feature module pattern, routes, MVP scope |
| [docs/auth-flow.md](docs/auth-flow.md) | SIWX/SIWE wallet auth, JWT storage, session lifecycle |
| [docs/web3-stack.md](docs/web3-stack.md) | AppKit, Wagmi, Viem, USDC, smart contract interaction patterns |
| [docs/api-and-data-fetching.md](docs/api-and-data-fetching.md) | API client, React Query patterns, server vs client fetching, MSW |
| [docs/state-management.md](docs/state-management.md) | Zustand stores, when to use each, conventions |
| [docs/ui-components.md](docs/ui-components.md) | shadcn/ui, Tailwind v4, providers, typography, theming |
| [docs/dev-setup.md](docs/dev-setup.md) | Local setup, env vars, scripts, MSW, adding features |

---

## Quick Orientation

| What | Where |
|---|---|
| App entry / root layout | [`src/app/layout.tsx`](src/app/layout.tsx) |
| Home page | [`src/app/page.tsx`](src/app/page.tsx) |
| Campaigns list page | [`src/app/campaigns/page.tsx`](src/app/campaigns/page.tsx) |
| Global providers (theme, query, wallet) | [`src/app/_components/provider.tsx`](src/app/_components/provider.tsx) |
| AppKit / Wagmi setup | [`src/lib/wagmi-adapter.ts`](src/lib/wagmi-adapter.ts) |
| Auth SIWX config | [`src/lib/siwx-config.ts`](src/lib/siwx-config.ts) |
| API client | [`src/lib/api-client.ts`](src/lib/api-client.ts) |
| Environment variables | [`src/lib/env.ts`](src/lib/env.ts) |
| JWT store | [`src/stores/jwt.store.ts`](src/stores/jwt.store.ts) |
| USDC balance hook | [`src/hooks/erc20-token-balance.ts`](src/hooks/erc20-token-balance.ts) |
| Feature: auth | [`src/features/auth/`](src/features/auth/) |
| Feature: public (campaigns, landing) | [`src/features/public/`](src/features/public/) |

---

## Coding Conventions

> These are **mandatory** rules for all agents working in this repo.

### Package Manager
- Use **Bun** exclusively: `bun add`, `bun install`, `bunx`
- Never use `npm`, `yarn`, or `pnpm`

### Next.js
- Before writing any Next.js-specific code (layouts, route handlers, middleware, metadata, image config, etc.), **read the relevant guide** from `node_modules/next/dist/docs/`
- This is **Next.js 16** — many APIs differ from v13/v14/v15. Do not rely on training data for Next.js APIs

### Feature Modules
- All domain logic lives in `src/features/<feature-name>/`
- Each feature exports everything through its `index.ts` barrel
- **Always import from the barrel**, never deep-import: ✅ `@/features/public` ❌ `@/features/public/api/campaigns`
- See [docs/architecture.md](docs/architecture.md) for the full feature structure convention

### shadcn/ui Components
- shadcn components live in `src/components/shadcn-ui/`
- Import alias: `@/shadcn-ui/<component>` (e.g., `import { Button } from '@/shadcn-ui/button'`)
- Add new components: `bunx shadcn add <component-name>`

### Styling
- **Tailwind CSS v4** — no `tailwind.config.ts`; config is in `src/app/globals.css` via `@theme`
- Use `cn()` from `@/utils` for conditional class merging (re-exports from `clsx` + `tailwind-merge`)
- Never use inline styles

### Validation & Forms
- **Zod v4** — note: API differs from v3. Use `z.string().min(1)` (not `.nonempty()`), `z.object()` etc.
- React Hook Form + `@hookform/resolvers/zod` for all forms
- You can use the predefined hook [src/lib/hook-form.ts](src/lib/hook-form.ts)

### Data Fetching
- **TanStack Query** for client-side fetching; use `queryConfig` from `@/lib/react-query`
- Use `apiClient` from `@/lib/api-client` for all HTTP requests — never raw `fetch`
- Prefer **Server Components**; add `'use client'` only when you need hooks or browser APIs

### State Management
- **Zustand** for global cross-component state only
- Prefer TanStack Query server state cache over Zustand for API data
- See [docs/state-management.md](docs/state-management.md)

### TypeScript
- Strict mode is enabled — avoid `any`, use proper types
- Global API response types in `src/types/api.types.ts`
- Feature-specific types in `src/features/<name>/types/`
