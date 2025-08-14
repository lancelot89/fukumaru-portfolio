import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MDXRenderer } from '@/components/mdx/MDXRenderer';
import { getAllContent, getContentBySlug } from '@/lib/content';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getAllContent('blog').map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const data = getContentBySlug('blog', params.slug);
  if (!data) return {};
  const ogImage = `/api/og?title=${encodeURIComponent(data.meta.title)}&tag=${encodeURIComponent('Blog')}`;
  return {
    title: data.meta.title,
    description: data.meta.summary,
    openGraph: {
      images: [{ url: ogImage }],
    },
    twitter: { card: 'summary_large_image', images: [ogImage] },
  };
}

export default function BlogDetailPage({ params }: Params) {
  const data = getContentBySlug('blog', params.slug);
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
