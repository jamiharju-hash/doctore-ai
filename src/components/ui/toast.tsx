'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ToastProps = {
  open: boolean;
  message: string;
  tone?: 'info' | 'success' | 'risk';
};

export function Toast({ open, message, tone = 'info' }: ToastProps) {
  const toneClass = {
    info: 'border-blue-500 text-blue-500',
    success: 'border-emerald-500 text-emerald-500',
    risk: 'border-rose-500 text-rose-500'
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="status"
          aria-live="polite"
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
