import { NextResponse } from "next/server";
import { listRecipes, createRecipe, SlugConflictError } from "@/lib/recipes/recipe.service";
import { createRecipeSchema } from "@/lib/recipes/recipe.validation";

export async function GET() {
  const recipes = listRecipes();
  return NextResponse.json(recipes);
}

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = createRecipeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const recipe = createRecipe(parsed.data);
    return NextResponse.json(recipe, { status: 201 });
  } catch (err) {
    if (err instanceof SlugConflictError) {
      return NextResponse.json(
        { error: err.message, slug: err.slug },
        { status: 409 },
      );
    }
    throw err;
  }
}
