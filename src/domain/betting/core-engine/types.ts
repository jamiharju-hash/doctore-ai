export type Decision = 'ACCEPT' | 'REJECT' | 'WAIT';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP';

export type DecisionReason =
  | 'MARKET_NOT_APPROVED'
  | 'INVALID_BANKROLL'
  | 'INVALID_ODDS'
  | 'INVALID_PROBABILITY'
  | 'NEGATIVE_OR_ZERO_EDGE'
  | 'EDGE_BELOW_THRESHOLD'
  | 'KELLY_ZERO'
  | 'NO_AVAILABLE_BANKROLL'
  | 'EXPOSURE_CAP_REACHED'
  | 'STAKE_BELOW_MINIMUM'
  | 'ACCEPTED';

export interface BankrollState {
  currency: CurrencyCode;
  available: number;
  reservedExposure: number;
  openExposure: number;
  maxStakePct: number;
  maxExposurePct: number;
  kellyFraction: number;
  minEdgePct: number;
  minStake?: number;
}

export interface ProbabilityInput {
  modelProbability: number;
}

export interface MarketOddsInput {
  decimalOdds: number;
  sportsbook: string;
  marketId: string;
  selectionId: string;
  capturedAt: string;
  closingDecimalOdds?: number;
}

export interface MarketApprovalState {
  isApproved: boolean;
  profileId: string;
  reason?: string;
}

export interface DecisionInput {
  decisionId: string;
  evaluatedAt: string;
  bankroll: BankrollState;
  probability: ProbabilityInput;
  market: MarketOddsInput;
  approval: MarketApprovalState;
}

export interface DecisionConstraints {
  maxStakeAmount: number;
  maxExposureAmount: number;
  currentExposureAmount: number;
  remainingExposureAmount: number;
  minStakeAmount: number;
}

export interface DecisionAuditEntry {
  code: DecisionReason;
  message: string;
  value?: number | string | boolean;
}

export interface DecisionOutput {
  decisionId: string;
  decision: Decision;
  reasons: DecisionReason[];
  stake: number;
  currency: CurrencyCode;
  impliedProbability: number;
  edgePct: number;
  expectedValuePct: number;
  fullKellyPct: number;
  fractionalKellyPct: number;
  uncappedStake: number;
  cappedStake: number;
  constraints: DecisionConstraints;
  audit: DecisionAuditEntry[];
}

export interface KellySizingInput {
  bankroll: number;
  decimalOdds: number;
  modelProbability: number;
  kellyFraction: number;
  maxStakePct: number;
  remainingExposure?: number;
}

export interface KellySizingResult {
  impliedProbability: number;
  edgePct: number;
  expectedValuePct: number;
  fullKellyPct: number;
  fractionalKellyPct: number;
  uncappedStake: number;
  cappedStake: number;
  maxStakeAmount: number;
}
