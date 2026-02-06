import { NextResponse } from "next/server";
import {
  getRecipeBySlug,
  updateRecipe,
  deleteRecipe,
  RecipeNotFoundError,
} from "@/lib/recipes/recipe.service";
import { updateRecipeSchema } from "@/lib/recipes/recipe.validation";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }
  return NextResponse.json(recipe);
}

export async function PUT(request: Request, { params }: Params) {
  const { slug } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = updateRecipeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const recipe = updateRecipe(slug, parsed.data);
    return NextResponse.json(recipe);
  } catch (err) {
    if (err instanceof RecipeNotFoundError) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    throw err;
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { slug } = await params;
  try {
    deleteRecipe(slug);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    if (err instanceof RecipeNotFoundError) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    throw err;
  }
}
