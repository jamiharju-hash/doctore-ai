import { calculateKellySizing, isFinitePositive, isProbability, roundFinancial } from './math';
import type { DecisionAuditEntry, DecisionInput, DecisionOutput, DecisionReason } from './types';

const buildAudit = (
  code: DecisionReason,
  message: string,
  value?: number | string | boolean
): DecisionAuditEntry => ({ code, message, value });

const reject = (
  input: DecisionInput,
  reason: DecisionReason,
  message: string,
  value?: number | string | boolean
): DecisionOutput => ({
  decisionId: input.decisionId,
  decision: 'REJECT',
  reasons: [reason],
  stake: 0,
  currency: input.bankroll.currency,
  impliedProbability: 0,
  edgePct: 0,
  expectedValuePct: 0,
  fullKellyPct: 0,
  fractionalKellyPct: 0,
  uncappedStake: 0,
  cappedStake: 0,
  constraints: {
    maxStakeAmount: 0,
    maxExposureAmount: 0,
    currentExposureAmount: 0,
    remainingExposureAmount: 0,
    minStakeAmount: input.bankroll.minStake ?? 0
  },
  audit: [buildAudit(reason, message, value)]
});

const resolveDecision = (reasons: DecisionReason[]): 'ACCEPT' | 'REJECT' | 'WAIT' => {
  if (reasons.length === 0) return 'ACCEPT';
  if (reasons.length === 1 && reasons[0] === 'MARKET_NOT_APPROVED') return 'WAIT';
  return 'REJECT';
};

export const evaluateDecision = (input: DecisionInput): DecisionOutput => {
  const bankroll = input.bankroll;
  const minStakeAmount = bankroll.minStake ?? 0;

  if (!isFinitePositive(bankroll.available)) {
    return reject(input, 'INVALID_BANKROLL', 'Available bankroll must be greater than 0.', bankroll.available);
  }

  if (bankroll.reservedExposure < 0 || bankroll.openExposure < 0) {
    return reject(input, 'INVALID_BANKROLL', 'Exposure values cannot be negative.');
  }

  if (!isFinitePositive(bankroll.maxStakePct) || bankroll.maxStakePct > 1) {
    return reject(input, 'INVALID_BANKROLL', 'Max stake percentage must be between 0 and 1.', bankroll.maxStakePct);
  }

  if (!isFinitePositive(bankroll.maxExposurePct) || bankroll.maxExposurePct > 1) {
    return reject(input, 'INVALID_BANKROLL', 'Max exposure percentage must be between 0 and 1.', bankroll.maxExposurePct);
  }

  if (!isFinitePositive(bankroll.kellyFraction) || bankroll.kellyFraction > 1) {
    return reject(input, 'INVALID_BANKROLL', 'Kelly fraction must be between 0 and 1.', bankroll.kellyFraction);
  }

  if (!Number.isFinite(bankroll.minEdgePct) || bankroll.minEdgePct < 0) {
    return reject(input, 'INVALID_BANKROLL', 'Minimum edge percentage cannot be negative.', bankroll.minEdgePct);
  }

  if (!isProbability(input.probability.modelProbability)) {
    return reject(
      input,
      'INVALID_PROBABILITY',
      'Model probability must be between 0 and 1.',
      input.probability.modelProbability
    );
  }

  if (!isFinitePositive(input.market.decimalOdds) || input.market.decimalOdds <= 1) {
    return reject(input, 'INVALID_ODDS', 'Decimal odds must be greater than 1.', input.market.decimalOdds);
  }

  const maxExposureAmount = roundFinancial(bankroll.available * bankroll.maxExposurePct);
  const currentExposureAmount = roundFinancial(bankroll.reservedExposure + bankroll.openExposure);
  const remainingExposureAmount = roundFinancial(Math.max(0, maxExposureAmount - currentExposureAmount));

  const sizing = calculateKellySizing({
    bankroll: bankroll.available,
    decimalOdds: input.market.decimalOdds,
    modelProbability: input.probability.modelProbability,
    kellyFraction: bankroll.kellyFraction,
    maxStakePct: bankroll.maxStakePct,
    remainingExposure: remainingExposureAmount
  });

  const constraints = {
    maxStakeAmount: sizing.maxStakeAmount,
    maxExposureAmount,
    currentExposureAmount,
    remainingExposureAmount,
    minStakeAmount
  };

  const audit: DecisionAuditEntry[] = [
    buildAudit('EVALUATED', 'Decision engine evaluated canonical inputs.', input.decisionId)
  ];

  const reasons: DecisionReason[] = [];

  if (!input.approval.isApproved) {
    reasons.push('MARKET_NOT_APPROVED');
    audit.push(buildAudit('MARKET_NOT_APPROVED', input.approval.reason ?? 'Market profile is not approved.'));
  }

  if (sizing.edgePct <= 0) {
    reasons.push('NEGATIVE_OR_ZERO_EDGE');
    audit.push(buildAudit('NEGATIVE_OR_ZERO_EDGE', 'Model edge is not positive.', sizing.edgePct));
  }

  if (sizing.edgePct > 0 && sizing.edgePct < bankroll.minEdgePct) {
    reasons.push('EDGE_BELOW_THRESHOLD');
    audit.push(buildAudit('EDGE_BELOW_THRESHOLD', 'Model edge is below configured threshold.', sizing.edgePct));
  }

  if (sizing.fullKellyPct <= 0 || sizing.fractionalKellyPct <= 0) {
    reasons.push('KELLY_ZERO');
    audit.push(buildAudit('KELLY_ZERO', 'Kelly sizing produced a zero allocation.', sizing.fractionalKellyPct));
  }

  if (remainingExposureAmount <= 0) {
    reasons.push('EXPOSURE_CAP_REACHED');
    audit.push(buildAudit('EXPOSURE_CAP_REACHED', 'Remaining exposure capacity is zero.', remainingExposureAmount));
  }

  if (sizing.cappedStake <= 0) {
    reasons.push('NO_AVAILABLE_BANKROLL');
    audit.push(buildAudit('NO_AVAILABLE_BANKROLL', 'No stake remains after bankroll and exposure caps.', sizing.cappedStake));
  }

  if (minStakeAmount > 0 && sizing.cappedStake > 0 && sizing.cappedStake < minStakeAmount) {
    reasons.push('STAKE_BELOW_MINIMUM');
    audit.push(buildAudit('STAKE_BELOW_MINIMUM', 'Calculated stake is below minimum stake.', sizing.cappedStake));
  }

  const decision = resolveDecision(reasons);

  if (decision === 'ACCEPT') {
    audit.push(buildAudit('ACCEPTED', 'All risk, edge, Kelly, exposure, and market approval checks passed.', true));
  }

  return {
    decisionId: input.decisionId,
    decision,
    reasons: decision === 'ACCEPT' ? ['ACCEPTED'] : reasons,
    stake: decision === 'ACCEPT' ? sizing.cappedStake : 0,
    currency: bankroll.currency,
    impliedProbability: sizing.impliedProbability,
    edgePct: sizing.edgePct,
    expectedValuePct: sizing.expectedValuePct,
    fullKellyPct: sizing.fullKellyPct,
    fractionalKellyPct: sizing.fractionalKellyPct,
    uncappedStake: sizing.uncappedStake,
    cappedStake: sizing.cappedStake,
    constraints,
    audit
  };
};
