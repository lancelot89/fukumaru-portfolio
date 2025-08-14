# Fukumaru Portfolio

Go × GCP を軸にしたフリーランスエンジニア **Fukumaru** のポートフォリオサイトです。
Next.js（App Router）+ TypeScript + Tailwind CSS を使用し、Core Web Vitals と a11y を重視した構成です。

![og-image](./public/og-sample.png)

---

## 🚀 プロジェクト概要

- **フロントエンド**: Next.js（App Router）+ TypeScript
- **スタイル**: Tailwind CSS（darkMode: 'class'）
- **UI/アイコン**: shadcn/ui 互換（Button/Card 先行導入） / lucide-react
- **OG画像生成**: `/api/og`（v1は next/og、後日 Satori + Resvg へ）
- **内容管理**: `content/blog/*.mdx`, `content/works/*.mdx`（frontmatterベース）
- **品質**: ESLint / Prettier / Stylelint / Vitest / Testing Library / Husky + lint-staged

---

## 📂 ディレクトリ構成

```
.
├─ app/                # ページ・APIルート
│  ├─ api/og/route.ts  # OG画像生成API
│  ├─ layout.tsx       # 共通レイアウト
│  └─ page.tsx         # トップページ
├─ components/ui/      # shadcn/ui 互換のUIコンポーネント
│  ├─ button.tsx
│  └─ card.tsx
├─ public/             # 画像・PDFなど静的ファイル
├─ app/globals.css     # グローバルCSS
├─ tailwind.config.ts  # Tailwind設定
├─ package.json        # 依存パッケージ
└─ ...
```

---

## 🖼 OG画像自動生成

`/api/og` エンドポイントで動的にOG画像を生成します（v1は next/og を使用）。

**例:**

```
/api/og?title=SendTrack&subtitle=Bouldering%20Logger&theme=light
```

クエリパラメータ：

- `title`: メインタイトル
- `subtitle`: サブタイトル
- `theme`: `dark` または `light`

---

## 🛠 セットアップ / 開発 / 品質チェック

```bash
# 依存インストール（初回のみ）
corepack enable && corepack prepare pnpm@latest --activate
pnpm install

# 開発サーバ
pnpm dev

# Lint / TypeCheck / Test
pnpm lint
pnpm typecheck
pnpm test

# 本番ビルド
pnpm build && pnpm start

補足（standalone 出力時の起動）:
- `next.config.mjs` で `output: 'standalone'` を使用しているため、`pnpm start` 警告が出る場合は以下で起動できます。

```

pnpm serve

# or

node .next/standalone/server.js

```

```

Gitフック（pre-commit）は `pnpm prepare` 実行時に有効化され、`lint-staged` で変更ファイルに ESLint/Prettier を適用します。

### Stylelint（最小構成について）

- ネットワーク制限環境に合わせ、`stylelint.config.cjs` は最小構成（拡張なし、ルール空）にしています。
- CI では `pnpm stylelint` を実行します（設定が最小のため現状は実質フォーマット検査のみ）。
- 将来、ネットワーク許可時は次の構成へ移行可能です。

例: 推奨構成（将来）

```
// stylelint.config.cjs
module.exports = {
  extends: [
    'stylelint-config-recommended',
    // 余裕があれば 'stylelint-config-standard' も
    'stylelint-config-prettier'
  ],
  // Tailwind の @tailwind を許可
  rules: { 'at-rule-no-unknown': null }
};
```

注: v16 以降で従来の整形系ルールは `@stylistic/stylelint-plugin` に分離されています。導入時は併用を検討してください。

### Tailwind CSS v4 メモ

- PostCSS プラグインは `tailwindcss` ではなく `@tailwindcss/postcss` を使用します（`postcss.config.cjs` を参照）。
- グローバルCSSは `@tailwind base/components/utilities` ではなく `@import "tailwindcss";` を利用しています（`app/globals.css`）。
- 既定の背景/文字色は `app/layout.tsx` の `<body>` に付与したクラスで制御しています。
- 参考: Tailwind v4 では従来の一部設定/プラグインが変更されています。必要に応じて公式ドキュメントを参照してください。

### Next.js 15 型メモ（App Router）

- `generateMetadata` やページコンポーネントの `PageProps` において、`params` が Promise 互換の型になるケースがあります。
- 本プロジェクトでは `[slug]` ページに合わせて `generateMetadata` を `async` 化し、`const { slug } = await params;` で扱っています。

## 🐳 デプロイ（Docker / Caddy, 後日追加）

### ローカル/本番起動（Caddyリバースプロキシ）

```bash
# 初回: 環境変数テンプレートをコピーして編集
cp .env.example .env
# .env を編集し、DOMAIN / ACME_EMAIL / NEXT_PUBLIC_* を実値に

docker compose up -d --build
```

ブラウザで `https://your-domain.dev`（`.env` の `DOMAIN` に合わせる）

### GitHub Actions でのCI/CD

- `push`/`PR`で lint / typecheck / test / build を実行
- `main`ブランチに対して Docker イメージを `ghcr.io/<user>/<repo>:latest` に push

### Ugreen NAS での更新手順

```bash
docker compose pull
docker compose up -d
```

補足:

- `Caddyfile` は `email {$ACME_EMAIL}` と `{$DOMAIN}` を参照します。`.env` に設定すれば compose が自動で注入します。
- `NEXT_PUBLIC_SITE_URL` は sitemap と OGP のベースURLとして使われます。

---

## 🔧 環境変数

アプリ設定（Next.js, `app` サイド）:

```
# サイト基本情報
NEXT_PUBLIC_SITE_NAME=Fukumaru Portfolio
NEXT_PUBLIC_SITE_URL=https://your-domain.dev
NEXT_PUBLIC_CONTACT_EMAIL=you@example.com

# SNS リンク
NEXT_PUBLIC_SOCIAL_X=https://x.com/your_handle
NEXT_PUBLIC_SOCIAL_GITHUB=https://github.com/your_handle
NEXT_PUBLIC_SOCIAL_LINKEDIN=https://www.linkedin.com/in/your_handle/
```

プロキシ設定（Caddy, `proxy` サイド）: docker-compose から渡されます。

```
# 自動証明書用 ACME メール
ACME_EMAIL=you@example.com

# 運用ドメイン（例: example.com または sub.example.com）
DOMAIN=your-domain.dev
```

`.env` に上記を保存し、`docker compose` は自動で参照します。

## 🈺 日本語フォント（OG画像）

`/api/og` の日本語描画品質を上げるため、以下を `public/fonts/` に配置してください。

```
public/fonts/NotoSansJP-Regular.ttf
public/fonts/NotoSansJP-Bold.ttf
```

ファイルが存在すれば自動で読み込まれます（未配置でもフォールバックで動作）。

---

## 📄 ライセンス

このリポジトリは MIT ライセンスの下で公開されています。
商用利用・改変は自由ですが、著作権表示を残してください。

---

## 📬 お問い合わせ

- **ポートフォリオサイト**: [https://your-domain.dev](https://your-domain.dev)
- **GitHub**: [https://github.com/your-username](https://github.com/your-username)
- **X (Twitter)**: [https://x.com/your-handle](https://x.com/your-handle)
- **Email**: [you@example.com](mailto:you@example.com)
