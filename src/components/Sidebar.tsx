import type { Ingredients, IngredientType } from '../types';
import ingredientsData from '../data/ingredients.json';

interface SidebarProps {
  addedFat: string | null;
  addedVegetables: string[];
  addedStock: string | null;
  currentStep: 'fat' | 'vegetable' | 'stock';
  onAddIngredient: (type: IngredientType, id: string) => void;
  onRemoveIngredient: (type: IngredientType, id: string) => void;
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
  onRemoveIngredient,
  onReset,
  onToggleRecipeModal,
}: SidebarProps) {
  const handleIngredientClick = (type: IngredientType, id: string, isSelected: boolean) => {
    if (isSelected) {
      onRemoveIngredient(type, id);
    } else {
      onAddIngredient(type, id);
    }
  };

  const isFatDisabled = currentStep !== 'fat';
  const isVegetableDisabled = currentStep === 'fat' || addedStock !== null;
  const isStockDisabled = currentStep === 'fat' || addedVegetables.length === 0;

  return (
    <aside class="sidebar">
      <button class="recipe-book-btn" onClick={onToggleRecipeModal}>
        <span class="recipe-book-icon">📖</span>
        <span>Recipes</span>
      </button>

      <div class="sidebar-section">
        <h3>Fats</h3>
        <div class="ingredient-list">
          {ingredients.fats.map(fat => {
            const isSelected = addedFat === fat.id;
            return (
              <button
                key={fat.id}
                class={`ingredient-btn ${isSelected ? 'selected' : ''} ${isFatDisabled && !isSelected ? 'disabled' : ''}`}
                onClick={() => handleIngredientClick('fat', fat.id, isSelected)}
                disabled={isFatDisabled && !isSelected}
              >
                {fat.emoji} {fat.name}
              </button>
            );
          })}
        </div>
      </div>

      <div class="sidebar-section">
        <h3>Vegetables</h3>
        <div class="ingredient-list">
          {ingredients.vegetables.map(veg => {
            const isSelected = addedVegetables.includes(veg.id);
            return (
              <button
                key={veg.id}
                class={`ingredient-btn ${isSelected ? 'selected' : ''} ${isVegetableDisabled && !isSelected ? 'disabled' : ''}`}
                onClick={() => handleIngredientClick('vegetable', veg.id, isSelected)}
                disabled={isVegetableDisabled && !isSelected}
              >
                {veg.emoji} {veg.name}
              </button>
            );
          })}
        </div>
      </div>

      <div class="sidebar-section">
        <h3>Stocks</h3>
        <div class="ingredient-list">
          {ingredients.stocks.map(stock => {
            const isSelected = addedStock === stock.id;
            return (
              <button
                key={stock.id}
                class={`ingredient-btn ${isSelected ? 'selected' : ''} ${isStockDisabled && !isSelected ? 'disabled' : ''}`}
                onClick={() => handleIngredientClick('stock', stock.id, isSelected)}
                disabled={isStockDisabled && !isSelected}
              >
                {stock.emoji} {stock.name}
              </button>
            );
          })}
        </div>
      </div>

      <button class="reset-btn" onClick={onReset}>
        Reset Soup
      </button>
    </aside>
  );
}
