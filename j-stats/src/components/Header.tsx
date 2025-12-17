import React from 'react';
import Link from 'next/link'; // Next.jsでルーティングするために使用
import { BarChart, Home } from 'lucide-react'; // アイコンライブラリ

// ヘッダーに表示するサイト名
const SITE_NAME = "J-STATS";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-zinc-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 h-16 flex items-center justify-start">
        <Link
          href="/"
          className="flex items-center text-xl font-bold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label={`${SITE_NAME} トップページへ`}
        >
          <BarChart className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
          <h1 className="min-w-max">{SITE_NAME}</h1>
        </Link>
        <p className="text-sm ml-2">- J1~3に所属するチームのリーグ成績を年度別にまとめています。</p>

        {/* ---------------------------------- */}
        {/* ナビゲーションやその他の要素 (必要に応じて追加) */}
        {/* ---------------------------------- */}

        {/* 例: ナビゲーションリンクやユーザーメニューなどをここに追加 */}
        <nav className="flex items-center space-x-4">
          <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600"><Home className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" /></Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
