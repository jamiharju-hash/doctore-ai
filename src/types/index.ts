export type OddsFormat = "decimal" | "american" | "fractional";

export type BetStatus = "PENDING" | "WON" | "LOST" | "VOID" | "CASHED_OUT";

export type CurrencyCode = "USD" | "EUR" | "GBP";

export type EdgeQuality = "negative" | "thin" | "playable" | "premium";

export interface KellyInput {
  bankroll: number;
  decimalOdds: number;
  modelProbability: number;
  kellyFraction?: number;
  maxStakePct?: number;
}

export interface KellyResult {
  impliedProbability: number;
  edge: number;
  expectedValuePct: number;
  fullKellyPct: number;
  fractionalKellyPct: number;
  recommendedStake: number;
  cappedStake: number;
  isBettable: boolean;
  warnings: string[];
}

export interface KellyApiResponse {
  data?: KellyResult;
  error?: string;
}

export interface ExpectedValueInput {
  modelProbability: number;
  decimalOdds: number;
  stake?: number;
}

export interface ExpectedValueResult {
  impliedProbability: number;
  edge: number;
  expectedProfit: number;
  expectedValuePct: number;
  quality: EdgeQuality;
}

export interface OddsQuote {
  sportsbook: string;
  market: string;
  selection: string;
  decimalOdds: number;
  limit?: number;
  updatedAt: string;
}

export interface BettingEdge {
  id: string;
  sport: string;
  league: string;
  eventName: string;
  market: string;
  selection: string;
  decimalOdds: number;
  modelProbability: number;
  impliedProbability: number;
  edge: number;
  expectedValuePct: number;
  recommendedStake: number;
  commenceAt: string;
}

export interface BankrollPoint {
  date: string;
  bankroll: number;
  pnl: number;
}

export interface BetRecord {
  id: string;
  eventName: string;
  market: string;
  selection: string;
  stake: number;
  decimalOdds: number;
  modelProbability: number;
  expectedValuePct: number;
  status: BetStatus;
  placedAt: string;
}
