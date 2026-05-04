import { Loader2, type LucideIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-emerald-500 text-navy-900 shadow-sm shadow-emerald-950/20 hover:bg-emerald-400 active:bg-emerald-600',
  outline:
    'border border-navy-700 bg-transparent text-slate-100 hover:border-emerald-500/70 hover:bg-navy-800',
  ghost: 'text-slate-300 hover:bg-navy-800 hover:text-white active:bg-navy-700',
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'left',
      isLoading = false,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;
    const iconClasses = 'h-4 w-4 shrink-0';

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          buttonVariants[variant],
          buttonSizes[size],
          className,
        )}
        {...props}
      >
        {isLoading ? <Loader2 aria-hidden="true" className={cn(iconClasses, 'animate-spin')} /> : null}
        {!isLoading && Icon && iconPosition === 'left' ? <Icon aria-hidden="true" className={iconClasses} /> : null}
        {children ? <span>{children}</span> : null}
        {!isLoading && Icon && iconPosition === 'right' ? <Icon aria-hidden="true" className={iconClasses} /> : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
