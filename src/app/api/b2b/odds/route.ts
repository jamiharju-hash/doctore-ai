import { NextRequest, NextResponse } from 'next/server';
import { probabilityToDecimalOdds } from '@/lib/math/odds-converter';
import { ensureApiAuth } from '@/lib/supabase/server';
import { b2bOddsQuerySchema } from '@/lib/validation/schemas';

export async function GET(request: NextRequest) {
  const auth = await ensureApiAuth();
  if (auth.response) return auth.response;

  const parsed = b2bOddsQuerySchema.safeParse({
    probability: request.nextUrl.searchParams.get('probability')
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const decimalOdds = probabilityToDecimalOdds(parsed.data.probability);

  return NextResponse.json({ userId: auth.userId, decimalOdds });
}
