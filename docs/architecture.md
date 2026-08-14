# Architecture

## Overview

Pawfund Web is a **Next.js 16 App Router** application written in TypeScript. It is a Web3-enabled frontend that:

1. Fetches campaign data from a **backend REST API**
2. Authenticates users via **wallet signature** (SIWE/SIWX)
3. Interacts with **EVM smart contracts** to process USDC donations and fund withdrawals

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI |
| State (server) | TanStack Query v5 |
| State (client) | Zustand v5 |
| Forms | React Hook Form + Zod v4 |
| Wallet Connection | Reown AppKit v1 |
| EVM Hooks | Wagmi v2 |
| EVM Utilities | Viem v2 |
| Auth | SIWE / SIWX (Sign-In with Ethereum/X) |
| Icons | Lucide React |
| Date Formatting | date-fns v4 |
| Number Formatting | numeral |
| Toasts | Sonner |
| Mocking | MSW v2 |
| Env Validation | @t3-oss/env-nextjs + Zod |

---

## Folder Structure

```
/
├── src/
│   ├── app/                    # Next.js App Router: pages, layouts, routes
│   ├── features/               # Domain-driven feature modules (primary logic home)
│   ├── components/             # Shared, reusable UI components
│   ├── hooks/                  # Shared custom React hooks
│   ├── lib/                    # Library configs and singletons
│   ├── stores/                 # Zustand global state stores
│   ├── types/                  # Global TypeScript types
│   ├── utils/                  # Pure utility functions
│   ├── constants/              # App-wide constants (metadata, etc.)
│   ├── assets/                 # Static assets (SVG icons, images)
│   └── _mocks/                 # MSW mock request handlers
├── public/                     # Static files served at root (logos, MSW worker)
├── docs/                       # Agent context documentation (this folder)
└── .agents/                    # Agent skills (grilling, domain modeling, etc.)
```

### `src/app/` — Pages & Layouts

Next.js App Router directory. Each folder maps to a URL route.

```
src/app/
├── layout.tsx              # Root layout (fonts, global providers, header/footer)
├── page.tsx                # / — Landing page
├── globals.css             # Tailwind v4 theme + global styles
├── manifest.ts             # Web app manifest
├── robots.ts               # robots.txt
├── sitemap.ts              # sitemap.xml
├── campaigns/
│   ├── page.tsx            # /campaigns — Campaign listing (Server Component)
│   └── sitemap.ts
└── _components/
    └── provider.tsx        # Root provider tree (theme, query, wallet, MSW)
```

> **Rule:** Pages should be thin — import components and data-fetching functions from `src/features/`, compose them here.

### `src/features/` — Feature Modules

The heart of the application. All domain logic, API calls, types, and feature-specific components live here, organized by domain.

```
src/features/
├── auth/                   # Authentication (wallet sign-in, JWT, user data)
│   ├── api/                # API functions: auth-me, message, verify-signature
│   ├── components/         # Auth-specific UI components
│   ├── stores/             # (empty — auth state is in src/stores/)
│   ├── types/              # auth.types.ts: Role, AuthMeData
│   └── index.ts            # Barrel export — only import from here
└── public/                 # Public-facing features (campaigns, landing page)
    ├── api/                # API functions: getCampaigns, getCampaignByAddress
    ├── assets/             # Feature-specific static assets
    ├── components/         # CampaignCard, landing sections
    ├── types/              # campaign.types.ts: CampaignItem, CampaignDetail, CampaignStatus
    └── index.ts            # Barrel export
```

**Feature module pattern — mandatory rules:**

1. **Always import from the barrel** (`index.ts`), never import file-directly:
   ```ts
   // ✅ Correct
   import { CampaignCard, getCampaigns } from '@/features/public'
   
   // ❌ Wrong
   import { CampaignCard } from '@/features/public/components/campaign-card'
   ```

2. **New features** follow the same structure: `api/`, `components/`, `types/`, optional `stores/`, and `index.ts`

3. **Cross-feature imports** are allowed only via barrels, not internal paths

### `src/components/` — Shared Components

Components used across multiple features or pages.

