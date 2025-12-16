import React from 'react';
import { Github } from 'lucide-react';
interface FooterProps {
  githubUrl?: string;
}

const Footer: React.FC<FooterProps> = ({
  githubUrl = "https://github.com/sugi-kun123/next-app.git"
}) => {
  const currentYear = new Date().getFullYear();
  const creatorName = "sugi-kun123";

  return (
    <footer className="w-full border-t border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 mt-12 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm space-y-4 sm:space-y-0">

        <p className="text-gray-500 dark:text-zinc-400">
          &copy; {currentYear} {creatorName}. All Rights Reserved.
        </p>

        <div className="flex items-center space-x-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub Repository
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
