import Link from 'next/link';
import { getLatest } from '@/lib/content';

export default function HomePage() {
  const latestWorks = getLatest('works', 3);
  const latestPosts = getLatest('blog', 3);

  return (
    <div className="space-y-12">
      {/* ヒーロー */}
      <section aria-labelledby="hero-title" className="text-center py-8">
        <h1 id="hero-title" className="text-4xl md:text-5xl font-bold tracking-tight">
          Go × GCP フリーランス
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          実績と技術ブログを通じて、問題解決力を発信します。
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Link href="/works" className="px-4 py-2 rounded bg-brand text-white hover:opacity-90">
            実績を見る
          </Link>
          <Link href="/contact" className="px-4 py-2 rounded border border-slate-300 dark:border-slate-700">
            お問い合わせ
          </Link>
        </div>
      </section>

      {/* 最新の実績 */}
      <section aria-labelledby="works-title" className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 id="works-title" className="text-2xl font-semibold">最新の実績</h2>
          <Link className="text-brand hover:underline" href="/works">もっと見る</Link>
        </div>
        <ul className="grid md:grid-cols-3 gap-4">
          {latestWorks.map((w) => (
            <li key={w.slug} className="rounded border p-4">
              <h3 className="font-medium">{w.title}</h3>
              <p className="text-sm text-slate-500">{new Date(w.date).toLocaleDateString('ja-JP')}</p>
              <p className="mt-1 text-sm line-clamp-2">{w.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 最新のブログ */}
      <section aria-labelledby="blog-title" className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 id="blog-title" className="text-2xl font-semibold">最新のブログ</h2>
          <Link className="text-brand hover:underline" href="/blog">もっと見る</Link>
        </div>
        <ul className="grid md:grid-cols-3 gap-4">
          {latestPosts.map((p) => (
            <li key={p.slug} className="rounded border p-4">
              <h3 className="font-medium">{p.title}</h3>
              <p className="text-sm text-slate-500">{new Date(p.date).toLocaleDateString('ja-JP')}</p>
              <p className="mt-1 text-sm line-clamp-2">{p.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

