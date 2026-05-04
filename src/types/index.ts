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
  isPositiveEV: boolean;
  warnings: string[];
}

export interface KellyApiResponse {
  data?: KellyResult;
  error?: string;
}
