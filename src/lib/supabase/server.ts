import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      }
    }
  });
};

export const ensureApiAuth = async (): Promise<
  | { userId: string; response: null }
  | { userId: null; response: NextResponse }
> => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      userId: null,
      response: NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 })
    };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      userId: null,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    };
  }

  return { userId: user.id, response: null };
};
