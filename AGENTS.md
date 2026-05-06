# Doctore AI — Agent Skill Profiles

This file defines operational instructions, coding standards, and architecture constraints for AI coding agents working in the Doctore AI codebase.

Doctore AI is a quant terminal for sports betting markets. It is analytical infrastructure for model-market comparison, positive expected value discovery, fractional Kelly stake sizing, bankroll protection, and controlled B2B API access.

Core message:

> We find the edge. You execute the strategy.

## Global rules

1. Preserve Doctore AI as a quantitative decision terminal, not a tipster service or gambling entertainment product.
2. Keep all product language probabilistic. Use expected value, model probability, implied probability, variance, calibration, drawdown, bankroll, and execution discipline.
3. Never claim guaranteed profit, guaranteed returns, or risk-free betting.
4. Prefer small, reviewable changes over large unstructured rewrites.
5. Use strict TypeScript.
6. Keep business logic in `src/lib/`.
7. Keep API handlers in `src/app/api/`.
8. Keep route UI in `src/app/` and reusable UI in `src/components/`.
9. Keep file paths Linux-compatible and case-correct.
10. Document any change that affects model probability, EV, Kelly sizing, exposure caps, bankroll logic, or B2B API access.

## Frontend Agent Skill

### Scope

Frontend agents own the Next.js 15, React 19, Tailwind CSS, UI composition, responsiveness, and accessibility layer.

### Responsibilities

- Build the quant terminal interface: signal feed, signal detail, Kelly calculator, bankroll tracking, pricing, API docs, and onboarding flows.
- Use React server components by default.
- Use client components only when browser state, effects, forms, or event handlers require them.
- Maintain a premium, restrained, analytical visual style.
- Meet WCAG 2.2 AA accessibility standards.
- Keep the product mobile-first but desktop-ready.

### Coding standards

- Use semantic HTML first.
- Every interactive control must be keyboard accessible.
- Buttons must be `<button>` elements unless navigation requires links.
- Inputs must have visible labels or accessible names.
- Do not rely on color alone to communicate status.
- Preserve visible focus states.
- Maintain high contrast on dark backgrounds.
- Use Tailwind utilities consistently.
- Keep components small and composable.

### File naming

Prefer lowercase, hyphen-separated filenames:

```text
src/components/signal-card.tsx
src/components/metric-card.tsx
src/components/pricing-card.tsx
src/app/dashboard/page.tsx
src/app/kelly/page.tsx
```

Avoid new uppercase component filenames unless matching an existing pattern.

### Forbidden frontend changes

- Casino imagery, slot machines, roulette wheels, poker chips, or neon gambling aesthetics.
- Fake testimonials or claims implying certain profit.
- Inaccessible custom controls.
- UI that hides risk, variance, or bankroll constraints.

## Backend Agent Skill

### Scope

Backend agents own API routes, validation, mathematical correctness, Prisma access, Supabase compatibility, security controls, and data integrity.

### Responsibilities

- Implement positive EV, implied probability, fractional Kelly, bankroll, bet logging, signal ranking, and B2B API logic.
- Validate every external input with Zod or equivalent explicit validation.
- Keep calculation functions pure and testable.
- Keep route handlers thin; place reusable logic in `src/lib/`.
- Use Prisma efficiently: select only required fields, avoid unbounded queries, and paginate list endpoints.
- Design Supabase compatibility with row-level security and tenant isolation in mind.
- Protect B2B endpoints with hashed API keys, rate limits, and audit-friendly behavior.

### Mathematical standards

Use decimal odds as the canonical internal odds format unless a route explicitly converts from another format.

Implied probability:

```text
impliedProbability = 1 / decimalOdds
```

Expected value:

```text
ev = modelProbability * decimalOdds - 1
```

Kelly sizing:

```text
b = decimalOdds - 1
p = modelProbability
q = 1 - p
fullKelly = (b * p - q) / b
fractionalKelly = max(0, fullKelly) * kellyFraction
```

