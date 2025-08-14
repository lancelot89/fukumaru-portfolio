import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MDXRenderer } from '@/components/mdx/MDXRenderer';
import { getAllContent, getContentBySlug } from '@/lib/content';

// Next.js 15 の PageProps に合わせ、params は Promise 互換
type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllContent('works').map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = getContentBySlug('works', slug);
  if (!data) return {};
  const ogImage = `/api/og?title=${encodeURIComponent(data.meta.title)}&tag=${encodeURIComponent('Works')}`;
  return {
    title: data.meta.title,
    description: data.meta.summary,
    openGraph: {
      images: [{ url: ogImage }],
    },
    twitter: { card: 'summary_large_image', images: [ogImage] },
  };
}

export default async function WorkDetailPage({ params }: Params) {
  const { slug } = await params;
  const data = getContentBySlug('works', slug);
  if (!data) return notFound();
  const { meta, body } = data;
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <header>
        <h1 className="mb-2">{meta.title}</h1>
        <p className="mt-0 text-sm text-slate-500">
          {new Date(meta.date).toLocaleDateString('ja-JP')} ・ {meta.tags?.join(', ')}
        </p>
      </header>
      <MDXRenderer source={body} />
    </article>
  );
}
