export const calculateExpectedValue = ({
  probability,
  decimalOdds,
  stake = 1
}: {
  probability: number;
  decimalOdds: number;
  stake?: number;
}): number => {
  const winProfit = (decimalOdds - 1) * stake;
  const loseLoss = stake;

  return probability * winProfit - (1 - probability) * loseLoss;
};
