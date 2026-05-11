import { auth, currentUser } from '@clerk/nextjs/server';

import {
  createAuthProviderError,
  createUnauthorizedError,
} from './app-auth-errors';
import { parseAppPlan, parseAppRole } from './app-access';
import type { AppUser } from './app-roles';

type ClerkPublicMetadata = {
  role?: unknown;
  plan?: unknown;
  assignedManagerId?: unknown;
};

function getAssignedManagerId(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0
    ? value
    : undefined;
}

function getPrimaryEmailAddress(params: {
  emailAddresses: Array<{ id: string; emailAddress: string }>;
  primaryEmailAddressId: string | null;
}): string | undefined {
  const primaryEmail = params.emailAddresses.find(
    (emailAddress) => emailAddress.id === params.primaryEmailAddressId,
  );

  return primaryEmail?.emailAddress;
}

export async function requireAppUser(): Promise<AppUser> {
  const session = await auth();

  if (!session.userId) {
    throw createUnauthorizedError();
  }

  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw createAuthProviderError('Authenticated user could not be loaded.');
  }

  const metadata = clerkUser.publicMetadata as ClerkPublicMetadata;

  return {
    id: session.userId,
    email: getPrimaryEmailAddress({
      emailAddresses: clerkUser.emailAddresses,
      primaryEmailAddressId: clerkUser.primaryEmailAddressId,
    }),
    role: parseAppRole(metadata.role),
    plan: parseAppPlan(metadata.plan),
    assignedManagerId: getAssignedManagerId(metadata.assignedManagerId),
  };
}
