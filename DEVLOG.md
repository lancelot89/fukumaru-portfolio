## 開発ログ（Dev Log）

日付: 2025-08-13
作業者: Codex CLI エージェント

### 今日やったこと（サマリ）
- 初期構築: Next.js(App Router) + TypeScript + Tailwind をスキャフォールド
- 依存導入: ESLint/Prettier/Stylelint/Vitest/Testing Library/Husky + lint-staged
- ページ: `/` `/blog` `/works` `/about` `/contact` を実装（ランドマーク・スキップリンク対応）
- テーマ: `next-themes` でダーク/ライト切替（ヘッダーにトグル）
- コンテンツ: `content/blog/*.mdx` `content/works/*.mdx` サンプル2件ずつ追加
- MDX: next-mdx-remote(RSC) + remark-gfm + rehype-pretty-code + shiki で詳細ページを表示
- 検索/フィルタ: `/blog` `/works` のクライアントサイド簡易フィルタ
- OGP: `/api/og` を Satori + Resvg でPNG生成（ランタイム nodejs）
- SEO: 共通Metadata（`lib/seo.ts`）と `app/sitemap.ts`
- CI/CD: `.github/workflows/ci.yml` で lint/typecheck/test/build と GHCR push
- Docker/Proxy: `Dockerfile`（standalone）/ `docker-compose.yml` / `Caddyfile`
- テスト: 最小スモーク3本（Header, OGP, Content）→ 全てパス

### 決定事項
- お問い合わせは「メールリンクのみ（mailto）」
- ブランドカラー: `#2563eb`
- コードハイライト: rehype-pretty-code + shiki（ダーク/ライト切替）
- OGPは v1 から Satori + Resvg を採用（将来フォント同梱）

### 未対応/保留（次回タスク候補）
- OGPフォント: Noto Sans JP を同梱し、/api/og に組み込み（日本語描画品質向上）
- 記事/実績ごとのOG画像設定: Metadataに `openGraph.images` を自動反映
- 詳細UI拡張: `hero` 画像、GitHub/デモリンク、タグUIのアクセシビリティ強化
- shadcn/ui 導入と共通UIリファクタ（Button/Card等）
- インポート順の ESLint warning 解消（自動整形のルール強化）
- Stylelint の適用範囲再設計（Tailwind記法との相性調整）と CI 組み込み
- i18n基盤（将来英語版）の最小セット
- 運用値の適用: `lib/site.config.ts` と `Caddyfile`（ドメイン/メール）

### 変更した主なファイル
- アプリ: `app/*`（ページ一式, `api/og`）, `components/*`（Header/Footer/ThemeToggle, BlogList/WorkList, MDXRenderer）
- ライブラリ: `lib/content.ts` `lib/seo.ts` `lib/site.config.ts`
- 設定類: `package.json` `tsconfig.json` `next.config.mjs` `.eslintrc.cjs` `.prettierrc` `tailwind.config.ts` など
- CI/インフラ: `.github/workflows/ci.yml` `Dockerfile` `docker-compose.yml` `Caddyfile`
- テスト: `__tests__/*.ts(x)`

### 動作確認コマンド
- 初回/再開: `corepack enable && corepack prepare pnpm@latest --activate` → `pnpm install`
- 開発サーバ: `pnpm dev`
- 品質ゲート: `pnpm lint` / `pnpm typecheck` / `pnpm test`
- Docker + Caddy（ローカル）: `docker compose up -d --build`

### 次回開始チェックリスト
- [ ] `lib/site.config.ts` の `url/email/socials` を実値に差し替え
- [ ] `Caddyfile` のドメインと ACME メールを実値へ
- [ ] OGPに Noto Sans JP を同梱（/public/fonts など）
- [ ] 記事/実績詳細ページのOG自動生成を Metadata へ反映
- [ ] インポート順 Warning 解消（ESLint --fix / ルール調整）
- [ ] shadcn/ui の初期導入と共通UI移行

