import {
  createForbiddenError,
  createInvalidClaimsError,
} from './app-auth-errors';
import {
  AppPlanSchema,
  AppRoleSchema,
  getPlanRank,
  getRoleRank,
  type AppPlan,
  type AppRole,
  type AppUser,
} from './app-roles';

export function parseAppRole(value: unknown): AppRole {
  const parsed = AppRoleSchema.safeParse(value);

  if (!parsed.success) {
    throw createInvalidClaimsError('Invalid or missing user role claim.');
  }

  return parsed.data;
}

export function parseAppPlan(value: unknown): AppPlan {
  const parsed = AppPlanSchema.safeParse(value ?? 'free');

  if (!parsed.success) {
    throw createInvalidClaimsError('Invalid user plan claim.');
  }

  return parsed.data;
}

export function assertRole(user: AppUser, allowedRoles: AppRole[]): void {
  if (!allowedRoles.includes(user.role)) {
    throw createForbiddenError('User role is not allowed for this resource.');
  }
}

export function assertMinimumRole(
  user: AppUser,
  minimumRole: AppRole,
): void {
  if (getRoleRank(user.role) < getRoleRank(minimumRole)) {
    throw createForbiddenError('User role is below the required access level.');
  }
}

export function assertPlan(user: AppUser, allowedPlans: AppPlan[]): void {
  if (!allowedPlans.includes(user.plan)) {
    throw createForbiddenError('User plan is not allowed for this resource.');
  }
}

export function assertMinimumPlan(
  user: AppUser,
  minimumPlan: AppPlan,
): void {
  if (getPlanRank(user.plan) < getPlanRank(minimumPlan)) {
    throw createForbiddenError('User plan is below the required access level.');
  }
}

export function assertOwnUserResource(params: {
  user: AppUser;
  ownerUserId: string;
}): void {
  if (params.user.role === 'admin') {
    return;
  }

  if (params.user.id !== params.ownerUserId) {
    throw createForbiddenError('User cannot access another user resource.');
  }
}

export function assertAssignedClientAccess(params: {
  user: AppUser;
  clientUserId: string;
  assignedManagerId?: string;
}): void {
  if (params.user.role === 'admin') {
    return;
  }

  if (params.user.id === params.clientUserId) {
    return;
  }

  if (
    params.user.role === 'project_manager' &&
    params.assignedManagerId === params.user.id
  ) {
    return;
  }

  throw createForbiddenError('User cannot access this client resource.');
}
