import Link from 'next/link';

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-12 text-slate-900 dark:text-slate-100"
    >
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between text-sm">
        <p>&copy; {new Date().getFullYear()} Fukumaru</p>
        <Link href="/sitemap.xml" className="text-slate-500 dark:text-slate-400 hover:underline">
          Sitemap
        </Link>
      </div>
    </footer>
  );
}
