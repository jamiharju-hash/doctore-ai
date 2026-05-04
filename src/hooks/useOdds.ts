export function useOdds() {
  return {
    normalizeDecimalOdds: (odds: number) => Math.max(1.01, odds)
  };
}
