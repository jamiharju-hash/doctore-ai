import { z } from 'zod';

import { linearGraphql } from './linear-client';

const LinearViewerResponseSchema = z.object({
  viewer: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email().nullable(),
  }),
});

export type LinearViewerResponse = z.infer<typeof LinearViewerResponseSchema>;

const LinearTeamSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
});

const LinearUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email().nullable(),
});

const LinearIssueSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  title: z.string(),
  priority: z.number(),
  url: z.string().url(),
  state: z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
  }),
  team: LinearTeamSchema,
  assignee: LinearUserSchema.nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
});

const LinearIssuesResponseSchema = z.object({
  issues: z.object({
    nodes: z.array(LinearIssueSchema),
    pageInfo: z.object({
      hasNextPage: z.boolean(),
      endCursor: z.string().nullable(),
    }),
  }),
});

export type LinearIssue = z.infer<typeof LinearIssueSchema>;
export type LinearIssuesResponse = z.infer<typeof LinearIssuesResponseSchema>;

export type ListLinearIssuesParams = {
  first?: number;
  after?: string;
};

export type ListLinearTeamIssuesParams = ListLinearIssuesParams & {
  teamKey: string;
};

export async function getLinearViewer(): Promise<LinearViewerResponse> {
  return linearGraphql({
    query: `
      query GetLinearViewer {
        viewer {
          id
          name
          email
        }
      }
    `,
    dataSchema: LinearViewerResponseSchema,
  });
}

export async function listLinearIssues(
  params: ListLinearIssuesParams = {},
): Promise<LinearIssuesResponse> {
  return linearGraphql({
    query: `
      query ListLinearIssues($first: Int!, $after: String) {
        issues(
          first: $first
          after: $after
          orderBy: updatedAt
        ) {
          nodes {
            id
            identifier
            title
            priority
            url
            state {
              id
              name
              type
            }
            team {
              id
              key
              name
            }
            assignee {
              id
              name
              email
            }
            updatedAt
            createdAt
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
    variables: {
      first: params.first ?? 25,
      after: params.after ?? null,
    },
    dataSchema: LinearIssuesResponseSchema,
  });
}

export async function listLinearTeamIssues(
  params: ListLinearTeamIssuesParams,
): Promise<LinearIssuesResponse> {
  return linearGraphql({
    query: `
      query ListLinearTeamIssues(
        $first: Int!
        $after: String
        $teamKey: String!
      ) {
        issues(
          first: $first
          after: $after
          filter: { team: { key: { eq: $teamKey } } }
          orderBy: updatedAt
        ) {
          nodes {
            id
            identifier
            title
            priority
            url
            state {
              id
              name
              type
            }
            team {
              id
              key
              name
            }
            assignee {
              id
              name
              email
            }
            updatedAt
            createdAt
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
    variables: {
      first: params.first ?? 25,
      after: params.after ?? null,
      teamKey: params.teamKey,
    },
    dataSchema: LinearIssuesResponseSchema,
  });
}
