# Contributing to Verity Frontend

Thank you for contributing to Verity! This guide covers the conventions and
workflows for the frontend codebase.

## Getting Started

```bash
git clone https://github.com/your-org/verity-frontend.git
cd verity-frontend
pnpm install
cp .env.example .env.local
pnpm dev
```

## App Router Conventions

This project uses **Next.js App Router** strictly. Key rules:

- **Route groups** organize layouts: `(marketing)` for public pages, `(app)` for
  authenticated pages. Route groups do not affect the URL.
- **Pages** are `page.tsx` files inside route directories.
- **Layouts** are `layout.tsx` files that wrap child routes.
- **Loading states** are `loading.tsx` files in the same directory.
- **Error boundaries** are `error.tsx` files (must be `'use client'`).
- **No Pages Router patterns.** Do not use `getServerSideProps`,
  `getStaticProps`, or `pages/api/`.

### Client vs Server Components

- **Server components** (default): pages, layouts, static UI.
- **Client components** (`'use client'`): anything with `useState`, `useEffect`,
  event handlers, or browser APIs.
- Keep `'use client'` as low in the tree as possible. Wrap only the interactive
  part, not the entire page.

## Adding a New Page

1. **Choose the route group:**
   - Public marketing page → `app/(marketing)/your-page/page.tsx`
   - Authenticated app page → `app/(app)/your-page/page.tsx`
   - Standalone (no shared layout) → `app/your-page/page.tsx`

2. **Create the page file:**
   ```tsx
   // app/(marketing)/your-page/page.tsx
   export default function YourPage() {
     return (
       <div className="mx-auto max-w-4xl py-16">
         <h1 className="text-3xl font-bold text-navy">Your Page</h1>
         {/* Page content */}
       </div>
     );
   }
   ```

3. **Add feature components** in `components/features/your-feature/`:
   ```
   components/features/your-feature/
   ├── main-component.tsx
   └── sub-component.tsx
   ```

4. **Add API calls** in `services/your-module.ts` if needed.

5. **Add types** in `types/your-domain.ts` if needed.

6. **Update route constants** in `lib/constants.ts`.

## Adding a New Component

### UI Primitives (`components/ui/`)

For reusable, generic components (buttons, inputs, modals):

1. Create `components/ui/your-component.tsx`
2. Export from `components/ui/index.ts`
3. Follow existing patterns: TypeScript props interface, `cn()` for class
   merging, `forwardRef` where appropriate.

### Feature Components (`components/features/`)

For domain-specific components:

1. Create a folder: `components/features/your-domain/`
2. Create your component file
3. Keep components focused — one component per file

### Naming

- **Files:** `kebab-case.tsx` (e.g., `hero-section.tsx`)
- **Components:** `PascalCase` (e.g., `HeroSection`)
- **Types:** `PascalCase` (e.g., `DidResolution`)
- **Functions:** `camelCase` (e.g., `resolveDid`)

## Copy Rules

These rules apply to all user-facing text in the codebase:

- **Never show full wallet addresses.** Always use `truncateAddress()` from
  `lib/truncate.ts`. Display in `font-mono` (JetBrains Mono).
- **Never use "DID" in user-facing copy.** Say "your Verity identity" or
  "your identity" instead.
- **Never use blockchain jargon** (DeFi, smart contract, etc.) in user-facing
  copy. Explain things in plain language.

## Design Tokens

All colors are defined in `tailwind.config.ts`. Use these, not raw hex values:

| Token | Usage |
|---|---|
| `navy` | Primary text, dark backgrounds |
| `accent` | CTAs, links, active states |
| `surface` | Page backgrounds, cards |
| `verified` | Success/verified status (green) |
| `pending` | Pending status (amber) |
| `revoked` | Error/revoked status (red) |

## PR Guidelines

### Branch Naming

```
feat/short-description      # New features
fix/short-description       # Bug fixes
docs/short-description      # Documentation only
refactor/short-description  # Code refactoring
```

### Commit Messages

Follow conventional commits:

```
feat: add wallet unlink flow
fix: modal escape key not working
docs: update API endpoint table
```

### PR Checklist

- [ ] `pnpm build` passes
- [ ] `pnpm lint` passes
- [ ] No TypeScript errors
- [ ] New pages have TODO comments explaining scope
- [ ] New components have TypeScript props interface
- [ ] User-facing text follows copy rules (no "DID", no full addresses)

## Running Locally

```bash
pnpm dev          # Start dev server on http://localhost:3000
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Project Structure

```
verity-frontend/
├── app/                    # App Router pages and layouts
│   ├── (marketing)/        # Public pages: /about, /how-it-works, /developers
│   ├── (app)/              # Authenticated pages: /dashboard, /identity, etc.
│   ├── create/             # Onboarding flow: /create, /create/verify, /create/confirmation
│   ├── authorize/          # OAuth popup page
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Landing page (fully built)
│   ├── loading.tsx         # Root loading state
│   ├── error.tsx           # Root error boundary
│   └── not-found.tsx       # 404 page
├── components/
│   ├── ui/                 # Reusable primitives
│   ├── shared/             # Layout components
│   └── features/           # Feature-specific components
├── hooks/                  # Custom React hooks
├── services/               # API call functions (one per backend module)
├── types/                  # TypeScript interfaces (one per domain)
├── lib/                    # Utilities, constants, Stellar helpers
├── providers/              # React context providers (wallet, auth, theme)
└── public/                 # Static assets
```
