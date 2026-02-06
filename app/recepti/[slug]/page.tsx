import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRecipeBySlug, listRecipes } from "@/lib/recipes/recipe.service";
import { cdnUrl } from "@/lib/cdn";
import RecipeDetail from "@/components/RecipeDetail";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return { title: "Recept nije pronađen" };
  }

  return {
    title: recipe.title,
    description: recipe.lead,
    openGraph: {
      title: recipe.title,
      description: recipe.lead,
      images: [{ url: cdnUrl(recipe.image.cdnPath) }],
    },
  };
}

export async function generateStaticParams() {
  const recipes = listRecipes();
  return recipes.map((r) => ({ slug: r.slug }));
}

export default async function RecipeDetailPage({ params }: Props) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return <RecipeDetail recipe={recipe} />;
}
