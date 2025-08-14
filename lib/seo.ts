import type { Metadata } from 'next';

import { siteConfig } from './site.config';

// 既定のMetadata（全ページで共通）
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};
