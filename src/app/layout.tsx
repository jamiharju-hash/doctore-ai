import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Doctore AI',
  description: 'Next.js 15 baseline app setup'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="bg-navy-900 text-slate-100 font-sans antialiased">{children}</body>
    </html>
  );
}
