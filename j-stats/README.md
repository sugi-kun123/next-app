# 🏆 j-stats: Jリーグ全チーム成績トラッカー

Jリーグの全クラブを対象に、過去のリーグ戦順位、カップ戦成績、監督情報などを集約し、検索・フィルタリング・ソートを可能にしたデータビジュアライゼーションアプリケーションです。

## 🚀 主な機能とハイライト

- 全チームデータ表示: J1、J2、J3の全クラブの過去の年度別成績（順位、勝敗、監督など）を一覧表示。
- 高度なソート機能:
  - 複合順序: J1 → J2 → J3 のカテゴリ順、かつ同カテゴリ内では順位順にソートし、リーグ全体での相対的な強さを比較可能。
- リアルタイムフィルタリング:
  - チーム名、スタジアム、ホームタウンでの高速検索。
  - カテゴリ（J1/J2/J3）でのフィルタリング。
- 視覚的なデータ表現:
  - リーグカテゴリ（J1: 赤、J2: 緑など）に応じたカラーリング。
  - 優勝年度（リーグ、天皇杯、ルヴァンカップ）へのハイライト表示。
- レスポンシブ設計: PC、スマートフォンを問わず、快適にデータを確認できるUI/UX。

## 🛠️ 使用技術スタック

本アプリケーションは、データ駆動型のWebアプリケーションを構築するためのモダンな技術スタックを採用しています。

#### フロントエンド & UI

- Next.js 15 (App Router): 高速なクライアントサイドナビゲーションとサーバーコンポーネントによるパフォーマンス最適化。
- TypeScript: データ構造（チーム統計）の定義と型安全性の確保。
- Tailwind CSS: 迅速でメンテナンス性の高いスタイルリングを実現。
- Lucide React / React Icons: UIに分かりやすさを加えるための軽量なアイコンライブラリ。

#### データ管理

- 静的 JSON データ: チームの年度別成績データ（teams.json など）を静的ファイルとして管理し、高速に取得。
- useMemo / useState: 大量のチームデータを効率的にフィルタリングおよびソートするためのReactフック活用。

#### デプロイメント

- Vercel: ゼロコンフィグレーションでの高速デプロイ。

## 📦 セットアップ

リポジトリをクローン:

```bash
git clone [リポジトリのURL]
```

依存関係をインストール:

```bash
npm install
```

環境変数の設定: .env.local ファイルを作成し、Firebaseの設定値を入力してください。

```Plaintext
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

開発サーバーの起動:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
