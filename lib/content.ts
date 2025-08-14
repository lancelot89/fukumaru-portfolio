import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';

// MDXフロントマターの型
export type ContentMeta = {
  title: string;
  date: string; // ISO文字列
  tags?: string[];
  summary?: string;
  hero?: string;
};

export type ContentItem = ContentMeta & {
  slug: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readDirSafe(dir: string) {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

export function getAllContent(kind: 'blog' | 'works'): ContentItem[] {
  const dir = path.join(CONTENT_DIR, kind);
  const files = readDirSafe(dir).filter((f) => f.endsWith('.mdx'));
  const items = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const full = path.join(dir, file);
    const raw = fs.readFileSync(full, 'utf8');
    const { data } = matter(raw);
    const meta = data as Partial<ContentMeta>;
    return {
      slug,
      title: meta.title ?? slug,
      date: meta.date ?? '1970-01-01',
      tags: meta.tags ?? [],
      summary: meta.summary ?? '',
      hero: meta.hero ?? '',
    } satisfies ContentItem;
  });
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatest(kind: 'blog' | 'works', limit = 3): ContentItem[] {
  return getAllContent(kind).slice(0, limit);
}

export function getContentBySlug(
  kind: 'blog' | 'works',
  slug: string,
): { meta: ContentItem; body: string } | null {
  const full = path.join(CONTENT_DIR, kind, `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, 'utf8');
  const { data, content } = matter(raw);
  const metaPartial = data as Partial<ContentMeta>;
  const meta: ContentItem = {
    slug,
    title: metaPartial.title ?? slug,
    date: metaPartial.date ?? '1970-01-01',
    tags: metaPartial.tags ?? [],
    summary: metaPartial.summary ?? '',
    hero: metaPartial.hero ?? '',
  };
  return { meta, body: content };
}
