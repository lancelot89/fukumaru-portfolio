import { MetadataRoute } from 'next';

import { getAllContent } from '@/lib/content';
import { siteConfig } from '@/lib/site.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');
  const pages = ['/', '/about', '/blog', '/works', '/contact'].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));
  const posts = getAllContent('blog').map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));
  const works = getAllContent('works').map((w) => ({
    url: `${base}/works/${w.slug}`,
    lastModified: new Date(w.date),
  }));
  return [...pages, ...posts, ...works];
}
