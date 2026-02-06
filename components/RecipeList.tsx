"use client";

import type { Recipe } from "@/lib/recipes/recipe.model";
import { useLanguage } from "./LanguageProvider";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  const { t } = useLanguage();

  if (recipes.length === 0) {
    return (
      <p className="text-center text-muted py-12">{t.noRecipes}</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
