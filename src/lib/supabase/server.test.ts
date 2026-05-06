import { describe, expect, it } from 'vitest';

import { getSupabaseServerConfig, isSupabaseConfigured } from './server';

describe('supabase server auth config', () => {
  it('reads auth config at call time', () => {
    const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const originalAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon-key';

    expect(getSupabaseServerConfig()).toEqual({
      url: 'https://example.supabase.co',
      anonKey: 'anon-key',
    });

    process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = originalAnonKey;
  });

  it('treats missing values as unconfigured', () => {
    expect(isSupabaseConfigured({ url: '', anonKey: 'anon-key' })).toBe(false);
    expect(isSupabaseConfigured({ url: 'https://example.supabase.co', anonKey: '' })).toBe(false);
  });

  it('treats present url and anon key as configured', () => {
    expect(isSupabaseConfigured({ url: 'https://example.supabase.co', anonKey: 'anon-key' })).toBe(true);
  });
});
