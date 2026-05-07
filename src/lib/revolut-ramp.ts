import { z } from 'zod';

export const revolutRampEnvironmentSchema = z.enum(['test', 'production']);

export type RevolutRampEnvironment = z.infer<typeof revolutRampEnvironmentSchema>;

export const initiateRampTransactionSchema = z.object({
  userId: z.string().min(1).optional(),
  fiatCurrency: z.string().min(3).max(8).default('EUR'),
  fiatAmount: z.number().positive().max(100000).optional(),
  cryptoCurrency: z.string().min(2).max(16),
  walletAddress: z.string().min(10).max(256),
  redirectUrl: z.string().url().optional(),
  reference: z.string().min(1).max(128).optional(),
});

export type InitiateRampTransactionInput = z.infer<typeof initiateRampTransactionSchema>;

export type RevolutRampConfig = {
  environment: RevolutRampEnvironment;
  baseUrl: string;
  apiKey: string;
  initiatePath: string;
};

export function getRevolutRampConfig(): RevolutRampConfig {
  const environment = revolutRampEnvironmentSchema.parse(process.env.REVOLUT_RAMP_ENV ?? 'test');
  const isProduction = environment === 'production';
  const apiKey = isProduction ? process.env.REVOLUT_RAMP_PRODUCTION_API_KEY : process.env.REVOLUT_RAMP_TEST_API_KEY;
  const baseUrl = isProduction ? process.env.REVOLUT_RAMP_PRODUCTION_BASE_URL : process.env.REVOLUT_RAMP_TEST_BASE_URL;
  const initiatePath = process.env.REVOLUT_RAMP_INITIATE_PATH;

  if (!apiKey) {
    throw new Error(`Missing Revolut Ramp ${environment} API key`);
  }

  if (!baseUrl) {
    throw new Error(`Missing Revolut Ramp ${environment} base URL`);
  }

  if (!initiatePath) {
    throw new Error('Missing Revolut Ramp initiate transaction path');
  }

  return {
    environment,
    baseUrl: baseUrl.replace(/\/$/, ''),
    apiKey,
    initiatePath: initiatePath.startsWith('/') ? initiatePath : `/${initiatePath}`,
  };
}

export function assertInternalRequest(request: Request) {
  const configuredSecret = process.env.INTERNAL_API_SECRET;
  const providedSecret = request.headers.get('x-internal-secret');

  if (!configuredSecret || providedSecret !== configuredSecret) {
    throw new Error('Unauthorized');
  }
}

export async function initiateRevolutRampTransaction(input: InitiateRampTransactionInput) {
  const config = getRevolutRampConfig();
  const payload = initiateRampTransactionSchema.parse(input);
  const response = await fetch(`${config.baseUrl}${config.initiatePath}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': config.apiKey,
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const contentType = response.headers.get('content-type') ?? '';
  const body = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    return {
      ok: false as const,
      environment: config.environment,
      status: response.status,
      error: 'Revolut Ramp request failed',
      details: body,
    };
  }

  return {
    ok: true as const,
    environment: config.environment,
    status: response.status,
    data: body,
  };
}
