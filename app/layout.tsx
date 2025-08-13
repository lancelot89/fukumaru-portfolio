import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import { defaultMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site.config';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { ThemeProvider } from 'next-themes';
import { SkipLink } from '@/components/site/SkipLink';

// フォント最適化（Core Web Vitals対策）
const inter = Inter({ subsets: ['latin'] , variable: '--font-inter'});
const noto = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-noto' });

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.variable} ${noto.variable} min-h-dvh bg-white dark:bg-slate-950`}> 
        {/* スキップリンク（a11y）*/}
        <SkipLink />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header siteName={siteConfig.name} />
          <main id="content" role="main" className="container mx-auto max-w-6xl px-4 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

