# Bite-size Coding Prompts — Foundation Execution

Use these in order. Each prompt is intentionally narrow and reviewable.

---

## Prompt 1 — Centralize math primitives

Implement a `src/lib/math/edge.ts` module with pure, fully typed functions for implied probability, EV, full Kelly, fractional Kelly, and capped stake sizing using decimal odds. Add unit tests for nominal and edge cases (invalid ranges, zero/negative protections, cap behavior). Do not modify API handlers yet.

**Done when**
- Functions are pure and deterministic.
- Tests cover formula correctness and boundaries.

---

## Prompt 2 — Add strict input schemas

Create reusable Zod schemas in `src/lib/validation/` for Kelly/stake calculation inputs (`bankroll`, `decimalOdds`, `modelProbability`, `kellyFraction`, `maxStakePct`) and shared date/key formats. Return typed parse results for server usage.

**Done when**
- Validation aligns to Foundation constraints.
- No duplicated ad-hoc validation logic in handlers.

---

## Prompt 3 — Thin API route refactor

Refactor one calculation endpoint under `src/app/api/` to use new validation schemas and math library. Keep handler responsibilities limited to parse, delegate, and format response. Return safe structured errors.

**Done when**
- Route no longer contains embedded formulas.
- Invalid input returns deterministic 4xx payload.

---

## Prompt 4 — Pagination safety pass

Audit public/protected list endpoints and add pagination limits (`take` + cursor/page) where missing. Ensure Prisma queries select only required fields.

**Done when**
- No list route uses unbounded `findMany`.
- Response shape remains backward compatible where feasible.

---

## Prompt 5 — B2B API key hardening

Implement key verification flow that persists only hashed API keys and verifies requests using constant-time comparison where practical. Standardize auth failure responses to avoid key enumeration.

**Done when**
- Plaintext keys are never stored.
- Auth errors are non-enumerable and log-safe.

---

## Prompt 6 — Rate limiting middleware for protected APIs

Add reusable rate-limiting utility for protected B2B routes (per key/tenant fingerprint). Keep failure responses generic and include retry guidance without leaking sensitive state.

**Done when**
- Protected endpoints apply limiter consistently.
- Limits are configurable via server env vars.

---

## Prompt 7 — UI alignment to shared math

Update Kelly/bankroll UI surfaces to consume shared server-approved math outputs or shared typed math utilities. Ensure keyboard accessibility and visible labels for all form controls.

**Done when**
- UI no longer computes divergent formulas.
- A11y checks pass for interactive controls.

---

## Prompt 8 — Observability and redaction pass

Introduce structured server logging helpers that redact API keys, tokens, and private bankroll details by default. Replace unsafe direct logs in protected paths.

**Done when**
- Sensitive fields are never emitted in logs.
- Error logs retain debugging utility without data leakage.

---

## Prompt 9 — Docs lock

Update README and/or docs with Foundation constraints, canonical formulas, and protected API behavior. Include curl examples for valid/invalid request flows.

**Done when**
- Docs match implementation boundaries.
- Risk language is probabilistic and non-promissory.
