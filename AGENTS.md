# DOCTORE AI — Agent Instructions

This file defines the mandatory product, architecture, security, and UI constraints for all AI coding agents working in this repository.

## Product identity

DOCTORE AI is a Betting Operations System.

It is not:

- a picks app
- a sportsbook
- a casino product
- an affiliate product
- a social betting product
- a generic dashboard
- a prediction feed optimized for more action

Core doctrine:

> DOCTORE AI helps systematic bettors avoid bad exposure before capital is committed.

Every betting decision must pass through this controlled decision contract:

```txt
Ledger → Math Core → Bankroll → Risk Check → CLV → Decision Engine → ACCEPT / REJECT / WAIT
```

The product exists to improve decision quality, bankroll discipline, stake sizing, exposure control, CLV tracking, and auditability. It must never promise profit or guaranteed outcomes.

## Required user experience

The user should not manually calculate, compare raw tables, or interpret probability screens during action.

The user should only receive one operational decision:

```txt
ACCEPT
REJECT
WAIT
```

Maximum visible decision cards: 3.

No raw odds-table decision workflow is allowed in the primary UI.

## Technical stack target

Locked implementation target:

- Next.js App Router
- TypeScript
- TailwindCSS
- shadcn/ui where useful
- Firebase Auth
- Firebase custom claims
- Firestore
- Firebase Admin
- Next.js Route Handlers
- Zod
- TanStack Query for client server-state
- Zustand only for local UI state when needed
- Vitest / Testing Library / Playwright

Do not introduce or expand Supabase, Clerk, Prisma, or PostgreSQL as the primary DOCTORE AI application stack unless a written architecture decision explicitly reverses the Firebase/Firestore lock.

## Architecture rules

- Server Components are the default.
- Firestore access is server-only for protected product data.
- Client components call typed API endpoints.
- All request, response, environment, and persisted data must be validated with Zod.
- Separate persistence models, DTOs, and UI view models when shapes differ.
- Do not place domain logic in page or layout shells.
- Named exports only except framework-required files.
- Do not use `any` without a same-line justification.
- Do not use `useEffect` for data fetching.
- Do not calculate betting math inside UI components.
- Use semantic interactive elements, not clickable `div` elements.

## Security and access enforcement

UI visibility is never authorization.

Access must be enforced at four layers:

1. Firebase Auth custom claims
2. Firestore security rules
3. Server-side Route Handler authorization
4. UI visibility

Canonical roles:

```txt
admin
project_manager
client
```

Canonical plans:

```txt
free
pro
sharp
infra
```

Rules:

- Protected Firestore reads and writes must go through server endpoints.
- Protected data must not be accessed with the client-side Firestore SDK.
- API endpoints must verify Firebase session cookies.
- API endpoints must check role and plan before returning protected data.
- Firestore rules must reject unauthorized direct access.
- Role permissions and plan limits must exist in code, not only copy.
- Sensitive mutations must write audit events.

Audit is required for:

- bet creation
- bet settlement
- bankroll correction
- risk config change
- manual CLV override
- market approval override
- plan change
- role change
- model activation or retirement

## Product language constraints

Use:

- model probability
- implied probability
- fair odds
- edge
- expected value
- CLV
- Fractional Kelly
- bankroll
- exposure
- decision quality
- process quality
- audit trail

Do not use:

- lock
- sure bet
- guaranteed profit
- risk-free
- premium picks
- hot picks
- best bets today
- beat the books
- unlock winners

## UI doctrine

The interface must feel like institutional decision infrastructure:

- dark
- clinical
- precise
- restrained
- number-first
- decision-first
- border-led rather than shadow-led

Use green only for validated opportunity or confirmed acceptance.
Use red only for rejected exposure, invalid state, negative EV, or warning.
Do not use casino colors, decorative gradients, hype copy, emojis, sports-team-logo decoration, or sportsbook card styling.

## Plan behavior

Plan limitations must feel like system state, not sales pressure.

Use:

```txt
Filter inactive
Sizing unavailable
Exposure layer inactive
PRO keeps the filter active
SHARP controls exposure
```

Do not write:

```txt
Upgrade now
Unlock premium picks
Subscribe to win
Get better bets
```

## MVP scope

Phase 1 starts with audited betting infrastructure:

```txt
Ledger → Math Core → Bankroll → Risk Check → CLV → Decision Engine → ACCEPT / REJECT / WAIT
```

Phase 1 excludes:

- automated bet placement
- social features
- leaderboards
- live signals before ledger and CLV readiness
- public pick pages
- sportsbook-like feed UX
- complex dashboards before the system of record

## Definition of done

A change is complete only when:

1. Product doctrine is preserved.
2. TypeScript passes.
3. Lint passes.
4. Relevant tests pass.
5. Runtime inputs and outputs are Zod-validated.
6. Protected data access is server-only.
7. Sensitive mutations create audit events.
8. No picks-app, sportsbook, casino, or hype behavior is introduced.
9. Documentation is updated when contracts, setup, API behavior, or environment variables change.
