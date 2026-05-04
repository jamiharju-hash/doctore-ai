export type KellyInput = {
  probability: number;
  odds: number;
  multiplier?: number;
};

const DEFAULT_MULTIPLIER = 0.25;
const EDGE_THRESHOLD = 0.025;

export function useKelly() {
  const calculateKellyStake = ({ probability, odds, multiplier = DEFAULT_MULTIPLIER }: KellyInput) => {
    const b = odds - 1;
    const edge = probability - 1 / odds;
    const rawKelly = b <= 0 ? 0 : ((probability * (b + 1) - 1) / b) * multiplier;

    return {
      edge,
      qualifies: edge > EDGE_THRESHOLD,
      stakeFraction: Math.max(0, rawKelly)
    };
  };

  return { calculateKellyStake, DEFAULT_MULTIPLIER, EDGE_THRESHOLD };
}
