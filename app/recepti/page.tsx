import type { Metadata } from "next";
import { listRecipes } from "@/lib/recipes/recipe.service";
import RecipesPageContent from "@/components/RecipesPageContent";

export const metadata: Metadata = {
  title: "Recepti",
  description: "Pregledajte sve recepte na Mininarici.",
};

export const dynamic = "force-dynamic";

export default function RecipesPage() {
  const recipes = listRecipes();
  return <RecipesPageContent recipes={recipes} />;
}
