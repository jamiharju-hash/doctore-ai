import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-400',
    secondary: 'bg-navy-800 text-slate-100 hover:bg-navy-700 border border-navy-700',
    danger: 'bg-rose-500 text-white hover:bg-rose-400'
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