```
src/components/
├── header.tsx              # Sticky floating header (logo + LoginButton)
├── footer.tsx              # Site footer
├── login-button.tsx        # Wallet connect button (USDC balance + address when connected)
├── menu-popover.tsx        # Connected-user dropdown menu
├── main-container.tsx      # Page wrapper with max-width + padding
├── toggle-theme.tsx        # Dark/light mode toggle
├── typography/             # H1–H6 heading components for consistent type scale
├── provider/               # Individual provider components
│   ├── reown.provider.tsx  # WagmiProvider + AppKit initialization
│   ├── react-query.provider.tsx
│   ├── theme.provider.tsx
│   └── msw.provider.tsx
└── shadcn-ui/              # shadcn/ui generated components
```

### `src/lib/` — Library Configs & Singletons

```
src/lib/
├── api-client.ts           # Fetch wrapper (auto-base-URL, cookie injection, error handling)
├── env.ts                  # Type-safe env vars via @t3-oss/env-nextjs
├── wagmi-adapter.ts        # Wagmi adapter + network config (Base Sepolia)
├── siwe-config.ts          # SIWE (Sign-In with Ethereum) config
├── siwx-config.ts          # SIWX session lifecycle callbacks
├── react-query.ts          # QueryClient defaults + type helpers
├── hook-form.ts            # React Hook Form utilities
└── eslint/                 # ESLint custom rules
```

### `src/stores/` — Zustand Global Stores

```
src/stores/
├── jwt.store.ts            # JWT access token (cookie-backed, session-scoped)
├── siwx-sessions.store.ts  # SIWX wallet sessions (localStorage-backed)
└── siwe-session.store.ts   # SIWE session store
```

### `src/utils/` — Pure Utilities

```
src/utils/
├── index.ts                # Re-exports cn() for class merging
├── cn.ts                   # clsx + tailwind-merge
├── api-error.ts            # ApiError, ApiValidationError classes
├── build-url.ts            # URL construction helpers
├── format-date.ts          # Date formatting (timeRemaining, etc.)
├── format-number.ts        # Number formatting helpers
├── mask-address.ts         # Shorten EVM address: 0x1234...abcd
└── localstorage.ts         # Type-safe localStorage helpers
```

---

## Routes

| Route | File | Type | Status |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Server Component | ✅ Built |
| `/campaigns` | `src/app/campaigns/page.tsx` | Server Component | ✅ Built |
| `/campaigns/[address]` | _(not yet created)_ | — | 🔲 Planned |
| `/create` | _(not yet created)_ | — | 🔲 Planned |
| `/profile` | _(not yet created)_ | — | 🔲 Planned |
| `/dashboard` | _(not yet created)_ | — | 🔲 Planned |

---

## MVP Scope

### ✅ Already Built

- Landing page (hero, intermezzo, overview sections)
- Campaign listing page (`/campaigns`)
- Wallet-based authentication via SIWE/SIWX (AppKit modal)
- JWT token persistence in cookie
- SIWX session management in localStorage
- ERC-20 USDC balance reading
- API client with SSR cookie forwarding
- MSW mock server infrastructure

### 🔲 Planned (not yet built)

| Feature | Roles | Notes |
|---|---|---|
| User onboarding / registration | Both | Role selection (FUNDRAISER or SUPPORTER) after first wallet connect. Triggered when `isNotRegistered === true` on AuthMeData |
| Campaign detail page | Both | Full story, progress, donor count, fundraiser info |
| Donation flow | SUPPORTER | Approve USDC → donate via smart contract |
| Campaign creation | FUNDRAISER | Multi-step form to deploy a new campaign |
| Campaign management | FUNDRAISER | View own campaigns, cancel campaigns |
| Fund withdrawal | FUNDRAISER | Call `withdraw()` on campaign smart contract |
| Fundraiser dashboard | FUNDRAISER | Overview of all their campaigns |
| Donation history | SUPPORTER | List of past donations |
| Profile / account management | Both | Update name, avatar, etc. |

### ❌ Out of MVP Scope

- Multi-chain support
- Multi-token donations
- NFT rewards
- DAO governance
- Subscription donations
- Fiat payments
- Cross-chain donations

---

## User Roles

### `FUNDRAISER`
- Creates and manages campaigns
- Can: create campaign, cancel campaign, view own campaigns, withdraw funds
- Donated funds are held in the **Campaign Smart Contract**, not sent directly to the fundraiser's wallet
- Funds are only accessible via the `withdraw()` smart contract function

### `SUPPORTER`
- Donates to campaigns
- Can: view campaigns, donate USDC, view donation history, update profile
- Cannot withdraw campaign funds (contract enforces this)

Role is stored in `AuthMeData.role` after authentication. `null` role + `isNotRegistered: true` means the user must complete onboarding.
