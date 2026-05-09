import { calculateKellySizing } from '@/domain/betting/core-engine';
import type { KellyInput, KellyResult } from '@/types';

const DEFAULT_KELLY_FRACTION = 0.25;
const DEFAULT_MAX_STAKE_PCT = 0.05;

export function calculateKelly(input: KellyInput): KellyResult {
  const sizing = calculateKellySizing({
    bankroll: input.bankroll,
    decimalOdds: input.decimalOdds,
    modelProbability: input.modelProbability,
    kellyFraction: input.kellyFraction ?? DEFAULT_KELLY_FRACTION,
    maxStakePct: input.maxStakePct ?? DEFAULT_MAX_STAKE_PCT
  });

  const warnings: string[] = [];

  if (sizing.edgePct <= 0) {
    warnings.push('Negative or zero edge detected. Stake clamped to zero.');
  }

  if (sizing.cappedStake < sizing.uncappedStake) {
    warnings.push('Stake capped by bankroll risk limits.');
  }

  return {
    impliedProbability: sizing.impliedProbability,
    edge: sizing.edgePct,
    expectedValuePct: sizing.expectedValuePct,
    fullKellyPct: sizing.fullKellyPct,
    fractionalKellyPct: sizing.fractionalKellyPct,
    recommendedStake: sizing.uncappedStake,
    cappedStake: sizing.cappedStake,
    isBettable: sizing.edgePct > 0 && sizing.cappedStake > 0,
    warnings
  };
}

export const calculateKellyFraction = (input: {
  probability: number;
  decimalOdds: number;
  kellyFraction?: number;
}): number => {
  const sizing = calculateKellySizing({
    bankroll: 1,
    decimalOdds: input.decimalOdds,
    modelProbability: input.probability,
    kellyFraction: input.kellyFraction ?? DEFAULT_KELLY_FRACTION,
    maxStakePct: 1
  });

  return sizing.fractionalKellyPct;
};
