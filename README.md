# Fukumaru Portfolio

Go × GCP を軸にしたフリーランスエンジニア **Fukumaru** のポートフォリオサイトです。
Next.js 14（App Router）+ Tailwind CSS を使用し、Vercel にデプロイ可能な構成になっています。

![og-image](./public/og-sample.png)

---

## 🚀 プロジェクト概要

* **フロントエンド**: Next.js 14（App Router）
* **スタイル**: Tailwind CSS（darkMode: 'class'）
* **OG画像生成**: @vercel/og による動的OGP対応
* **ホスティング**: Vercel
* **フォーム**: Google Form / mailto（ダミー）

---

## 📂 ディレクトリ構成

```
.
├─ app/                # ページ・APIルート
│  ├─ api/og/route.ts  # OG画像生成API
│  ├─ layout.tsx       # 共通レイアウト
│  └─ page.tsx         # トップページ
├─ public/             # 画像・PDFなど静的ファイル
├─ styles/             # グローバルCSS
├─ tailwind.config.ts  # Tailwind設定
├─ package.json        # 依存パッケージ
└─ ...
```

---

## 🖼 OG画像自動生成

`/api/og` エンドポイントで動的にOG画像を生成します。

**例:**

```
/api/og?title=SendTrack&subtitle=Bouldering%20Logger&theme=light
```

クエリパラメータ：

* `title`: メインタイトル
* `subtitle`: サブタイトル
* `theme`: `dark` または `light`

---

## 🛠 セットアップ手順

```bash
# 依存インストール
npm install

# 開発サーバ起動
npm run dev

# 本番ビルド
npm run build
npm start
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
