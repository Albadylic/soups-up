export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
}

export interface Ingredients {
  fats: Ingredient[];
  vegetables: Ingredient[];
  stocks: Ingredient[];
}

export interface Recipe {
  id: string;
  name: string;
  fat: string;
  vegetables: string[];
  stock: string;
}

export interface GameState {
  currentOrder: Recipe | null;
  addedFat: string | null;
  addedVegetables: string[];
  addedStock: string | null;
  showRecipeModal: boolean;
  feedback: 'success' | 'failure' | null;
  readyForStock: boolean;
}

export type IngredientType = 'fat' | 'vegetable' | 'stock';
