import { useCallback } from 'react';

export interface KellyInput {
  probability: number;
  odds: number;
  multiplier?: number;
}

export interface KellyResult {
  fraction: number;
  edge: number;
  shouldBet: boolean;
  multiplier: number;
}

export interface KellyEdgeResult {
  edgePct: number;
  isViable: boolean;
  recommendedStake: number;
  stakePercentage: number;
}

const DEFAULT_MULTIPLIER = 0.25;
const EDGE_THRESHOLD = 0.025;

const isFinitePositiveNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;

const isProbability = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 && value < 1;

export function calculateKelly(input: KellyInput): KellyResult {
  const { probability, odds, multiplier = DEFAULT_MULTIPLIER } = input;

  if (!isProbability(probability)) {
    throw new Error('Probability must be a finite number between 0 and 1 (exclusive).');
  }

  if (!isFinitePositiveNumber(odds) || odds <= 1) {
    throw new Error('Odds must be a finite number greater than 1.');
  }

  if (!isFinitePositiveNumber(multiplier) || multiplier > 1) {
    throw new Error('Multiplier must be a finite number between 0 and 1.');
  }

  const b = odds - 1;
  const baseFraction = (probability * (b + 1) - 1) / b;
  const fraction = Math.max(0, baseFraction * multiplier);
  const edge = probability - 1 / odds;

  return {
    fraction,
    edge,
    shouldBet: edge > EDGE_THRESHOLD,
    multiplier,
  };
}

export function useKelly(bankroll: number, fraction: number = DEFAULT_MULTIPLIER) {
  const calculateEdge = useCallback((modelProb: number, odds: number): KellyEdgeResult => {
    const b = odds - 1;
    const p = modelProb;

    const fStar = (p * (b + 1) - 1) / b;
    const edge = p - 1 / odds;

    return {
      edgePct: edge * 100,
      isViable: edge > EDGE_THRESHOLD,
      recommendedStake: Math.max(0, fStar * fraction * bankroll),
      stakePercentage: Math.max(0, fStar * fraction * 100),
    };
  }, [bankroll, fraction]);

  return { calculateEdge };
}

export { DEFAULT_MULTIPLIER, EDGE_THRESHOLD };
