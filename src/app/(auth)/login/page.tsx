import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-semibold">Login</h1>
      <p className="text-slate-600">Sign in with Supabase auth to access protected API routes.</p>
      <Link className="text-blue-600 hover:underline" href="/">
        Back to home
      </Link>
    </main>
  );
}
