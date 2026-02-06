import type { Recipe, RecipeRow } from "./recipe.model";

export function rowToRecipe(row: RecipeRow): Recipe {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    lead: row.lead,
    image: { cdnPath: row.cdn_path },
    prepTimeMinutes: row.prep_time_minutes,
    servings: row.servings,
    difficulty: row.difficulty as Recipe["difficulty"],
    dishGroup: row.dish_group,
    tags: JSON.parse(row.tags),
    ingredients: JSON.parse(row.ingredients),
    steps: JSON.parse(row.steps),
  };
}
