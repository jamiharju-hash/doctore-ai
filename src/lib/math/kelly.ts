export const calculateKellyFraction = ({
  probability,
  decimalOdds
}: {
  probability: number;
  decimalOdds: number;
}): number => {
  const b = decimalOdds - 1;

  if (b <= 0) {
    return 0;
  }

  const kelly = (probability * decimalOdds - 1) / b;
  return Math.max(0, kelly);
};
