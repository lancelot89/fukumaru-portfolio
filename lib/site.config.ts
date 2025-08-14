// サイト共通設定（環境変数で上書き可能にする）
const {
  NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_CONTACT_EMAIL,
  NEXT_PUBLIC_SOCIAL_X,
  NEXT_PUBLIC_SOCIAL_GITHUB,
  NEXT_PUBLIC_SOCIAL_LINKEDIN,
} = process.env;

export const siteConfig = {
  // 既定名（必要に応じて env で上書き）
  name: NEXT_PUBLIC_SITE_NAME ?? 'Fukumaru Portfolio',
  description: 'Go × GCP フリーランスエンジニアのポートフォリオ',
  url: NEXT_PUBLIC_SITE_URL ?? 'https://portfolio.fukumaru.dev',
  email: NEXT_PUBLIC_CONTACT_EMAIL ?? 'wordpress@furilan-seikatsu.com',
  socials: {
    x: NEXT_PUBLIC_SOCIAL_X ?? 'https://x.com/your_handle',
    github: NEXT_PUBLIC_SOCIAL_GITHUB ?? 'https://github.com/lancelot89',
    linkedin: NEXT_PUBLIC_SOCIAL_LINKEDIN ?? 'https://www.linkedin.com/in/your_handle/',
  },
};

export type SiteConfig = typeof siteConfig;
