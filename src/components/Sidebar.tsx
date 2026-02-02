import type { Ingredients, IngredientType } from '../types';
import ingredientsData from '../data/ingredients.json';

interface SidebarProps {
  addedFat: string | null;
  addedVegetables: string[];
  addedStock: string | null;
  currentStep: 'fat' | 'vegetable' | 'stock' | 'ready';
  onAddIngredient: (type: IngredientType, id: string) => void;
  onReset: () => void;
  onToggleRecipeModal: () => void;
}

const ingredients = ingredientsData as Ingredients;

export function Sidebar({
  addedFat,
  addedVegetables,
  addedStock,
  currentStep,
  onAddIngredient,
  onReset,
  onToggleRecipeModal,
}: SidebarProps) {
  const isFatDisabled = currentStep !== 'fat';
  const isVegetableDisabled = currentStep === 'fat' || currentStep === 'ready' || addedStock !== null;
  const isStockDisabled = currentStep === 'fat' || addedVegetables.length === 0;

  return (
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>Ingredients</h2>
        <button class="recipe-book-icon" onClick={onToggleRecipeModal} title="Recipe Book">
          📖
        </button>
      </div>

      <div class="sidebar-section">
        <h3>Fats</h3>
        <div class="ingredient-list">
          {ingredients.fats.map(fat => (
            <button
              key={fat.id}
              class={`ingredient-btn ${addedFat === fat.id ? 'selected' : ''} ${isFatDisabled ? 'disabled' : ''}`}
              onClick={() => onAddIngredient('fat', fat.id)}
              disabled={isFatDisabled}
            >
              {fat.emoji} {fat.name}
            </button>
          ))}
        </div>
      </div>

      <div class="sidebar-section">
        <h3>Vegetables</h3>
        <div class="ingredient-list">
          {ingredients.vegetables.map(veg => (
            <button
              key={veg.id}
              class={`ingredient-btn ${addedVegetables.includes(veg.id) ? 'selected' : ''} ${isVegetableDisabled ? 'disabled' : ''}`}
              onClick={() => onAddIngredient('vegetable', veg.id)}
              disabled={isVegetableDisabled || addedVegetables.includes(veg.id)}
            >
              {veg.emoji} {veg.name}
            </button>
          ))}
        </div>
      </div>

      <div class="sidebar-section">
        <h3>Stocks</h3>
        <div class="ingredient-list">
          {ingredients.stocks.map(stock => (
            <button
              key={stock.id}
              class={`ingredient-btn ${addedStock === stock.id ? 'selected' : ''} ${isStockDisabled ? 'disabled' : ''}`}
              onClick={() => onAddIngredient('stock', stock.id)}
              disabled={isStockDisabled || addedStock !== null}
            >
              {stock.emoji} {stock.name}
            </button>
          ))}
        </div>
      </div>

      <button class="reset-btn" onClick={onReset}>
        Reset Soup
      </button>
    </aside>
  );
}
