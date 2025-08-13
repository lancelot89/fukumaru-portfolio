import Link from 'next/link';
import { siteConfig } from '@/lib/site.config';

export const metadata = {
  title: 'お問い合わせ'
};

export default function ContactPage() {
  // v1: メールリンクのみ
  const mailto = `mailto:${siteConfig.email}`;
  return (
    <section aria-labelledby="contact-title" className="space-y-6">
      <h1 id="contact-title" className="text-3xl font-semibold">お問い合わせ</h1>
      <p>ご相談・お問い合わせは以下のメールアドレスへお願いいたします。</p>
      <Link href={mailto} className="inline-block px-4 py-2 rounded bg-brand text-white hover:opacity-90">
        メールを送る
      </Link>
    </section>
  );
}

