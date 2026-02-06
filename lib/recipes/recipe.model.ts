export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Ingredient {
  name: string;
  amount?: number;
  unit?: string;
}

export interface RecipeImage {
  cdnPath: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  lead: string;
  image: RecipeImage;
  prepTimeMinutes: number;
  servings: number;
  difficulty: Difficulty;
  dishGroup: string;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
}

export interface RecipeRow {
  id: string;
  slug: string;
  title: string;
  lead: string;
  cdn_path: string;
  prep_time_minutes: number;
  servings: number;
  difficulty: string;
  dish_group: string;
  tags: string;
  ingredients: string;
  steps: string;
  created_at: string;
  updated_at: string;
}
