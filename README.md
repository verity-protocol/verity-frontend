# Verity Frontend

> Prove who you are, reveal nothing.

Next.js 14+ frontend for Verity — a self-sovereign identity protocol on Stellar.
Users create a Verity identity, verify once, and prove their status to any app
without sharing their wallet or documents.

## App Overview

Verity is a three-repo system:

| Repo | Purpose |
|---|---|
| `verity-contracts` | Soroban smart contracts (DID Registry, Credentials, ZK Verifier) |
| `verity-backend` | NestJS API, Horizon integration, PostgreSQL |
| `verity-frontend` | Next.js App Router frontend (this repo) |

The frontend handles wallet connection (Freighter), the onboarding flow,
identity management, and the authorization popup for third-party apps.

## Page / Route Map

### Marketing (public)

| Route | Page | Status |
|---|---|---|
| `/` | Landing page — hero, value props, how it works, CTA | ✅ Built |
| `/about` | Mission, team, open source philosophy | TODO |
| `/how-it-works` | Detailed protocol walkthrough, architecture, FAQ | TODO |
| `/developers` | API docs, integration guide, code examples, API explorer | TODO |

### Onboarding

| Route | Page | Status |
|---|---|---|
| `/create` | Step 1: Connect Freighter wallet | Scaffolded |
| `/create/verify` | Step 2: Upload ID document for verification | Scaffolded |
| `/create/confirmation` | Step 3: Verified — celebration and next steps | Scaffolded |

### Authenticated App

| Route | Page | Status |
|---|---|---|
| `/dashboard` | Main dashboard — verification status, wallets, credentials, apps | TODO |
| `/dashboard/wallets` | Wallet management — list, add, remove, set primary | TODO |
| `/dashboard/apps` | Connected apps — list, revoke access | TODO |
| `/identity` | DID details — full identity view | TODO |
| `/credentials` | Credential list — types, issuers, status badges | TODO |
| `/settings` | Account settings, network preference, danger zone | TODO |

### Standalone

| Route | Page | Status |
|---|---|---|
| `/authorize` | OAuth popup — approve/deny third-party verification request | Scaffolded |

## Component Architecture

```
components/
├── ui/              # Reusable primitives (Button, Input, Card, Modal, Badge)
├── shared/          # Layout components (Navbar, Footer, Sidebar, WalletButton)
└── features/        # Feature-specific components
    └── landing/     # Hero, DifferentiatorCards, HowItWorks, CTA (fully built)
```

## Project Structure

```
verity-frontend/
├── app/                         # App Router pages and layouts
│   ├── (marketing)/             # Public pages
│   │   ├── about/
│   │   ├── developers/
│   │   └── how-it-works/
│   ├── (app)/                   # Authenticated pages
│   │   ├── dashboard/
│   │   ├── credentials/
│   │   ├── identity/
│   │   └── settings/
│   ├── authorize/               # OAuth popup
│   └── create/                  # Onboarding flow
├── components/
│   ├── features/landing/        # Landing page sections
│   ├── shared/                  # Layout components
│   └── ui/                      # Reusable primitives
├── lib/                         # Utilities, constants, Stellar helpers
├── providers/                   # React context (wallet, auth, theme)
├── services/                    # API call functions (one per module)
├── types/                       # TypeScript interfaces (one per domain)
├── test/                        # Test setup
└── .github/                     # CI, issue templates, PR template
```

## Local Setup

### Prerequisites

- Node.js 20+
- pnpm
- [Freighter](https://www.freighter.app) browser extension

### Install

```bash
pnpm install
```

### Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values. See [Environment Variables](#environment-variables) below.

### Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:3000/api/v1` | Backend API base URL |
| `NEXT_PUBLIC_STELLAR_NETWORK` | No | `testnet` | Stellar network (`testnet` or `mainnet`) |
| `NEXT_PUBLIC_STELLAR_HORIZON_URL` | No | `https://horizon-testnet.stellar.org` | Horizon API URL |
| `NEXT_PUBLIC_STELLAR_RPC_URL` | No | `https://soroban-testnet.stellar.org` | Soroban RPC URL |

All `NEXT_PUBLIC_` variables are exposed to the browser. Never put secrets in them.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Wallet:** Freighter (`@stellar/freighter-api`)
- **Smart Contracts:** Stellar SDK (`@stellar/stellar-sdk`)
- **State:** React Context (wallet, auth, theme providers)

## License

MIT
