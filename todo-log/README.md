# TODO LOG

Firestoreを活用した、シンプルなTODO管理アプリです。 「今日やるべきこと」に集中しつつ、過去のログをリストから振り返ることができます。

https://todo-log-pearl.vercel.app/

## 🚀 主な機能

- TODO管理: 追加、完了チェック、削除の基本機能。
- 日付別表示: TODOが存在する日だけを抽出してリスト化。選択するとその日のTODOが表示されます。
- ダークモード対応: システム設定に合わせた自動カラー切り替え。
- レスポンシブデザイン: PCでもスマホでも快適に操作可能。

## 🛠 使用技術

- Frontend: Next.js 15 (App Router), TypeScript, Tailwind CSS
- Backend: Firebase (Cloud Firestore)
- Deployment: Vercel

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
