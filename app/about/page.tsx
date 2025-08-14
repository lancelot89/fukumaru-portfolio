import Link from 'next/link';

import { siteConfig } from '@/lib/site.config';

export default function AboutPage() {
  // 未設定のSNSは非表示にする
  const socials = [
    { label: 'X', href: siteConfig.socials.x },
    { label: 'GitHub', href: siteConfig.socials.github },
    { label: 'LinkedIn', href: siteConfig.socials.linkedin },
  ].filter((s) => Boolean(s.href));

  return (
    <section aria-labelledby="about-title" className="space-y-6">
      <h1 id="about-title" className="text-3xl font-semibold">
        自己紹介
      </h1>
      <p>
        Go × GCP
        を軸にバックエンド/インフラを担当しています。可用性と運用性を両立する設計、パフォーマンス改善が得意です。
      </p>
      {socials.length > 0 && (
        <div>
          <h2 className="text-xl font-medium">リンク</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            {socials.map((s) => (
              <li key={s.label}>
                <Link className="text-brand hover:underline" href={s.href!} aria-label={s.label}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
