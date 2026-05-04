import type { KellyInput, KellyResult } from '../../types';

export const DEFAULT_MULTIPLIER = 0.25;
export const EDGE_THRESHOLD = 0.025;

const isFinitePositiveNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;

const isProbability = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 && value < 1;

export function calculateKelly(input: KellyInput): KellyResult {
  const { probability, odds, multiplier = DEFAULT_MULTIPLIER } = input;
  const warnings: string[] = [];

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
  const edge = probability - 1 / odds;
  const isPositiveEV = edge > 0;

  if (!isPositiveEV) {
    warnings.push('Negative EV detected. Stake clamped to zero.');
  }

  const fraction = Math.max(0, baseFraction * multiplier);

  return {
    fraction,
    edge,
    shouldBet: isPositiveEV && edge > EDGE_THRESHOLD,
    multiplier,
    isPositiveEV,
    warnings,
  };
}
