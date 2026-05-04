'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useKelly } from '../../hooks/useKelly';
import { fetchMockPredictions, type PredictionRecord } from '../../lib/predictionService';
import type { KellyResult } from '../../types';

function EdgeFeedCard({ prediction }: { prediction: PredictionRecord }) {
  const { calculateEdge } = useKelly();
  const [kelly, setKelly] = useState<KellyResult | null>(null);

  useEffect(() => {
    void calculateEdge({ probability: prediction.modelProbability, odds: prediction.marketOdds }).then(setKelly);
  }, [calculateEdge, prediction.marketOdds, prediction.modelProbability]);

  if (!kelly) {
    return <article className="rounded-2xl border border-slate-700 bg-slate-800 p-4">Calculating…</article>;
  }

  return (
    <article className="rounded-2xl border border-slate-700 bg-slate-800 p-4 shadow-lg shadow-slate-950/40">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-300">{prediction.market}</p>
      <h3 className="mt-1 text-base font-semibold text-slate-50">{prediction.eventLabel}</h3>
      <p className="mt-1 text-xs text-slate-300">{new Date(prediction.startsAt).toLocaleString()}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
        <div className="rounded-lg border border-slate-600 bg-slate-900 p-3"><p className="text-[11px] uppercase tracking-wide text-slate-400">Edge</p><p className="mt-1 text-2xl font-extrabold text-cyan-300">{(kelly.edge * 100).toFixed(2)}%</p></div>
        <div className="rounded-lg border border-slate-600 bg-slate-900 p-3"><p className="text-[11px] uppercase tracking-wide text-slate-400">Kelly</p><p className="mt-1 text-2xl font-extrabold text-emerald-300">{(kelly.fraction * 100).toFixed(2)}%</p></div>
      </div>
    </article>
  );
}

export function EdgeFeed() {
  const { data = [], isLoading } = useQuery({ queryKey: ['predictions', 'edge-feed'], queryFn: fetchMockPredictions });
  if (isLoading) return <p className="text-sm text-slate-300">Loading edge feed…</p>;
  return <section aria-label="Edge feed" className="grid grid-cols-1 gap-3 sm:gap-4">{data.map((prediction) => <EdgeFeedCard key={prediction.id} prediction={prediction} />)}</section>;
}
