import { z } from 'zod';

export const AppRoleSchema = z.enum([
  'admin',
  'project_manager',
  'client',
]);

export type AppRole = z.infer<typeof AppRoleSchema>;

export const AppPlanSchema = z.enum([
  'free',
  'pro',
  'sharp',
  'infra',
]);

export type AppPlan = z.infer<typeof AppPlanSchema>;

export const APP_ROLES = {
  admin: 'admin',
  projectManager: 'project_manager',
  client: 'client',
} as const satisfies Record<string, AppRole>;

export const APP_PLANS = {
  free: 'free',
  pro: 'pro',
  sharp: 'sharp',
  infra: 'infra',
} as const satisfies Record<string, AppPlan>;

export type AppAccessClaims = {
  role: AppRole;
  plan: AppPlan;
  assignedManagerId?: string;
};

export type AppUser = AppAccessClaims & {
  id: string;
  email?: string;
};

export function getRoleRank(role: AppRole): number {
  switch (role) {
    case 'client':
      return 1;
    case 'project_manager':
      return 2;
    case 'admin':
      return 3;
    default: {
      const exhaustiveCheck: never = role;
      return exhaustiveCheck;
    }
  }
}

export function getPlanRank(plan: AppPlan): number {
  switch (plan) {
    case 'free':
      return 1;
    case 'pro':
      return 2;
    case 'sharp':
      return 3;
    case 'infra':
      return 4;
    default: {
      const exhaustiveCheck: never = plan;
      return exhaustiveCheck;
    }
  }
}
