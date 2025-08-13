import Link from 'next/link';

export function Footer() {
  return (
    <footer role="contentinfo" className="border-t mt-12">
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between text-sm">
        <p>&copy; {new Date().getFullYear()} Fukumaru</p>
        <Link href="/sitemap.xml" className="text-slate-500 hover:underline">Sitemap</Link>
      </div>
    </footer>
  );
}

