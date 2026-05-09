import { NextRequest, NextResponse } from 'next/server';
import { calculateKelly } from '@/lib/math/kelly';
import { kellyInputSchema } from '@/lib/validation/schemas';
import type { KellyApiResponse } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const parsed = kellyInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json<KellyApiResponse>(
        { error: 'Invalid Kelly input contract.' },
        { status: 400 }
      );
    }

    const data = calculateKelly(parsed.data);

    return NextResponse.json<KellyApiResponse>({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json<KellyApiResponse>({ error: message }, { status: 400 });
  }
}
