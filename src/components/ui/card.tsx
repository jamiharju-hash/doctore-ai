import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn('rounded-lg border border-navy-700 bg-navy-800 p-5 shadow-sm', className)} {...props} />;
}
