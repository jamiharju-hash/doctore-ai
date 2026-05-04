'use client';

import { useCallback } from 'react';
import type { KellyApiResponse, KellyInput, KellyResult } from '../types';

export function useKelly() {
  const calculateEdge = useCallback(async (input: KellyInput): Promise<KellyResult> => {
    const response = await fetch('/api/kelly', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const payload = (await response.json()) as KellyApiResponse;

    if (!response.ok || !payload.data) {
      throw new Error(payload.error ?? 'Failed to calculate Kelly values.');
    }

    return payload.data;
  }, []);

  return { calculateEdge };
}
