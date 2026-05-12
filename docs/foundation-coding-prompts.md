# Bite-size Coding Prompts — Foundation (Locked Sequence)

Use these prompts in order. Each prompt is scoped to one reviewable PR.

---

## Prompt 1 — Math contract consolidation

Create/normalize shared math functions under `src/lib/math/` for implied probability, EV, full Kelly, fractional Kelly, and capped stake. Export typed interfaces and remove duplicate math helpers if present.

**Constraints**
- Decimal odds as canonical internal format.
- Pure deterministic functions only.

**Deliverables**
- Updated math module(s) in `src/lib/math/`.
- Unit tests for nominal + edge cases.

---

## Prompt 2 — Validation contract consolidation

Create/normalize reusable Zod schemas in `src/lib/validation/` for bankroll, decimal odds, model probability, kelly fraction, max stake percent, ISO date parsing, and protected-key headers.

**Deliverables**
- Reusable schema exports and inferred TS types.
- Shared error mapping helper for deterministic 4xx responses.

---

## Prompt 3 — Kelly API thin-handler refactor

Refactor `src/app/api/kelly/route.ts` so the route only parses input, delegates to shared math, and returns response. Remove embedded formulas from handler.

**Done when**
- Handler has no business math logic.
- Invalid payloads return structured 4xx.

---

## Prompt 4 — Bets API validation + query hardening

Refactor `src/app/api/bets/route.ts` to use shared schemas and add pagination/limits for list retrieval. Ensure Prisma queries select only required fields.

**Done when**
- No unbounded list query path remains.
- Response contract remains stable or migration-noted.

---

## Prompt 5 — B2B odds auth hardening

Harden `src/app/api/b2b/odds/route.ts` auth path: hashed key verification, non-enumerable auth errors, and safe log redaction.

**Done when**
- No plaintext key persistence/compare path.
- Auth failure responses do not reveal key existence.

---

## Prompt 6 — Protected-route rate limiter

Add a reusable limiter utility in `src/lib/` and apply it to protected B2B routes. Configure thresholds via server env vars.

**Done when**
- Protected endpoints enforce rate limits consistently.
- Retry guidance is generic and non-sensitive.

---

## Prompt 7 — UI contract alignment (Kelly + bankroll surfaces)

Align Kelly/bankroll UI flows to consume shared server-approved math outputs (or shared math module), avoiding local divergent calculations.

**Target areas**
- `src/components/features/`
- `src/components/edge/`
- relevant `src/app/` routes

**Done when**
- No duplicate formula implementations in UI.
- Form inputs remain keyboard accessible with visible labels.

---

## Prompt 8 — Sensitive logging redaction pass

Add a small structured logging utility that redacts API keys, tokens, and private bankroll fields. Replace raw logs in protected route flows.

**Done when**
- Redaction is default behavior for protected-path logs.
- Error logs remain operationally useful.

---

## Prompt 9 — Foundation docs lock + examples

Update docs to match implementation contracts and include curl examples for valid/invalid flows on Kelly and protected B2B odds endpoints.

**Done when**
- Docs are executable and current.
- Language stays probabilistic and non-promissory.
