import type { PropsWithChildren } from 'react';

interface BadgeProps extends PropsWithChildren {
  tone?: 'neutral' | 'success' | 'warning';
}

const toneClasses = {
  neutral: 'bg-slate-700 text-slate-100',
  success: 'bg-emerald-900 text-emerald-200',
  warning: 'bg-amber-900 text-amber-200',
};

export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${toneClasses[tone]}`}>{children}</span>;
}
