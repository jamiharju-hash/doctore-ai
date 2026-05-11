# PRD Foundation QA — Doctore AI

Date: 2026-05-11

## Summary

This QA pass establishes a stable product foundation by:

1. identifying specification gaps between current repository documentation and target product behavior,
2. closing those gaps with explicit acceptance criteria, and
3. locking implementation boundaries so execution can proceed in small, testable increments.

Doctore AI remains a **quantitative decision terminal** focused on model-market comparison, expected value discovery, fractional Kelly sizing, bankroll controls, and controlled B2B API access.

---

## QA Findings: Spec Gaps

## 1) Product positioning drift

**Gap**
Current docs use mixed language ("predictive analytics engine", "AI ensemble model") but do not consistently frame the product as a quant decision terminal with explicit risk language.

**Risk**
Can drift into tipster framing and non-compliant marketing claims.

**Fix**
All product copy must preserve probabilistic language:
- model probability
- implied probability
- expected value (EV)
- variance
- calibration
- bankroll
- drawdown
- execution discipline

**Acceptance criteria**
- No UI/API/docs language implies guaranteed outcomes.
- No "lock", "sure win", "risk-free", or equivalent terms.

---

## 2) MVP scope ambiguity (B2C vs B2B)

**Gap**
Value props mention both B2C and B2B, but no explicit MVP boundary exists for what ships in Foundation.

**Risk**
Team fragmentation and oversized implementation.

**Fix**
Foundation scope is:
- **In:** signal feed, signal detail, EV + Kelly math service, bankroll tracker, authenticated user context, protected B2B read API.
- **Out:** auto-bet execution, payments/billing flows, external provider expansion, advanced social features.

**Acceptance criteria**
- Every ticket maps to in-scope capability.
- Out-of-scope work requires explicit review note.

---

## 3) Mathematical contract not centralized in product spec

**Gap**
Formulas exist in agent instructions but are not captured in a product-facing PRD artifact.

**Risk**
Inconsistent implementations across hooks, APIs, and UI calculators.

**Fix**
Canonical formulas:
- `impliedProbability = 1 / decimalOdds`
- `ev = modelProbability * decimalOdds - 1`
- `b = decimalOdds - 1`
- `p = modelProbability`
- `q = 1 - p`
- `fullKelly = (b * p - q) / b`
- `fractionalKelly = max(0, fullKelly) * kellyFraction`
- `stake = min(bankroll * fractionalKelly, bankroll * maxStakePct)`

**Acceptance criteria**
- Shared math utilities in `src/lib/` are single source of truth.
- UI and API layers consume shared functions; no duplicated divergent formulas.

---

## 4) Input validation requirements under-specified

**Gap**
No single PRD checklist states required input constraints for calculation and API endpoints.

**Fix**
Mandatory validation:
- `bankroll > 0`
- `decimalOdds > 1`
- `0 < modelProbability < 1`
- `0 < kellyFraction <= 1`
- `0 < maxStakePct <= 100`
- ISO-compatible dates

**Acceptance criteria**
- All externally reachable handlers validate payloads with Zod (or equivalent explicit schema).
- Invalid requests return structured 4xx errors without secret leakage.

---

## 5) Security contract for B2B API incomplete

**Gap**
No explicit product-level requirements for API key storage/verification behavior in repo docs.

**Fix**
Required controls:
- hashed API keys only (never plaintext persistence),
- constant-time comparison where practical,
- rate limiting,
- tenant-isolated data access,
- non-enumerable auth errors.

**Acceptance criteria**
- No endpoint reveals whether an API key exists.
- Logging excludes raw keys, private bankroll details, and personal data.

---

## 6) Implementation boundaries not codified as a checklist

**Gap**
Architecture boundaries are known but not turned into an execution gate.

**Fix**
Create boundary checklist (see section below) and require it in PR descriptions.

---

## Locked Implementation Boundaries (Foundation)

## A. File ownership and layering

- Business logic: `src/lib/`
- API handlers only: `src/app/api/`
- Route UI: `src/app/`
- Reusable UI components: `src/components/`

**Rule**: route handlers stay thin and delegate math/data logic to `src/lib/`.

## B. Data and query boundaries

- No unbounded list endpoints.
- Public/protected list reads must use pagination (`take`/cursor/page).
- Select only required fields.

## C. Security boundaries

- No secrets in client components.
- `NEXT_PUBLIC_` only for safe public values.
- No raw API key logging.

## D. Product boundaries

- No automated real-money execution.
- No guaranteed-return wording.
- No hidden affiliate routing.

## E. Change-control boundaries

Requires explicit review before implementation:
- model/probability/EV/stake-sizing logic changes,
- new external data providers,
- auth/subscription architecture changes,
- user identity expansion,
- cross-tenant data-sharing behavior.

---

## Foundation Acceptance Gate (must pass)

1. Build passes.
2. TypeScript passes.
3. Core UI paths keyboard accessible.
4. API inputs validated.
5. Math behavior documented for any formula change.
6. Security-sensitive endpoints redact secrets and avoid auth leakage.
7. Docs updated when setup/API/env behavior changes.

---

## Delivery sequencing (recommended)

1. **Math core hardening** (`src/lib/` pure utilities + tests)
2. **API contract hardening** (Zod validation, error model, pagination)
3. **UI contract alignment** (signal/kelly/bankroll screens consume shared math)
4. **B2B protection controls** (key hashing, compare, throttling, audit-safe logs)
5. **Docs + QA automation checks**
