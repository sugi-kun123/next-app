# Next.js Projects Lab

このリポジトリは、Next.js と TypeScript を中心とした開発プロジェクトをまとめたワークスペースです。

## 📂 プロジェクト一覧

1. [TODO LOG](./todo-log)
Firestoreを活用した、シンプルで直感的な活動記録型TODOアプリ。

- 特徴: 活動履歴がある日だけをリストアップするアーカイブ機能。
- スタック: Next.js, Firebase (Firestore), Tailwind CSS

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
