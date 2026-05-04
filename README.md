# 🩺 Doctore AI — Sports Betting Intelligence Platform

> **"Edge, not picks."**  
> Doctore AI is a production-grade predictive analytics engine for MLB, identifying statistically mispriced odds using an advanced AI ensemble model.

---

## 🚀 Overview
Doctore AI bridges the gap between recreational bettors and professional quant teams. We provide a mathematical edge through real-time probability gaps and automated bankroll management using the Fractional Kelly Criterion.

### Key Value Props
- **B2C:** Real-time Edge Feed, automated stake sizing, full performance transparency.
- **B2B:** High-fidelity API for sportsbooks and media platforms (Data-as-a-Service).

---

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Database:** PostgreSQL via Prisma ORM
- **Styling:** Tailwind CSS (design system tokens)
- **Auth:** Clerk / NextAuth.js
- **Math Engine:** Custom `useKelly` hook (Fractional Kelly v2)

---

## 📂 Repository Structure
- `src/app/` — Next.js routes and layouts.
- `src/components/ui/` — P0 design system components (A11y compliant).
- `src/components/features/` — Business logic components (EdgeCards, calculators).
- `src/hooks/` — Core logic (`useKelly`, `useOddsData`).
- `src/lib/` — Shared utilities and API clients.
- `prisma/` — Database schema and migrations.

---

## 🛠 Getting Started
1. **Clone & install**
   ```bash
   git clone https://github.com/jamiharju-hash/doctore-ai.git
   cd doctore-ai
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Run lint checks**
   ```bash
   npm run lint
   ```
