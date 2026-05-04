'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ToastTone = 'info' | 'success' | 'risk';

type ToastProps = {
  open?: boolean;
  message: string;
  tone?: ToastTone;
  role?: 'status' | 'alert';
};

export function Toast({ open = true, message, tone = 'info', role = 'status' }: ToastProps) {
  const toneClass: Record<ToastTone, string> = {
    info: 'border-blue-500 text-blue-500',
    success: 'border-emerald-500 text-emerald-500',
    risk: 'border-rose-500 text-rose-500'
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role={role}
          aria-live={role === 'alert' ? 'assertive' : 'polite'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={cn('fixed bottom-4 right-4 rounded-md border bg-navy-800 px-4 py-3 text-sm', toneClass[tone])}
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
