'use client';
import Link from 'next/link';

import { ThemeToggle } from './ThemeToggle';

export function Header({ siteName }: { siteName: string }) {
  return (
    <header
      role="banner"
      className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
    >
      <div className="container mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {siteName}
        </Link>
        <nav aria-label="グローバル" className="flex items-center gap-4">
          <Link className="hover:underline" href="/works">
            実績
          </Link>
          <Link className="hover:underline" href="/blog">
            ブログ
          </Link>
          <Link className="hover:underline" href="/about">
            自己紹介
          </Link>
          <Link className="hover:underline" href="/contact">
            お問い合わせ
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
