import type { Recipe, Ingredients } from '../types';
import recipes from '../data/recipes.json';
import ingredientsData from '../data/ingredients.json';

interface RecipeModalProps {
  onClose: () => void;
}

const ingredients = ingredientsData as Ingredients;

const getIngredientDisplay = (id: string, category: 'fats' | 'vegetables' | 'stocks'): string => {
  const item = ingredients[category].find(i => i.id === id);
  return item ? `${item.emoji} ${item.name}` : id;
};

export function RecipeModal({ onClose }: RecipeModalProps) {
  return (
    <div class="modal-overlay" onClick={onClose}>
      <div class="modal" onClick={e => e.stopPropagation()}>
        <div class="modal-header">
          <h2>Recipe Book</h2>
          <button class="close-btn" onClick={onClose}>×</button>
        </div>
        <div class="recipe-list">
          {(recipes as Recipe[]).map(recipe => (
            <div key={recipe.id} class="recipe-item">
              <h3>{recipe.name}</h3>
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
