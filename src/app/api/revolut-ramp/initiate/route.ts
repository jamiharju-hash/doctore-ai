import { NextResponse } from 'next/server';
import {
  assertInternalRequest,
  initiateRampTransactionSchema,
  initiateRevolutRampTransaction,
} from '@/lib/revolut-ramp';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    assertInternalRequest(request);

    const json = await request.json();
    const payload = initiateRampTransactionSchema.parse(json);
    const result = await initiateRevolutRampTransaction(payload);

    if (!result.ok) {
      return NextResponse.json(result, { status: result.status });
    }

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const status = message === 'Unauthorized' ? 401 : 400;

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status },
    );
  }
}
