# Fukumaru Portfolio

Go × GCP を軸にしたフリーランスエンジニア **Fukumaru** のポートフォリオサイトです。
Next.js（App Router）+ TypeScript + Tailwind CSS を使用し、Core Web Vitals と a11y を重視した構成です。

![og-image](./public/og-sample.png)

---

## 🚀 プロジェクト概要

* **フロントエンド**: Next.js（App Router）+ TypeScript
* **スタイル**: Tailwind CSS（darkMode: 'class'）
* **UI/アイコン**: shadcn/ui（後日導入） / lucide-react
* **OG画像生成**: `/api/og`（v1は next/og、後日 Satori + Resvg へ）
* **内容管理**: `content/blog/*.mdx`, `content/works/*.mdx`（frontmatterベース）
* **品質**: ESLint / Prettier / Stylelint / Vitest / Testing Library / Husky + lint-staged

---

## 📂 ディレクトリ構成

```
.
├─ app/                # ページ・APIルート
│  ├─ api/og/route.ts  # OG画像生成API
│  ├─ layout.tsx       # 共通レイアウト
│  └─ page.tsx         # トップページ
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

* `title`: メインタイトル
* `subtitle`: サブタイトル
* `theme`: `dark` または `light`

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
```

Gitフック（pre-commit）は `pnpm prepare` 実行時に有効化され、`lint-staged` で変更ファイルに ESLint/Prettier を適用します。

## 🐳 デプロイ（Docker / Caddy, 後日追加）
### ローカルでの起動（Caddyリバースプロキシ）
```bash
docker compose up -d --build
```

ブラウザで `https://your-domain.dev`（Caddyfileのドメインを適宜変更）

### GitHub Actions でのCI/CD
- `push`/`PR`で lint / typecheck / test / build を実行
- `main`ブランチに対して Docker イメージを `ghcr.io/<user>/<repo>:latest` に push

### Ugreen NAS での更新手順
```bash
docker compose pull
docker compose up -d
```

---

## 🔧 環境変数（任意）

本番環境でOG画像のURLを固定する場合：

```
NEXT_PUBLIC_SITE_URL=https://your-domain.dev
```

---

## 📄 ライセンス

このリポジトリは MIT ライセンスの下で公開されています。
商用利用・改変は自由ですが、著作権表示を残してください。

---

## 📬 お問い合わせ

* **ポートフォリオサイト**: [https://your-domain.dev](https://your-domain.dev)
* **GitHub**: [https://github.com/your-username](https://github.com/your-username)
* **X (Twitter)**: [https://x.com/your-handle](https://x.com/your-handle)
* **Email**: [you@example.com](mailto:you@example.com)
