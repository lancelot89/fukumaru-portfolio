# ポートフォリオサイト設計指示書

## 1. プロジェクト概要
- **目的**  
  Go × GCP を軸としたフリーランスエンジニアとしてのスキル・実績・人柄を発信し、案件獲得や信用向上につなげる。
- **ターゲットユーザー**  
  - IT企業の採用担当者
  - 同業エンジニア
  - 技術ブログ読者
- **想定デバイス**  
  PC・スマートフォン両対応（レスポンシブ）

---

## 2. サイト構成
- **トップページ `/`**
  - ヒーローセクション：「Go × GCP フリーランス」
  - スキル概要（アイコン付き）
  - 最新の実績一覧（/works へのリンク）
  - 最新ブログ記事一覧（/blog へのリンク）
  - お問い合わせボタン
- **実績ページ `/works`**
  - カード型一覧
  - タグ/技術スタックでフィルタ
  - GitHub・デモリンク付き
- **ブログページ `/blog`**
  - MDX対応
  - タグ/カテゴリ検索
  - コードハイライト
  - OGP自動生成
- **自己紹介ページ `/about`**
  - プロフィール写真
  - 経歴・資格
  - SNSリンク（X, GitHub, LinkedIn）
- **お問い合わせページ `/contact`**
  - フォーム（メール送信 or 外部フォーム連携）

---

## 3. 機能要件
- **共通機能**
  - ダーク/ライトテーマ切替（ユーザー設定保存）
  - i18n対応（将来英語版追加想定）
  - SEO対策（meta, title, description, ogp）
  - Core Web Vitals最適化（画像の遅延読み込み、フォント最適化）
- **OGP生成API**
  - `/api/og`  
    Satori + Resvgでブログ記事・実績ごとにデザイン切替
    - Noto Sans JP フォント
    - アイキャッチ画像に記事タイトル・タグを反映
- **検索/フィルタ**
  - `/works` と `/blog` でクライアントサイドフィルタ

---

## 4. デザイン要件
- **UIフレームワーク**：Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **アイコン**：lucide-react
- **色/雰囲気**
  - ベース：シンプル、余白多め
  - アクセントカラー：ブルー（#2563eb）
  - ダークテーマ時は彩度を落とし背景は#0f172a
- **フォント**
  - 本文：Noto Sans JP
  - 見出し：Inter or Noto Sans JP Bold

---

## 5. 技術要件
- **パッケージマネージャ**：pnpm
- **品質管理**：
  - ESLint + Prettier + Stylelint
  - Vitest + Testing Library
  - Husky + lint-staged で pre-commit に lint, typecheck, test
- **データ管理**
  - 実績：`/content/works/*.mdx`
  - ブログ：`/content/blog/*.mdx`
- **CI/CD**
  - GitHub Actions でビルド・テスト・DockerイメージPush
- **Docker**
  - 本番用Dockerfile（マルチステージビルド）
  - docker-compose.yml（Caddyリバースプロキシとセット）

---

## 6. デプロイ構成
- **本番環境**：Ugreen NAS（Docker実行）
- **構成**
  - appサービス：Next.jsアプリ（ポート3000）
  - proxyサービス：Caddy（HTTPS、Let’s Encrypt自動証明書）
- **更新手順**
  - GitHub Actionsで `ghcr.io/<user>/<repo>:latest` にPush
  - NASで `docker compose pull && docker compose up -d`

---

## 7. 将来の拡張
- 英語版サイトの追加（i18n拡張）
- 実績ページに詳細ページ追加
- ブログコメント機能
- Google Analytics / Search Console 連携

---

## 8. 制作フロー（Codex CLI用）
1. この設計指示書を `AGENTS.md` または `portfolio-design.md` として保存
2. Codex CLIに以下を入力：

