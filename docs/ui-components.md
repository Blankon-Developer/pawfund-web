# UI Components & Design System

## Stack

| Tool | Purpose |
|---|---|
| **shadcn/ui** | Pre-built accessible component library (Radix UI primitives) |
| **Tailwind CSS v4** | Utility-first CSS (config via `@theme` in globals.css, no tailwind.config.ts) |
| **next-themes** | Dark/light mode |
| **tw-animate-css** | Animation utilities |
| **Lucide React** | Icon library |
| **Sonner** | Toast notifications |

---

## shadcn/ui Components

All shadcn components live in `src/components/shadcn-ui/` and are imported via the `@/shadcn-ui/<name>` alias (configured in `components.json`).

```ts
// ✅ Correct import
import { Button } from '@/shadcn-ui/button'
import { Progress } from '@/shadcn-ui/progress'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shadcn-ui/tooltip'

// ❌ Wrong — never import directly from the component path
import { Button } from '@/components/shadcn-ui/button'
```

**Adding a new shadcn component:**
```bash
bunx shadcn add <component-name>
# Example:
bunx shadcn add dialog
bunx shadcn add select
```

Components are added to `src/components/shadcn-ui/`. They are generated files — extend them via `className` props rather than modifying the source directly.

---

## Shared Components (`src/components/`)

| Component | Description |
|---|---|
| [`header.tsx`](../src/components/header.tsx) | Sticky floating pill header with logo + login button. Supports `hideHeaderPaths` to hide on specific routes |
| [`footer.tsx`](../src/components/footer.tsx) | Site footer |
| [`login-button.tsx`](../src/components/login-button.tsx) | Wallet connect button. Shows USDC balance + masked address when connected; opens AppKit modal when disconnected |
| [`menu-popover.tsx`](../src/components/menu-popover.tsx) | Dropdown popover shown when user is connected (account menu, navigation links) |
| [`main-container.tsx`](../src/components/main-container.tsx) | Page-level width container with max-width and horizontal padding |
| [`toggle-theme.tsx`](../src/components/toggle-theme.tsx) | Dark/light mode toggle button |
| `typography/` | Heading components H1–H6 for consistent type scale |

### `MainContainer`

Wrap page content with `MainContainer` for consistent layout:

```tsx
import { MainContainer } from '@/components/main-container'

export default function Page() {
  return (
    <MainContainer>
      {/* page content */}
    </MainContainer>
  )
}
```

### Typography Components

Use semantic heading components instead of raw HTML elements for consistent sizing:

```tsx
import { H1, H2, H3, H4, H5, H6 } from '@/components/typography'

<H4 className="mt-6">Campaigns</H4>
```

---

## Tailwind CSS v4

> **v4 is significantly different from v3.** There is no `tailwind.config.ts`.

- Config lives in [`src/app/globals.css`](../src/app/globals.css) inside `@theme { ... }` blocks
- CSS custom properties (design tokens) are defined there
- PostCSS config: [`postcss.config.mjs`](../postcss.config.mjs)

**Class merging — always use `cn()`:**

```ts
import { cn } from '@/utils'  // Re-exports from src/utils/cn.ts

<div className={cn('base-class', condition && 'conditional-class', className)} />
```

`cn()` uses `clsx` + `tailwind-merge` — it properly handles conflicting Tailwind classes.

---

## Theming

**Dark/light mode** is handled by `next-themes` (`ThemeProvider`).

CSS variables are used for theme tokens. Key variables:

| Variable | Usage |
|---|---|
| `--background` | Page background |
| `--foreground` | Default text |
| `--primary` | Brand primary color |
| `--muted` | Muted background (cards, inputs) |
| `--muted-foreground` | Secondary text |
| `--card` | Card background |
| `--border` | Border color |

Custom component-level CSS variables (scoped to avoid leaking):
```css
/* Example from CampaignCard */
[--campaign-card-bg:var(--background)]
[--campaign-card-bg-hover:var(--muted)]
```

The AppKit modal theme accent is synced to the primary color:
```ts
themeVariables: {
  '--apkt-accent': 'var(--primary)',
}
```

---

## Typography

Three fonts are configured in the root layout:

| Font | Variable | Role |
|---|---|---|
| **Bagel Fat One** | `--font-heading` | Logo, decorative headings |
| **Space Grotesk** | `--font-sans` | Body text (default `font-sans`) |
| **Geist Mono** | `--font-mono` | Code, addresses |

Apply with Tailwind utilities: `font-heading`, `font-sans`, `font-mono`

---

## Provider Tree

The full provider order (outermost → innermost) is:

```
ThemeProvider (next-themes)
  └── ReactQueryProvider (TanStack Query)
        └── ReownProvider (WagmiProvider + AppKit init)
              └── ReownDisconnectHandler (JWT cleanup on disconnect)
                    └── TooltipProvider (Radix UI)
                          └── Header
                          └── {children} (page content)
                          └── Footer
```

**Provider files:**
- [`src/app/_components/provider.tsx`](../src/app/_components/provider.tsx) — assembles all providers
- [`src/components/provider/theme.provider.tsx`](../src/components/provider/theme.provider.tsx)
- [`src/components/provider/react-query.provider.tsx`](../src/components/provider/react-query.provider.tsx)
- [`src/components/provider/reown.provider.tsx`](../src/components/provider/reown.provider.tsx)
- [`src/components/provider/msw.provider.tsx`](../src/components/provider/msw.provider.tsx)

---

## Design Patterns

### Campaign Card

The `CampaignCard` component (`src/features/public/components/campaign-card.tsx`) demonstrates several conventions:

- CSS custom properties for hover state color management (avoids inline styles)
- Tailwind `group` / `group-hover:` for child hover effects
- `numeral` for number formatting (`0,0`, `0a`, `0%`)
- `formatDate.timeRemaining(endAt)` for relative date display
- Tooltips wrapping truncated text (`line-clamp-2` + `Tooltip` for overflow)

### Address Display

Use `maskAddress()` from `@/utils/mask-address` to display shortened wallet addresses:

```ts
import { maskAddress } from '@/utils/mask-address'

maskAddress('0x1234567890abcdef1234567890abcdef12345678')
// → '0x1234...5678'
```

### USDC Amount Display

```ts
import numeral from 'numeral'

numeral(1234567).format('0,0')   // "1,234,567"
numeral(1234).format('0a')       // "1k"
numeral(0.456).format('0%')      // "46%"
```

For contract calls, always use Viem's `parseUnits`:
```ts
import { parseUnits } from 'viem'
parseUnits('10.5', 6)  // 10500000n (USDC has 6 decimals)
```

---

## Animation

`tw-animate-css` is available for animation utilities. Import animations via Tailwind classes:

```tsx
<div className="animate-fade-in animate-duration-300">...</div>
```

Standard CSS transitions are preferred for hover states (use `transition-all`, `duration-200`, etc.).
