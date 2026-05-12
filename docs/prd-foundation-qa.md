# PRD Foundation QA — Doctore AI

Date: 2026-05-11
Owner: Product/Engineering Foundation

## Objective

Run a foundation QA pass that (1) identifies PRD/spec gaps against the current codebase, (2) closes gaps with explicit acceptance criteria, and (3) locks implementation boundaries before further feature work.

---

## Current-state evidence (codebase scan)

- API routes exist for Kelly, bets, B2B odds, and Revolut ramp flows.
- Shared math modules already exist in `src/lib/math/`.
- Validation utilities exist in `src/lib/validation/`.
- Multiple edge-feed component areas exist (`src/components/features/` and `src/components/edge/`), signaling possible ownership overlap.

This means the foundation risk is not “missing primitives”, but **contract drift** between product language, formulas, validation rules, and route behavior.

---

## Spec Gaps and Required Fixes

## 1) Product language contract is not enforced

**Gap**: Product copy can drift from quant-risk language into tipster tone.

**Fix**: Enforce probabilistic terminology in all user-facing/docs/API examples:
- model probability, implied probability, expected value, variance, calibration,
- bankroll, drawdown, execution discipline.

**Acceptance criteria**
- No guaranteed-outcome wording in UI/docs/API examples.
- No "risk-free", "sure win", "lock" phrasing.

---

## 2) Foundation scope boundary is implicit, not explicit

**Gap**: B2C/B2B are both referenced, but no lock on what Foundation includes.

**Fix (Foundation scope)**
- **In**: signal feed/detail, EV + Kelly calculations, bankroll controls, protected B2B read API.
- **Out**: auto-execution, billing/subscription workflows, new provider integrations.

**Acceptance criteria**
- Every task references one in-scope foundation capability.
- Out-of-scope requests require explicit approval note.

---

## 3) Mathematical contract is not treated as single-source-of-truth

**Canonical formulas**
- `impliedProbability = 1 / decimalOdds`
- `ev = modelProbability * decimalOdds - 1`
- `b = decimalOdds - 1`
- `p = modelProbability`
- `q = 1 - p`
- `fullKelly = (b * p - q) / b`
- `fractionalKelly = max(0, fullKelly) * kellyFraction`
- `stake = min(bankroll * fractionalKelly, bankroll * maxStakePct)`

**Fix**
- Keep formulas in shared math lib only; UI/API consume shared outputs.

**Acceptance criteria**
- No embedded formula duplication in route handlers.
- Tests cover nominal + boundary behaviors.

---

## 4) Validation contract is incomplete at PRD level

**Mandatory input rules**
- `bankroll > 0`
- `decimalOdds > 1`
- `0 < modelProbability < 1`
- `0 < kellyFraction <= 1`
- `0 < maxStakePct <= 100`
- Dates must be ISO-compatible

**Fix**
- Route input schemas must be explicit and shared.

**Acceptance criteria**
- Every externally reachable API path rejects invalid input with structured 4xx.
- Errors do not leak protected key existence/state.

---

## 5) B2B security contract needs explicit baseline

**Fix**
- Persist only hashed API keys.
- Use constant-time comparisons where practical.
- Apply rate limits for protected paths.
- Keep tenant isolation explicit.
- Keep auth errors non-enumerable.

**Acceptance criteria**
- No plaintext key persistence.
- No logs with raw key/token/private bankroll values.

---

## Locked Implementation Boundaries (Foundation)

## A) Architecture boundaries

- Business logic in `src/lib/`.
- API handlers in `src/app/api/` (thin parse/delegate/respond).
- Route UI in `src/app/`.
- Reusable UI in `src/components/`.

## B) Data boundaries

- No unbounded list endpoints.
- Use pagination (`take` + cursor/page) for list reads.
- Select only fields needed by response contract.

## C) Security boundaries

- Never expose secrets in client components.
- `NEXT_PUBLIC_` only for safe public values.
- Redact sensitive values in logs.

## D) Product boundaries

- No automated real-money execution.
- No guaranteed-return wording.
- No hidden affiliate routing behavior.

## E) Change-control boundaries (explicit review required)

- Any formula/model/EV/Kelly/stake-cap logic change.
- New external odds/provider integrations.
- Auth/identity/subscription model changes.
- Cross-tenant access behavior changes.

---

## Foundation QA Gate (must pass before broader feature expansion)

1. `npm run build` passes.
2. `npm run typecheck` passes.
3. `npm run lint` passes.
4. API input validation coverage confirmed for all public/protected routes.
5. Math behavior documented and test-covered where touched.
6. Security-sensitive routes verified for redaction + non-enumerable auth errors.
7. Docs updated when contracts/env/API behavior change.

---

## Execution order (locked)

1. Math contract consolidation.
2. Validation consolidation.
3. Thin-handler API refactors.
4. Pagination + query hardening.
5. B2B key + rate-limit hardening.
6. UI contract alignment to shared math.
7. Logging redaction + docs alignment.
