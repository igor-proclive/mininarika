import { z } from "zod";

const ingredientSchema = z.object({
  name: z.string().min(1),
  amount: z.number().positive().optional(),
  unit: z.string().optional(),
});

export const createRecipeSchema = z.object({
  title: z.string().min(1).max(200),
  lead: z.string().min(1).max(500),
  prepTimeMinutes: z.number().int().positive(),
  servings: z.number().int().positive(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  dishGroup: z.string().min(1),
  tags: z.array(z.string()).default([]),
  ingredients: z.array(ingredientSchema).min(1),
  steps: z.array(z.string().min(1)).min(1),
});

export const updateRecipeSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  lead: z.string().min(1).max(500).optional(),
  prepTimeMinutes: z.number().int().positive().optional(),
  servings: z.number().int().positive().optional(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).optional(),
  dishGroup: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  ingredients: z.array(ingredientSchema).min(1).optional(),
  steps: z.array(z.string().min(1)).min(1).optional(),
});

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeInput = z.infer<typeof updateRecipeSchema>;
