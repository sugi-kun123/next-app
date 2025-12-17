import React from 'react';
import Link from 'next/link';
import { NotebookPen, Home } from 'lucide-react';

const SITE_NAME = "TODO LOG";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-zinc-800 shadow-sm">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-xl font-bold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label={`${SITE_NAME} トップページへ`}
        >
          <NotebookPen className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
          <h1 className="min-w-max">{SITE_NAME}</h1>
        </Link>

        <nav className="flex items-center space-x-4">
          <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
            <Home className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
