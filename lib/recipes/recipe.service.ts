import { getDb } from "@/lib/db";
import { rowToRecipe } from "./recipe.mapper";
import type { Recipe, RecipeRow } from "./recipe.model";
import type { CreateRecipeInput, UpdateRecipeInput } from "./recipe.validation";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/č/g, "c")
    .replace(/ć/g, "c")
    .replace(/đ/g, "d")
    .replace(/š/g, "s")
    .replace(/ž/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function generateId(): string {
  return crypto.randomUUID();
}

export function listRecipes(): Recipe[] {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM recipes ORDER BY created_at DESC").all() as RecipeRow[];
  return rows.map(rowToRecipe);
}

export function getRecipeBySlug(slug: string): Recipe | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM recipes WHERE slug = ?").get(slug) as RecipeRow | undefined;
  return row ? rowToRecipe(row) : null;
}

export function createRecipe(input: CreateRecipeInput): Recipe {
  const db = getDb();
  const id = generateId();
  const slug = generateSlug(input.title);

  const existing = db.prepare("SELECT id FROM recipes WHERE slug = ?").get(slug);
  if (existing) {
    throw new SlugConflictError(slug);
  }

  const cdnPath = `/recipes/${slug}/hero.jpg`;

  db.prepare(`
    INSERT INTO recipes (id, slug, title, lead, cdn_path, prep_time_minutes, servings, difficulty, dish_group, tags, ingredients, steps)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    slug,
    input.title,
    input.lead,
    cdnPath,
    input.prepTimeMinutes,
    input.servings,
    input.difficulty,
    input.dishGroup,
    JSON.stringify(input.tags),
    JSON.stringify(input.ingredients),
    JSON.stringify(input.steps),
  );

  return getRecipeBySlug(slug)!;
}

export function updateRecipe(slug: string, input: UpdateRecipeInput): Recipe {
  const db = getDb();
  const existing = db.prepare("SELECT * FROM recipes WHERE slug = ?").get(slug) as RecipeRow | undefined;

  if (!existing) {
    throw new RecipeNotFoundError(slug);
  }

  const fields: string[] = [];
  const values: unknown[] = [];

  if (input.title !== undefined) {
    fields.push("title = ?");
    values.push(input.title);
  }
  if (input.lead !== undefined) {
    fields.push("lead = ?");
    values.push(input.lead);
  }
  if (input.prepTimeMinutes !== undefined) {
    fields.push("prep_time_minutes = ?");
    values.push(input.prepTimeMinutes);
  }
  if (input.servings !== undefined) {
    fields.push("servings = ?");
    values.push(input.servings);
  }
  if (input.difficulty !== undefined) {
    fields.push("difficulty = ?");
    values.push(input.difficulty);
  }
  if (input.dishGroup !== undefined) {
    fields.push("dish_group = ?");
    values.push(input.dishGroup);
  }
  if (input.tags !== undefined) {
    fields.push("tags = ?");
    values.push(JSON.stringify(input.tags));
  }
  if (input.ingredients !== undefined) {
    fields.push("ingredients = ?");
    values.push(JSON.stringify(input.ingredients));
  }
  if (input.steps !== undefined) {
    fields.push("steps = ?");
    values.push(JSON.stringify(input.steps));
  }

  if (fields.length > 0) {
    fields.push("updated_at = datetime('now')");
    values.push(slug);
    db.prepare(`UPDATE recipes SET ${fields.join(", ")} WHERE slug = ?`).run(...values);
  }

  return getRecipeBySlug(slug)!;
}

export function deleteRecipe(slug: string): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM recipes WHERE slug = ?").run(slug);
  if (result.changes === 0) {
    throw new RecipeNotFoundError(slug);
  }
  return true;
}

export class RecipeNotFoundError extends Error {
  constructor(slug: string) {
    super(`Recipe not found: ${slug}`);
    this.name = "RecipeNotFoundError";
  }
}

export class SlugConflictError extends Error {
  slug: string;
  constructor(slug: string) {
    super(`Recipe with slug "${slug}" already exists`);
    this.name = "SlugConflictError";
    this.slug = slug;
  }
}
