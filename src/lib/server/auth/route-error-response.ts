import { NextResponse } from 'next/server';

import { AppAuthError } from './app-auth-errors';

export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export function createApiErrorResponse(params: {
  code: string;
  message: string;
  status: number;
}): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      error: {
        code: params.code,
        message: params.message,
      },
    },
    { status: params.status },
  );
}

export function createAuthErrorResponse(
  error: unknown,
): NextResponse<ApiErrorResponse> {
  if (error instanceof AppAuthError) {
    return createApiErrorResponse({
      code: error.code,
      message: error.message,
      status: error.statusCode,
    });
  }

  return createApiErrorResponse({
    code: 'UNKNOWN_ERROR',
    message: 'Request failed.',
    status: 500,
  });
}
