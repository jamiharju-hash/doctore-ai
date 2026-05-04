import type { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
  title?: string;
  ariaLabel?: string;
}

export function Card({ title, ariaLabel, children }: CardProps) {
  return (
    <article aria-label={ariaLabel ?? title} className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
      {title ? <h3 className="mb-3 text-lg font-semibold text-slate-100">{title}</h3> : null}
      {children}
    </article>
  );
}
