import { z } from 'zod';

export const kellyInputSchema = z.object({
  bankroll: z.number().positive(),
  decimalOdds: z.number().gt(1),
  modelProbability: z.number().gt(0).lt(1),
  kellyFraction: z.number().gt(0).lte(1).optional(),
  maxStakePct: z.number().gt(0).lte(1).optional()
});

export const betInputSchema = z.object({
  probability: z.number().gt(0).lt(1),
  decimalOdds: z.number().gt(1),
  stake: z.number().positive().default(1)
});

export const b2bOddsQuerySchema = z.object({
  probability: z.coerce.number().gt(0).lt(1)
});
