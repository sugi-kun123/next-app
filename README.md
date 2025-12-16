# Next.js Projects Lab

このリポジトリは、Next.js と TypeScript を中心とした開発プロジェクトをまとめたワークスペースです。

## 📂 プロジェクト一覧

#### 1. [TODO LOG](./todo-log)

Firestoreを活用した、シンプルで直感的な活動記録型TODOアプリ。

- 特徴: 活動履歴がある日だけをリストアップするアーカイブ機能。
- スタック: Next.js, Firebase (Firestore), Tailwind CSS

#### 2. [J-Stats](./j-stats)

Jリーグ全チームの年度別成績（リーグ順位、カップ戦結果など）を集約したデータトラッカー。

- 特徴: J1→J2→J3順、順位順の複合ソート機能。カテゴリ別カラーハイライト。
- スタック: Next.js, TypeScript, Tailwind CSS, 静的JSONデータ

## 🛠 共通のセットアップ

各プロジェクトディレクトリへ移動してから、個別にセットアップを行ってください。

```bash
# 例：todo-log を実行する場合
cd todo-log
npm install
npm run dev
```

## 📝 開発ルール（メモ）

環境変数: 各ディレクトリの .env.local で管理。GitHubにはプッシュしないこと。
デプロイ: 基本的に Vercel で各フォルダごとにプロジェクトを作成してデプロイ。
