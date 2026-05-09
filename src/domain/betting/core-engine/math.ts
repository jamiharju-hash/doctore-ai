import type { KellySizingInput, KellySizingResult } from './types';

const DECIMAL_PRECISION = 6;

export const roundFinancial = (value: number): number =>
  Number.parseFloat(value.toFixed(DECIMAL_PRECISION));

export const isFinitePositive = (value: number): boolean =>
  Number.isFinite(value) && value > 0;

export const isProbability = (value: number): boolean =>
  Number.isFinite(value) && value > 0 && value < 1;

export const calculateImpliedProbability = (decimalOdds: number): number => {
  if (!isFinitePositive(decimalOdds) || decimalOdds <= 1) {
    throw new Error('Decimal odds must be greater than 1.');
  }

  return roundFinancial(1 / decimalOdds);
};

export const calculateEdgePct = (modelProbability: number, decimalOdds: number): number => {
  if (!isProbability(modelProbability)) {
    throw new Error('Model probability must be between 0 and 1.');
  }

  return roundFinancial(modelProbability - calculateImpliedProbability(decimalOdds));
};

export const calculateExpectedValuePct = (
  modelProbability: number,
  decimalOdds: number
): number => {
  if (!isProbability(modelProbability)) {
    throw new Error('Model probability must be between 0 and 1.');
  }

  if (!isFinitePositive(decimalOdds) || decimalOdds <= 1) {
    throw new Error('Decimal odds must be greater than 1.');
  }

  return roundFinancial(modelProbability * decimalOdds - 1);
};

export const calculateKellySizing = (input: KellySizingInput): KellySizingResult => {
  const { bankroll, decimalOdds, modelProbability, kellyFraction, maxStakePct, remainingExposure } = input;

  if (!isFinitePositive(bankroll)) {
    throw new Error('Bankroll must be greater than 0.');
  }

  if (!isFinitePositive(decimalOdds) || decimalOdds <= 1) {
    throw new Error('Decimal odds must be greater than 1.');
  }

  if (!isProbability(modelProbability)) {
    throw new Error('Model probability must be between 0 and 1.');
  }

  if (!Number.isFinite(kellyFraction) || kellyFraction <= 0 || kellyFraction > 1) {
    throw new Error('Kelly fraction must be greater than 0 and less than or equal to 1.');
  }

  if (!Number.isFinite(maxStakePct) || maxStakePct <= 0 || maxStakePct > 1) {
    throw new Error('Max stake percentage must be greater than 0 and less than or equal to 1.');
  }

  if (remainingExposure !== undefined && (!Number.isFinite(remainingExposure) || remainingExposure < 0)) {
    throw new Error('Remaining exposure must be greater than or equal to 0.');
  }

  const impliedProbability = calculateImpliedProbability(decimalOdds);
  const edgePct = calculateEdgePct(modelProbability, decimalOdds);
  const expectedValuePct = calculateExpectedValuePct(modelProbability, decimalOdds);
  const netOdds = decimalOdds - 1;
  const fullKellyPct = Math.max(0, (modelProbability * decimalOdds - 1) / netOdds);
  const fractionalKellyPct = fullKellyPct * kellyFraction;
  const uncappedStake = bankroll * fractionalKellyPct;
  const maxStakeAmount = bankroll * maxStakePct;
  const cappedStake = Math.min(uncappedStake, maxStakeAmount, remainingExposure ?? Number.POSITIVE_INFINITY);

  return {
    impliedProbability,
    edgePct,
    expectedValuePct,
    fullKellyPct: roundFinancial(fullKellyPct),
    fractionalKellyPct: roundFinancial(fractionalKellyPct),
    uncappedStake: roundFinancial(uncappedStake),
    cappedStake: roundFinancial(Math.max(0, cappedStake)),
    maxStakeAmount: roundFinancial(maxStakeAmount)
  };
};
