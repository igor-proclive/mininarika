"use client";

import type { Recipe } from "@/lib/recipes/recipe.model";
import { useLanguage } from "./LanguageProvider";
import RecipeList from "./RecipeList";

export default function RecipesPageContent({ recipes }: { recipes: Recipe[] }) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{t.allRecipes}</h1>
      <RecipeList recipes={recipes} />
    </div>
  );
}
