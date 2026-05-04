import { cn } from '@/lib/utils';

type BadgeTone = 'default' | 'neutral' | 'success' | 'warning' | 'risk';

type BadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
};

const tones: Record<BadgeTone, string> = {
  default: 'bg-navy-700 text-slate-100',
  neutral: 'bg-slate-700 text-slate-100',
  success: 'bg-emerald-500/20 text-emerald-500',
  warning: 'bg-amber-900 text-amber-200',
  risk: 'bg-rose-500/20 text-rose-500'
};

export function Badge({ children, tone = 'default' }: BadgeProps) {
  return <span className={cn('inline-flex rounded-sm px-2 py-1 text-xs font-medium', tones[tone])}>{children}</span>;
}
