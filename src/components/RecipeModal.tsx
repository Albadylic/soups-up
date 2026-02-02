import type { Recipe, Ingredients } from '../types';
import recipes from '../data/recipes.json';
import ingredientsData from '../data/ingredients.json';

interface RecipeModalProps {
  onClose: () => void;
  pinnedRecipeId: string | null;
  onPinRecipe: (recipeId: string) => void;
}

const ingredients = ingredientsData as Ingredients;

const getIngredientDisplay = (id: string, category: 'fats' | 'vegetables' | 'stocks'): string => {
  const item = ingredients[category].find(i => i.id === id);
  return item ? `${item.emoji} ${item.name}` : id;
};

export function RecipeModal({ onClose, pinnedRecipeId, onPinRecipe }: RecipeModalProps) {
  return (
    <div class="modal-overlay" onClick={onClose}>
      <div class="modal" onClick={e => e.stopPropagation()}>
        <div class="modal-header">
          <h2>Recipe Book</h2>
          <button class="close-btn" onClick={onClose}>×</button>
        </div>
        <div class="recipe-list">
          {(recipes as Recipe[]).map(recipe => (
            <div key={recipe.id} class={`recipe-item ${pinnedRecipeId === recipe.id ? 'pinned' : ''}`}>
              <div class="recipe-header">
                <h3>{recipe.name}</h3>
                <button
                  class={`pin-btn ${pinnedRecipeId === recipe.id ? 'pinned' : ''}`}
                  onClick={() => onPinRecipe(recipe.id)}
                  title={pinnedRecipeId === recipe.id ? 'Unpin recipe' : 'Pin recipe'}
                >
                  📌
                </button>
              </div>
              <div class="recipe-ingredients">
                <span>{getIngredientDisplay(recipe.fat, 'fats')}</span>
                +
                <span> {recipe.vegetables.map(v => getIngredientDisplay(v, 'vegetables')).join(', ')}</span>
                +
                <span> {getIngredientDisplay(recipe.stock, 'stocks')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
