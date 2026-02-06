"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setLocale("hr")}
        className={`text-lg leading-none px-1 py-0.5 rounded transition-opacity ${locale === "hr" ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
        aria-label="Hrvatski"
      >
        🇭🇷
      </button>
      <button
        onClick={() => setLocale("en")}
        className={`text-lg leading-none px-1 py-0.5 rounded transition-opacity ${locale === "en" ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
        aria-label="English"
      >
        🇬🇧
      </button>
    </div>
  );
}
