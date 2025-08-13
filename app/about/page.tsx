import Link from 'next/link';
import { siteConfig } from '@/lib/site.config';

export default function AboutPage() {
  return (
    <section aria-labelledby="about-title" className="space-y-6">
      <h1 id="about-title" className="text-3xl font-semibold">自己紹介</h1>
      <p>
        Go × GCP を軸にバックエンド/インフラを担当しています。可用性と運用性を両立する設計、パフォーマンス改善が得意です。
      </p>
      <div>
        <h2 className="text-xl font-medium">リンク</h2>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li><Link className="text-brand hover:underline" href={siteConfig.socials.x}>X</Link></li>
          <li><Link className="text-brand hover:underline" href={siteConfig.socials.github}>GitHub</Link></li>
          <li><Link className="text-brand hover:underline" href={siteConfig.socials.linkedin}>LinkedIn</Link></li>
        </ul>
      </div>
    </section>
  );
}

