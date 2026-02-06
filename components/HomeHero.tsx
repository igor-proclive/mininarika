"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function HomeHero() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">
        {t.heroTitle} <span className="text-brand">Mininariku</span>
      </h1>
      <p className="text-muted max-w-md">{t.heroDescription}</p>
      <Link
        href="/recepti"
        className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-dark transition-colors"
      >
        {t.browseRecipes} &rarr;
      </Link>
    </div>
  );
}
