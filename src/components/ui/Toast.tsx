interface ToastProps {
  message: string;
  role?: 'status' | 'alert';
}

export function Toast({ message, role = 'status' }: ToastProps) {
  return (
    <div
      role={role}
      aria-live={role === 'alert' ? 'assertive' : 'polite'}
      className="rounded-md border border-emerald-700 bg-emerald-900/70 px-3 py-2 text-sm text-emerald-100"
      tabIndex={0}
    >
      {message}
    </div>
  );
}
