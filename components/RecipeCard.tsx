"use client";

import Link from "next/link";
import type { Recipe } from "@/lib/recipes/recipe.model";
import { cdnUrl } from "@/lib/cdn";
import { useLanguage } from "./LanguageProvider";
import { translateDifficulty, translateDishGroup } from "@/lib/i18n";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { locale, t } = useLanguage();

  return (
    <Link href={`/recepti/${recipe.slug}`} className="group block">
      <article className="relative aspect-[4/3] overflow-hidden rounded-md shadow-sm hover:shadow-md transition-shadow">
        <img
          src={cdnUrl(recipe.image.cdnPath)}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-white/90 text-stone-800 text-xs font-medium px-2 py-1">
          {recipe.prepTimeMinutes} {t.min}
        </span>
        <span className="absolute top-3 right-3 bg-white/90 text-stone-800 text-xs font-medium px-2 py-1">
          {translateDifficulty(locale, recipe.difficulty)}
        </span>
        <div className="absolute left-3 right-3 top-[65%] flex flex-col items-start">
          <span className="bg-white/90 text-stone-800 text-xs font-medium px-2 py-1">
            {translateDishGroup(locale, recipe.dishGroup)}
          </span>
          <span className="bg-red text-white font-bold text-base px-2 py-1">
            {recipe.title}
          </span>
        </div>
      </article>
    </Link>
  );
}
