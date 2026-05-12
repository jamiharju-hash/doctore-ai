# DOCTORE AI — Data Model Specification

Firestore is the operational system of record for DOCTORE AI. Protected application data is server-only; client components call typed API endpoints.

## Collections

- users
- bankrollStates
- bets
- marketSnapshots
- modelPredictions
- decisionRecords
- clvRecords
- marketProfiles
- auditEvents
- systemConfigs

## Core rules

Every accepted or rejected decision must be reconstructable later. A trusted bet requires entry odds, stake, market, model probability, timestamp, and decision reference.

CLV is mandatory for process-quality review. Missing CLV is incomplete evidence, not proof.

Sensitive mutations must create audit events.

## Required fields

### users
id, email, role, plan, assignedManagerId, createdAt, updatedAt.

### bankrollStates
id, userId, startingBankrollUnits, currentBankrollUnits, maxRiskPerBetPct, maxDailyRiskPct, maxOpenExposurePct, kellyMultiplier, openExposureUnits, dailyRiskUsedUnits, updatedAt.

### bets
id, userId, sport, league, gameId, market, selection, bookmaker, entryOddsDecimal, stakeUnits, modelProbability, fairOddsDecimal, edgePct, kellyFraction, kellyMultiplier, recommendedStakeUnits, status, profitLossUnits, decisionId, entrySnapshotId, closingSnapshotId, placedAt, settledAt, createdAt, updatedAt.

### marketSnapshots
id, sport, league, gameId, market, selection, phase, bookmaker, oddsDecimal, impliedProbability, source, collectedAt, createdAt.

### modelPredictions
id, modelVersionId, modelName, sport, league, gameId, market, selection, probability, fairOddsDecimal, confidenceScore, featureBreakdown, generatedAt, createdAt.

### decisionRecords
id, userId, gameId, market, selection, decision, modelProbability, marketOddsDecimal, edgePct, confidenceScore, stakeUnits, riskPct, reasons, createdAt, expiresAt.

### clvRecords
id, betId, userId, entryOddsDecimal, closingOddsDecimal, entryImpliedProbability, closingImpliedProbability, clvPct, beatClose, calculatedAt.

### marketProfiles
id, userId, sport, league, market, segmentKey, sampleSize, betCount, avgClvPct, clvHitRatePct, roiPct, winRatePct, avgEdgePct, avgOddsDecimal, profitLossUnits, approvalStatus, rejectionReason, updatedAt.

### auditEvents
id, userId, eventType, entityType, entityId, before, after, createdAt, actorUserId.

### systemConfigs
id, key, value, updatedAt, updatedBy.

## Approval hierarchy

CLV first. Risk-adjusted ROI second. Win rate last.
