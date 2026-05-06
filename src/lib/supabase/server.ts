import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export type SupabaseServerConfig = {
  url: string;
  anonKey: string;
};

export type EnsureApiAuthResult =
  | { userId: string; response: null }
  | { userId: null; response: NextResponse };

export function getSupabaseServerConfig(): SupabaseServerConfig {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  };
}

export function isSupabaseConfigured(config: SupabaseServerConfig = getSupabaseServerConfig()): boolean {
  return config.url.length > 0 && config.anonKey.length > 0;
}

export const createSupabaseServerClient = async (config: SupabaseServerConfig = getSupabaseServerConfig()) => {
  const cookieStore = await cookies();

  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
};

export const ensureApiAuth = async (): Promise<EnsureApiAuthResult> => {
  const config = getSupabaseServerConfig();

  if (!isSupabaseConfigured(config)) {
    return {
      userId: null,
      response: NextResponse.json({ error: 'Auth provider is not configured' }, { status: 500 }),
    };
  }

  const supabase = await createSupabaseServerClient(config);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      userId: null,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  return { userId: user.id, response: null };
};
