import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/site.config';

// robots.txt を動的生成（サイトURLとsitemapを反映）
export default function robots(): MetadataRoute.Robots {
  const sitemap = new URL('/sitemap.xml', siteConfig.url).toString();
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    host: siteConfig.url,
    sitemap,
  };
}
