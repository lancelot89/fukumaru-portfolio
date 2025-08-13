"use client";
import { useMemo, useState } from 'react';
import type { ContentItem } from '@/lib/content';

// 実績一覧のクライアントフィルタ
export function WorkList({ items }: { items: ContentItem[] }) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter(
      (i) => i.title.toLowerCase().includes(t) || (i.tags ?? []).some((x) => x.toLowerCase().includes(t))
    );
  }, [q, items]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm mb-1" htmlFor="q">タグ/キーワードで検索</label>
        <input id="q" value={q} onChange={(e) => setQ(e.target.value)}
          className="w-full rounded border px-3 py-2 bg-white dark:bg-slate-900" placeholder="例: Go, GCP" />
      </div>
      <ul className="grid md:grid-cols-2 gap-4">
        {filtered.map((w) => (
          <li key={w.slug} className="rounded border p-4">
            <a href={`/works/${w.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-brand/60 rounded">
              <h3 className="font-medium">{w.title}</h3>
              <p className="text-sm text-slate-500">{new Date(w.date).toLocaleDateString('ja-JP')}</p>
              <p className="mt-1 text-sm line-clamp-2">{w.summary}</p>
              <div className="mt-2 flex gap-2 flex-wrap">
                {w.tags?.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">{t}</span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
