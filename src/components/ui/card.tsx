import * as React from 'react';

import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  ariaLabel?: string;
}

export function Card({ title, ariaLabel, className, children, ...props }: CardProps) {
  return (
    <article
      aria-label={ariaLabel ?? title}
      className={cn('rounded-xl border border-navy-700 bg-navy-800 p-5 shadow-sm', className)}
      {...props}
    >
      {title ? <h3 className="mb-3 text-lg font-semibold text-slate-100">{title}</h3> : null}
      {children}
    </article>
  );
}
