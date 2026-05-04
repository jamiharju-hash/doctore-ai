'use client';

import { useQuery } from '@tanstack/react-query';
import { useKelly } from '../../hooks/useKelly';
import { fetchMockPredictions, type PredictionRecord } from '../../lib/predictionService';

function EdgeFeedCard({ prediction }: { prediction: PredictionRecord }) {
  const kelly = useKelly({
    probability: prediction.modelProbability,
    odds: prediction.marketOdds,
  });

  return (
    <article className="rounded-2xl border border-slate-700 bg-slate-800 p-4 shadow-lg shadow-slate-950/40">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-300">{prediction.market}</p>
      <h3 className="mt-1 text-base font-semibold text-slate-50">{prediction.eventLabel}</h3>
      <p className="mt-1 text-xs text-slate-300">{new Date(prediction.startsAt).toLocaleString()}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
        <div className="rounded-lg border border-slate-600 bg-slate-900 p-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-400">Edge</p>
          <p className="mt-1 text-2xl font-extrabold text-cyan-300">{(kelly.edge * 100).toFixed(2)}%</p>
        </div>
        <div className="rounded-lg border border-slate-600 bg-slate-900 p-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-400">Kelly</p>
          <p className="mt-1 text-2xl font-extrabold text-emerald-300">{(kelly.fraction * 100).toFixed(2)}%</p>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-200">
        <div className="rounded-md bg-slate-900 px-3 py-2">
          <dt className="text-[11px] uppercase tracking-wide text-slate-400">Prob</dt>
          <dd className="text-lg font-bold text-slate-50">{(prediction.modelProbability * 100).toFixed(1)}%</dd>
        </div>
        <div className="rounded-md bg-slate-900 px-3 py-2">
          <dt className="text-[11px] uppercase tracking-wide text-slate-400">Odds</dt>
          <dd className="text-lg font-bold text-slate-50">{prediction.marketOdds.toFixed(2)}</dd>
        </div>
      </dl>
    </article>
  );
}

export function EdgeFeed() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['predictions', 'edge-feed'],
    queryFn: fetchMockPredictions,
  });

  if (isLoading) {
    return <p className="text-sm text-slate-300">Loading edge feed…</p>;
  }

  return (
    <section aria-label="Edge feed" className="grid grid-cols-1 gap-3 sm:gap-4">
      {data.map((prediction) => (
        <EdgeFeedCard key={prediction.id} prediction={prediction} />
      ))}
    </section>
  );
}
