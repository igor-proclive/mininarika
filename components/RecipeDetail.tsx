"use client";

import type { Recipe } from "@/lib/recipes/recipe.model";
import { cdnUrl } from "@/lib/cdn";
import { useLanguage } from "./LanguageProvider";
import { translateDifficulty, translateDishGroup } from "@/lib/i18n";

export default function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const { locale, t } = useLanguage();

  return (
    <article className="max-w-3xl mx-auto space-y-8 bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm rounded-lg p-6 sm:p-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{recipe.title}</h1>
        <p className="text-muted text-lg">{recipe.lead}</p>
      </div>

      <img
        src={cdnUrl(recipe.image.cdnPath)}
        alt={recipe.title}
        className="w-full rounded-lg aspect-[16/9] object-cover"
      />

      <div className="flex flex-wrap gap-4 text-sm">
        <InfoPill label={t.prepTime} value={`${recipe.prepTimeMinutes} ${t.min}`} />
        <InfoPill label={t.servings} value={String(recipe.servings)} />
        <InfoPill label={t.difficultyLabel} value={translateDifficulty(locale, recipe.difficulty)} />
        <InfoPill label={t.dishGroupLabel} value={translateDishGroup(locale, recipe.dishGroup)} />
      </div>

      {recipe.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <span key={tag} className="text-xs bg-silver/20 dark:bg-silver/10 px-2 py-1 rounded-full text-muted">
              {tag}
            </span>
          ))}
        </div>
      )}

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t.ingredients}</h2>
        <ul className="space-y-1">
          {recipe.ingredients.map((ing, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <span className="text-muted w-20 text-right shrink-0">
                {ing.amount && `${ing.amount} ${ing.unit || ""}`}
              </span>
              <span>{ing.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t.preparation}</h2>
        <ol className="space-y-3">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="font-bold text-brand shrink-0 w-6 text-right">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-silver/20 dark:bg-silver/10 rounded-lg px-3 py-2">
      <div className="text-xs text-muted">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