Stake cap:

```text
stake = min(bankroll * fractionalKelly, bankroll * maxStakePct)
```

### Validation rules

- `bankroll > 0`
- `decimalOdds > 1`
- `0 < modelProbability < 1`
- `0 < kellyFraction <= 1`
- `0 < maxStakePct <= 100`
- Dates must be ISO-compatible.
- API keys must never be stored in plaintext.
- API errors must not leak whether a specific key exists.

### Security standards

- Hash API keys before persistence.
- Use constant-time comparison where practical.
- Add rate limits to protected routes.
- Never expose secrets to client components.
- Use `NEXT_PUBLIC_` only for values safe to expose publicly.
- Do not log raw API keys, tokens, private bankroll details, or personal information.

### Prisma standards

- Avoid `findMany` without `take` on public or protected list endpoints.
- Use indexes for frequent filters: user, status, sport, market, createdAt, startsAt.
- Prefer transactions for bet settlement and bankroll updates.
- Avoid floating-point storage for money. Use Decimal for bankroll, stake, odds where appropriate.

### Supabase / RLS constraints

- Treat user-owned rows as private by default.
- Any Supabase table design must include ownership or tenant scoping.
- RLS policies must deny by default and allow only explicit access patterns.
- B2B tenants must not share data unless deliberately configured.

## Review & Docs Agent Skill

### Scope

Review agents act as QA, architecture guardrails, documentation maintainers, and release-readiness reviewers.

### Responsibilities

- Review security, correctness, architecture, accessibility, and operational readiness.
- Verify mathematical formulas and edge-case behavior.
- Check WCAG 2.2 AA expectations.
- Check Linux path compatibility and case-sensitive imports.
- Ensure docs match implementation.
- Reject vague claims, guaranteed-return wording, and hype language.

### Standard review report

Use this format:

```md
# Review report

## Summary

One to three sentences on what changed and whether it is safe to merge.

## Blocking issues

- [ ] Issue, file, line, impact, required fix.

## Non-blocking issues

- [ ] Issue, file, line, impact, recommended fix.

## Security

- API key handling:
- Auth / authorization:
- Data leakage risk:
- Logging risk:

## Mathematical correctness

- Implied probability:
- EV calculation:
- Kelly sizing:
- Stake caps:
- Edge cases:

## Accessibility

- Keyboard access:
- Labels and names:
- Contrast:
- Focus states:
- Reduced-motion considerations:

## Architecture

- Route boundaries:
- Business logic placement:
- Database access:
- Scalability:

## Documentation impact

- README:
- Environment variables:
- API examples:
- Migration notes:

## Verdict

Approve / request changes / needs manual test.
```

### Documentation standards

- Keep setup instructions executable.
- Document every required environment variable.
- Include curl examples for public and protected API routes.
- Mark demo data clearly as demo data.
- Keep betting risk, jurisdiction, and no-guaranteed-return disclaimers visible.

## Architecture boundaries

### Allowed

- Next.js App Router pages and API routes.
- React server components by default.
- Tailwind CSS utility styling.
- Prisma for database access.
- Zod for input validation.
- Supabase-compatible schema decisions.
- Protected B2B API endpoints.

### Requires explicit review

- New external data providers.
- Real-money execution integrations.
- Automated bet placement.
- User identity and subscription billing changes.
- Model changes that affect probability, EV, or stake sizing.
- Changes to bankroll risk logic.

### Forbidden without compliance review

- Guaranteed profit language.
- Automated real-money betting execution.
- Hidden affiliate routing.
- Unclear odds sourcing.
- Storing plaintext API keys.
- Exposing private user betting history across tenants.

## Definition of done

A change is complete only when:

1. It builds successfully.
2. TypeScript passes.
3. Public UI is keyboard accessible.
4. API inputs are validated.
5. Mathematical behavior is documented when changed.
6. Security-sensitive routes avoid secret leakage.
7. README or docs are updated when setup, API, or environment behavior changes.
