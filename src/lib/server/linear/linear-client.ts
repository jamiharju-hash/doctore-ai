import { z } from 'zod';

const LINEAR_GRAPHQL_ENDPOINT = 'https://api.linear.app/graphql';

const LinearGraphqlErrorSchema = z
  .object({
    message: z.string(),
  })
  .passthrough();

const LinearGraphqlEnvelopeSchema = z
  .object({
    data: z.unknown().optional(),
    errors: z.array(LinearGraphqlErrorSchema).optional(),
  })
  .passthrough();

export class LinearApiError extends Error {
  readonly statusCode?: number;
  readonly graphqlErrors?: string[];

  constructor(params: {
    message: string;
    statusCode?: number;
    graphqlErrors?: string[];
  }) {
    super(params.message);
    this.name = 'LinearApiError';
    this.statusCode = params.statusCode;
    this.graphqlErrors = params.graphqlErrors;
  }
}

export type LinearGraphqlRequest<TData> = {
  query: string;
  variables?: Record<string, unknown>;
  dataSchema: z.ZodType<TData>;
  signal?: AbortSignal;
};

function getLinearApiKey(): string {
  const apiKey = process.env.LINEAR_API_KEY?.trim();

  if (!apiKey) {
    throw new LinearApiError({
      message: 'LINEAR_API_KEY is not configured',
    });
  }

  return apiKey;
}

function formatGraphqlErrors(
  errors: Array<z.infer<typeof LinearGraphqlErrorSchema>>,
): string[] {
  return errors.map((error) => error.message);
}

export async function linearGraphql<TData>({
  query,
  variables,
  dataSchema,
  signal,
}: LinearGraphqlRequest<TData>): Promise<TData> {
  const response = await fetch(LINEAR_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: getLinearApiKey(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: variables ?? {},
    }),
    cache: 'no-store',
    signal,
  });

  if (!response.ok) {
    throw new LinearApiError({
      message: `Linear API request failed with status ${response.status}`,
      statusCode: response.status,
    });
  }

  const rawPayload = await response.json();
  const envelope = LinearGraphqlEnvelopeSchema.safeParse(rawPayload);

  if (!envelope.success) {
    throw new LinearApiError({
      message: 'Linear API response envelope was invalid',
    });
  }

  if (envelope.data.errors && envelope.data.errors.length > 0) {
    const graphqlErrors = formatGraphqlErrors(envelope.data.errors);

    throw new LinearApiError({
      message: graphqlErrors.join('; '),
      graphqlErrors,
    });
  }

  const parsedData = dataSchema.safeParse(envelope.data.data);

  if (!parsedData.success) {
    throw new LinearApiError({
      message: 'Linear API response data did not match the expected schema',
    });
  }

  return parsedData.data;
}
