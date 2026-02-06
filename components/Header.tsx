"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="border-b border-stone-200 dark:border-stone-800">
      <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-brand">
          {t.siteName}
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/recepti"
            className="text-sm font-medium text-muted hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            {t.recipes}
          </Link>
          <LanguageToggle />
        </div>
      </nav>
    </header>
  );
}
