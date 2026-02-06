export type Locale = "hr" | "en";

const translations = {
  hr: {
    siteName: "Mininarika",
    recipes: "Recepti",
    heroTitle: "Dobrodošli na",
    heroDescription: "Kolekcija jednostavnih i provjerenih recepata za svakodnevno kuhanje.",
    browseRecipes: "Pregledaj recepte",
    allRecipes: "Recepti",
    noRecipes: "Nema recepata. Dodajte prvi recept putem API-ja.",
    prepTime: "Vrijeme",
    servings: "Porcije",
    difficultyLabel: "Težina",
    dishGroupLabel: "Grupa",
    ingredients: "Sastojci",
    preparation: "Priprema",
    min: "min",
    difficulty: {
      Easy: "Jednostavno",
      Medium: "Srednje zahtjevno",
      Hard: "Složeno",
    },
    dishGroup: {
      "Glavna jela": "Glavna jela",
      "Deserti": "Deserti",
      "Kruh i peciva": "Kruh i peciva",
      "Predjela": "Predjela",
      "Juhe": "Juhe",
    },
  },
  en: {
    siteName: "Mininarika",
    recipes: "Recipes",
    heroTitle: "Welcome to",
    heroDescription: "A collection of simple and proven recipes for everyday cooking.",
    browseRecipes: "Browse recipes",
    allRecipes: "Recipes",
    noRecipes: "No recipes found. Add your first recipe via the API.",
    prepTime: "Prep time",
    servings: "Servings",
    difficultyLabel: "Difficulty",
    dishGroupLabel: "Category",
    ingredients: "Ingredients",
    preparation: "Preparation",
    min: "min",
    difficulty: {
      Easy: "Easy",
      Medium: "Medium",
      Hard: "Hard",
    },
    dishGroup: {
      "Glavna jela": "Main courses",
      "Deserti": "Desserts",
      "Kruh i peciva": "Bread & pastry",
      "Predjela": "Starters",
      "Juhe": "Soups",
    },
  },
};

export type Translations = typeof translations["hr"];

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}

export function translateDifficulty(locale: Locale, difficulty: string): string {
  const t = translations[locale];
  return t.difficulty[difficulty as keyof typeof t.difficulty] || difficulty;
}

export function translateDishGroup(locale: Locale, group: string): string {
  const t = translations[locale];
  return t.dishGroup[group as keyof typeof t.dishGroup] || group;
}
