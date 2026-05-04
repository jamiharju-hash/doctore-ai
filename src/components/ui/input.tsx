import * as React from 'react';
import { cn } from '@/lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, hint, ...props }, ref) => {
    if (label) {
      const inputId = id ?? props.name ?? undefined;

      return (
        <div className="flex flex-col gap-1">
          <label htmlFor={inputId} className="text-sm font-medium text-slate-100">
            {label}
          </label>
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-sm border border-navy-700 bg-navy-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400',
              className
            )}
            {...props}
          />
          {hint ? <p className="text-xs text-slate-400">{hint}</p> : null}
        </div>
      );
    }

    return (
      <input
        ref={ref}
        id={id}
        className={cn(
          'w-full rounded-sm border border-navy-700 bg-navy-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
