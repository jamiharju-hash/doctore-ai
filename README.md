# DOCTORE AI

DOCTORE AI is an institutional-grade MLB decision filtering system.

It is not a betting app, sportsbook clone, signal feed, casino-style dashboard or affiliate product. It is a probability, risk and elimination engine that exists to remove weak exposure before capital is committed.

## Product doctrine

```txt
Free shows the surface.
PRO removes bad decisions.
SHARP controls exposure.
```

The user should not calculate, compare manually or interpret tables during action. The system ranks internally and presents only the decisions that matter.

## Interface doctrine

```txt
Decision
Confidence
Risk
Sizing
Reason
```

Mandatory rules:

- Maximum visible decisions: 3.
- Green is only for validated opportunity, positive edge or confirmed acceptance.
- Red is only for rejected exposure, negative EV, warnings or invalid states.
- Borders before shadows.
- Numbers before explanation.
- No decorative icons.
- No casino, sportsbook, hype or affiliate language.
- No explicit upgrade pressure.

## Technical stack

- Next.js 15 App Router
- TypeScript strict mode
- Tailwind CSS
- TanStack Query for server state
- Zustand for scoped client state
- Zod for validation
- Firebase Auth
- Firebase custom claims
- Firestore
- Firebase Admin for server-side access
- Vercel deployment
- Python/FastAPI/XGBoost sidecar for ML services

## Security model

Protected product data is server-only.

Client components must call typed Route Handlers. Route Handlers verify Firebase session cookies, check role and plan, validate all input/output with Zod and use Firebase Admin for Firestore access.

UI visibility is never authorization.

## Canonical roles

| Role | Scope |
| --- | --- |
| `admin` | Full system control |
| `project_manager` | Assigned-client onboarding flow only |
| `client` | Own decision system only |

Canonical mapping:

```txt
Jami = admin
Ville = project_manager
Client = client
```

## Phase 1 scope

- Auth
- App shell
- Dashboard
- Signals
- Signal detail
- Game log
- Settings

Phase 2 starts only after Phase 1 is complete:

1. Live odds
2. Repricing
3. Notifications
4. Multi-sport
5. Leaderboard/social

Social features must not outrank the core decision engine.

## Development

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
```

## Build standard

Build DOCTORE AI like an institutional-grade fintech decision system.

Everything else is interface.
