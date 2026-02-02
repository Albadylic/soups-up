import type { Recipe, Ingredients } from '../types';
import recipes from '../data/recipes.json';
import ingredientsData from '../data/ingredients.json';

interface OrderDisplayProps {
  order: Recipe | null;
  pinnedRecipeId?: string | null;
}

const ingredients = ingredientsData as Ingredients;

const getIngredientEmoji = (id: string, category: 'fats' | 'vegetables' | 'stocks'): string => {
  const item = ingredients[category].find(i => i.id === id);
  return item ? `${item.emoji} ${item.name}` : id;
};

export function OrderDisplay({ order, pinnedRecipeId }: OrderDisplayProps) {
  const pinnedRecipe = pinnedRecipeId
    ? (recipes as Recipe[]).find(r => r.id === pinnedRecipeId)
    : null;

  return (
    <div class="order-display">
      <span class="order-label">Order:</span>
      <span class="order-name">{order ? order.name : "Loading..."}</span>
      {pinnedRecipe && (
        <div class="pinned-ingredients">
          <span class="pinned-label">Recipe:</span>
          <span class="pinned-recipe-content">
            {getIngredientEmoji(pinnedRecipe.fat, 'fats')} + {pinnedRecipe.vegetables.map(v => getIngredientEmoji(v, 'vegetables')).join(', ')} + {getIngredientEmoji(pinnedRecipe.stock, 'stocks')}
          </span>
        </div>
      )}
    </div>
  );
}
