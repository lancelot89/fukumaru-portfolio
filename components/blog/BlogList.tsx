'use client';
import { useMemo, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ContentItem } from '@/lib/content';

// ブログ一覧のクライアントフィルタ
export function BlogList({ items }: { items: ContentItem[] }) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter(
      (i) =>
        i.title.toLowerCase().includes(t) ||
        (i.tags ?? []).some((x) => x.toLowerCase().includes(t)),
    );
  }, [q, items]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm mb-1" htmlFor="q">
          タグ/キーワードで検索
        </label>
        <input
          id="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded border border-slate-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          placeholder="例: GCP, Go"
        />
      </div>
      {/* 検索結果数をスクリーンリーダーに通知 */}
      <p aria-live="polite" className="sr-only">
        検索結果: {filtered.length}件
      </p>
      <ul className="grid md:grid-cols-2 gap-4" aria-live="polite">
        {filtered.map((p) => (
          <li key={p.slug}>
            <a
              href={`/blog/${p.slug}`}
              className="block focus:outline-none focus:ring-2 focus:ring-brand/60 rounded"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{p.title}</CardTitle>
                  <p className="text-sm text-slate-500">
                    {new Date(p.date).toLocaleDateString('ja-JP')}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="mt-1 text-sm line-clamp-2">{p.summary}</p>
                  {/* タグはリストで意味付けし、名前を付ける */}
                  <ul aria-label="タグ一覧" className="mt-2 flex gap-2 flex-wrap list-none p-0 m-0">
                    {p.tags?.map((t) => (
                      <li key={t} className="m-0 p-0">
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                          {t}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
