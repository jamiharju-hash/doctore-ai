# DOCTORE AI — Core Specification

## Product definition

DOCTORE AI is a Betting Operations System for systematic bettors.

It is controlled exposure infrastructure for sports betting markets. It does not sell picks, operate as a sportsbook, imitate casino products, or optimize for betting volume.

## Core thesis

DOCTORE AI helps systematic bettors avoid bad exposure before capital is committed by forcing each decision through:

```txt
Ledger → Math Core → Bankroll → Risk Check → CLV → Decision Engine → ACCEPT / REJECT / WAIT
```

## Product promise

Remove weak bets before they reach the bankroll.

## What DOCTORE AI is

- Betting Operations System
- controlled exposure engine
- CLV-first process-quality system
- bankroll and risk discipline layer
- auditable decision contract
- professional betting infrastructure

## What DOCTORE AI is not

- picks app
- sportsbook
- casino product
- odds comparison table
- social betting network
- prediction feed
- public tips platform
- ROI-first dashboard

## MVP goal

Build the audited betting decision infrastructure first:

```txt
Ledger → Math Core → Bankroll → Risk Check → CLV → Decision Engine → ACCEPT / REJECT / WAIT
```

## MVP must include

- account and role foundation
- bankroll setup
- bet ledger
- CSV import readiness
- betting math functions
- risk configuration
- decision records
- manual CLV entry/calculation path
- audit events
- minimal decision UI

## MVP excludes

- automated bet placement
- sportsbook integrations
- social features
- leaderboards
- public picks pages
- live signal feed before ledger and CLV readiness
- complex dashboard before system of record

## Core user

Systematic semi-professional bettor with existing bet history, currently using spreadsheets or manual tracking, who wants to validate edge quality through CLV, bankroll discipline, and market-level review.

## Foundation rule

If a decision cannot be reconstructed later, it should not be trusted now.

A valid decision must include:

- market
- selection
- bookmaker
- entry odds
- model probability
- fair odds
- edge
- stake
- bankroll state reference
- risk result
- decision state
- decision reasons
- timestamp
- audit trail

## Decision output

Only three states are allowed:

```txt
ACCEPT
REJECT
WAIT
```

Positive edge alone is not enough for `ACCEPT`.

## Process-quality metric

CLV is the primary process-quality metric. ROI is secondary and must not be treated as proof of future profitability.

Historical data provides internal evidence only. It does not prove future profitability.

## Build order

1. `AGENTS.md`
2. `docs/spec.md`
3. domain contracts
4. Firebase server auth helper
5. Firestore server repositories
6. betting math functions
7. bankroll endpoints
8. bet ledger endpoints
9. decision evaluate endpoint
10. execution accept endpoint
11. settlement endpoint
12. CLV endpoint
13. market profile recalculation
14. minimal decision UI
15. landing and pricing sync
