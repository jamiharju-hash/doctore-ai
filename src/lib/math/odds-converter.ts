export const probabilityToDecimalOdds = (probability: number): number => {
  if (probability <= 0) {
    return Number.POSITIVE_INFINITY;
  }

  return 1 / probability;
};

export const decimalOddsToProbability = (decimalOdds: number): number => {
  if (decimalOdds <= 0) {
    return 0;
  }

  return 1 / decimalOdds;
};
