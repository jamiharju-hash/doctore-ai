import { describe, expect, it } from 'vitest';
import { evaluateDecision } from './evaluateDecision';
import type { DecisionInput } from './types';

const baseInput: DecisionInput = {
  decisionId: 'decision_test_001',
  evaluatedAt: '2026-05-09T00:00:00.000Z',
  bankroll: {
    currency: 'EUR',
    available: 10_000,
    reservedExposure: 500,
    openExposure: 500,
    maxStakePct: 0.05,
    maxExposurePct: 0.2,
    kellyFraction: 0.25,
    minEdgePct: 0.02,
    minStake: 10
  },
  probability: {
    modelProbability: 0.56
  },
  market: {
    decimalOdds: 2,
    sportsbook: 'Pinnacle',
    marketId: 'market_test_001',
    selectionId: 'selection_test_001',
    capturedAt: '2026-05-09T00:00:00.000Z'
  },
  approval: {
    isApproved: true,
    profileId: 'profile_test_001'
  }
};

describe('evaluateDecision', () => {
  it('returns ACCEPT with deterministic stake when edge, Kelly, exposure, and approval checks pass', () => {
    const output = evaluateDecision(baseInput);

    expect(output).toMatchObject({
      decisionId: 'decision_test_001',
      decision: 'ACCEPT',
      reasons: ['ACCEPTED'],
      stake: 300,
      currency: 'EUR',
      impliedProbability: 0.5,
      edgePct: 0.06,
      expectedValuePct: 0.12,
      fullKellyPct: 0.12,
      fractionalKellyPct: 0.03,
      uncappedStake: 300,
      cappedStake: 300
    });

    expect(output.constraints).toEqual({
      maxStakeAmount: 500,
      maxExposureAmount: 2000,
      currentExposureAmount: 1000,
      remainingExposureAmount: 1000,
      minStakeAmount: 10
    });
  });

  it('returns WAIT when the market profile is not approved even if the bet has positive edge', () => {
    const output = evaluateDecision({
      ...baseInput,
      approval: {
        isApproved: false,
        profileId: 'profile_test_001',
        reason: 'Market profile requires more settlement history.'
      }
    });

    expect(output.decision).toBe('WAIT');
    expect(output.stake).toBe(0);
    expect(output.reasons).toContain('MARKET_NOT_APPROVED');
  });

  it('returns REJECT when edge is below the configured threshold', () => {
    const output = evaluateDecision({
      ...baseInput,
      probability: {
        modelProbability: 0.51
      }
    });

    expect(output.decision).toBe('REJECT');
    expect(output.stake).toBe(0);
    expect(output.reasons).toContain('EDGE_BELOW_THRESHOLD');
  });

  it('returns REJECT when exposure cap is already reached', () => {
    const output = evaluateDecision({
      ...baseInput,
      bankroll: {
        ...baseInput.bankroll,
        reservedExposure: 1000,
        openExposure: 1000
      }
    });

    expect(output.decision).toBe('REJECT');
    expect(output.stake).toBe(0);
    expect(output.reasons).toContain('EXPOSURE_CAP_REACHED');
  });
});
