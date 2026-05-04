import { cn } from '@/lib/utils';

type BadgeProps = {
  children: React.ReactNode;
  tone?: 'default' | 'success' | 'risk';
};

export function Badge({ children, tone = 'default' }: BadgeProps) {
  const tones = {
    default: 'bg-navy-700 text-slate-100',
    success: 'bg-emerald-500/20 text-emerald-500',
    risk: 'bg-rose-500/20 text-rose-500'
  };

  return <span className={cn('inline-flex rounded-sm px-2 py-1 text-xs font-medium', tones[tone])}>{children}</span>;
}
