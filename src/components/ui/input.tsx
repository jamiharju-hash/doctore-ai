import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-sm border border-navy-700 bg-navy-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400',
        className
      )}
      {...props}
    />
  )
);

Input.displayName = 'Input';
