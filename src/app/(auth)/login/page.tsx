import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">DOCTORE AI</p>
      <h1 className="text-3xl font-semibold text-slate-50">Access the decision system</h1>
      <p className="text-sm leading-6 text-slate-400">
        Sign in to review filtered exposure, active risk states and controlled sizing.
      </p>
      <Link className="text-sm font-medium text-emerald-500 hover:underline" href="/">
        Return to system overview
      </Link>
    </main>
  );
}
