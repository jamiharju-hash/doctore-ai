export type AppAuthErrorCode =
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'INVALID_CLAIMS'
  | 'AUTH_PROVIDER_ERROR';

export class AppAuthError extends Error {
  readonly code: AppAuthErrorCode;
  readonly statusCode: number;

  constructor(params: {
    code: AppAuthErrorCode;
    message: string;
    statusCode: number;
  }) {
    super(params.message);
    this.name = 'AppAuthError';
    this.code = params.code;
    this.statusCode = params.statusCode;
  }
}

export function createUnauthorizedError(
  message = 'Authentication is required.',
): AppAuthError {
  return new AppAuthError({
    code: 'UNAUTHORIZED',
    message,
    statusCode: 401,
  });
}

export function createForbiddenError(
  message = 'Access is forbidden.',
): AppAuthError {
  return new AppAuthError({
    code: 'FORBIDDEN',
    message,
    statusCode: 403,
  });
}

export function createInvalidClaimsError(
  message = 'Session claims are invalid.',
): AppAuthError {
  return new AppAuthError({
    code: 'INVALID_CLAIMS',
    message,
    statusCode: 403,
  });
}

export function createAuthProviderError(
  message = 'Authentication provider failed.',
): AppAuthError {
  return new AppAuthError({
    code: 'AUTH_PROVIDER_ERROR',
    message,
    statusCode: 500,
  });
}
