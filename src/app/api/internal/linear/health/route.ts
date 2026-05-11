import { NextRequest, NextResponse } from 'next/server';

import { LinearApiError } from '@/lib/server/linear/linear-client';
import { getLinearViewer } from '@/lib/server/linear/linear-queries';

type LinearHealthSuccessResponse = {
  status: 'ok';
  viewer: {
    id: string;
    name: string;
    email: string | null;
  };
};

type LinearHealthErrorCode =
  | 'INTERNAL_API_SECRET_NOT_CONFIGURED'
  | 'UNAUTHORIZED'
  | 'LINEAR_UNAVAILABLE'
  | 'UNKNOWN_ERROR';

type LinearHealthErrorResponse = {
  status: 'error';
  code: LinearHealthErrorCode;
  message: string;
};

type LinearHealthResponse =
  | LinearHealthSuccessResponse
  | LinearHealthErrorResponse;

const INTERNAL_SECRET_HEADER = 'x-internal-api-secret';

function getInternalApiSecret(): string | null {
  return process.env.INTERNAL_API_SECRET?.trim() || null;
}

function validateInternalRequest(
  request: NextRequest,
): NextResponse<LinearHealthErrorResponse> | null {
  const configuredSecret = getInternalApiSecret();

  if (!configuredSecret) {
    return NextResponse.json(
      {
        status: 'error',
        code: 'INTERNAL_API_SECRET_NOT_CONFIGURED',
        message: 'Internal API secret is not configured.',
      },
      { status: 500 },
    );
  }

  const providedSecret = request.headers.get(INTERNAL_SECRET_HEADER)?.trim();

  if (!providedSecret || providedSecret !== configuredSecret) {
    return NextResponse.json(
      {
        status: 'error',
        code: 'UNAUTHORIZED',
        message: 'Unauthorized internal request.',
      },
      { status: 401 },
    );
  }

  return null;
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<LinearHealthResponse>> {
  const authError = validateInternalRequest(request);

  if (authError) {
    return authError;
  }

  try {
    const viewer = await getLinearViewer();

    return NextResponse.json({
      status: 'ok',
      viewer: viewer.viewer,
    });
  } catch (error) {
    if (error instanceof LinearApiError) {
      return NextResponse.json(
        {
          status: 'error',
          code: 'LINEAR_UNAVAILABLE',
          message: error.message,
        },
        { status: error.statusCode ?? 502 },
      );
    }

    return NextResponse.json(
      {
        status: 'error',
        code: 'UNKNOWN_ERROR',
        message: 'Linear health check failed.',
      },
      { status: 500 },
    );
  }
}
