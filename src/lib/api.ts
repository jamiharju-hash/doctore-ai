import { z } from 'zod';

export const predictionSchema = z.object({
  matchId: z.string().min(1),
  odds: z.number().positive(),
  probability: z.number().min(0).max(1)
});
