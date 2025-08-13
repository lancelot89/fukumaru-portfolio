import { MDXRemote } from 'next-mdx-remote/rsc';
import type React from 'react';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import prettyCode from 'rehype-pretty-code';

// MDXをRSCでレンダリング（コードハイライト付き）
export function MDXRenderer({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkSmartypants],
          rehypePlugins: [
            [prettyCode, { theme: { dark: 'github-dark', light: 'github-light' } }]
          ]
        }
      }}
      components={{
        pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
          <pre className="overflow-auto rounded bg-slate-950/90 text-slate-50 p-4" {...props} />
        ),
        code: (props: React.HTMLAttributes<HTMLElement>) => (
          <code className="font-mono text-sm" {...props} />
        )
      }}
    />
  );
}
