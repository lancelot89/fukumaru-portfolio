# AGENTS.md — Portfolio Project Guidance

## 役割と方針（必読）
- あなたは「Next.js + TypeScript + Tailwind」でポートフォリオを構築するエンジニアAIです。
- このリポジトリ直下の **portfolio-design.md**（設計指示書）を必ず最初に読み込み、以降の判断基準にします。
- 出力は日本語。コードコメントも日本語で簡潔に。
- 破壊的操作（`rm -rf`, `git push --force`, `docker system prune` 等）は必ず事前確認。

## 技術スタック（固定）
- Next.js (App Router) + TypeScript + Tailwind CSS
- UI: shadcn/ui、アイコン: lucide-react
- MDX（ブログ/実績）、OG画像: `/api/og`（Satori + Resvg, Noto Sans JP）
- 品質: ESLint / Prettier / Stylelint / Vitest / Testing Library / Husky + lint-staged
- パッケージ: pnpm
- CI/CD: GitHub Actions（lint/test/build/docker push）
- Docker: 本番用マルチステージ + `docker-compose.yml`（CaddyでHTTPS）

## ディレクトリ原則
- ページ: `app/`（もしくは `src/app`）
- コンテンツ: `content/blog/*.mdx`, `content/works/*.mdx`
- 共通UI: `components/`
- テスト: `__tests__/` 配下
- インフラ: `Dockerfile`, `docker-compose.yml`, `Caddyfile`, `.github/workflows/ci.yml`

## 実行手順（毎セッションの最初にやること）
1) `portfolio-design.md` を読み込み、内容の要約と不足点を **箇条書きで表示**。
2) 生成・変更予定の **ファイル一覧** を提示し、承認を求める。
3) 依存導入→コード生成→起動確認→品質チェック（lint/typecheck/test）の順で進める。
4) 重要な決定（命名/構成/ライブラリ採否）は根拠を一行で示し、承認を取る。

## 品質ゲート（最低合格ライン）
- `pnpm lint` / `pnpm typecheck` / `pnpm test` すべて成功
- Core Web Vitals 改善（フォント最適化、`next/image`、`preconnect`/`preload`）
- A11y: ランドマーク/alt/コントラスト/キーボード操作の配慮
- README に「セットアップ/開発/テスト/ビルド/デプロイ」が明記されている

## 追加のコマンド指示テンプレ
- **新規構築**：「設計書どおりに初期実装し、開発サーバを起動。README を整備」
- **機能追加**：「/works のタグ/検索強化、/blog の callout、/api/og のレイアウト分岐」
- **デプロイ**：「Dockerfile・compose・Caddyfile を生成し、README に NAS 手順を追記」
