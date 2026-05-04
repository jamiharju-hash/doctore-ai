import { z } from 'zod';

export const betSchema = z.object({
  stake: z.number().positive(),
  odds: z.number().positive()
});
