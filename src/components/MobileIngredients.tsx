import type { Ingredients, IngredientType } from "../types";
import ingredientsData from "../data/ingredients.json";

interface MobileIngredientsProps {
  addedFat: string | null;
  addedVegetables: string[];
  addedStock: string | null;
  currentStep: "fat" | "vegetable" | "stock";
  onAddIngredient: (type: IngredientType, id: string) => void;
  onRemoveIngredient: (type: IngredientType, id: string) => void;
  onGoToVegetables: () => void;
  onGoToStock: () => void;
  onGoBackToFat: () => void;
  onGoBackToVegetables: () => void;
  onSubmit: () => void;
  unlockedIngredients: {
    fats: string[];
    vegetables: string[];
    stocks: string[];
  };
}

const ingredients = ingredientsData as Ingredients;

export function MobileIngredients({
  addedFat,
  addedVegetables,
  addedStock,
  currentStep,
  onAddIngredient,
  onRemoveIngredient,
  onGoToVegetables,
  onGoToStock,
  onGoBackToFat,
  onGoBackToVegetables,
  onSubmit,
  unlockedIngredients,
}: MobileIngredientsProps) {
  // Filter ingredients to only show unlocked ones
  const unlockedFats = ingredients.fats.filter(f => unlockedIngredients.fats.includes(f.id));
  const unlockedVegetables = ingredients.vegetables.filter(v => unlockedIngredients.vegetables.includes(v.id));
  const unlockedStocks = ingredients.stocks.filter(s => unlockedIngredients.stocks.includes(s.id));
  const handleIngredientClick = (type: IngredientType, id: string, isSelected: boolean) => {
    if (isSelected) {
      onRemoveIngredient(type, id);
    } else {
      onAddIngredient(type, id);
    }
  };
  const renderFatGrid = () => (
    <div class="mobile-ingredient-section">
      <h3>Choose a Fat</h3>
      <div class="mobile-ingredient-grid">
        {unlockedFats.map((fat) => {
          const isSelected = addedFat === fat.id;
          return (
            <button
              key={fat.id}
              class={`mobile-ingredient-btn ${isSelected ? "selected" : ""}`}
              onClick={() => handleIngredientClick("fat", fat.id, isSelected)}
            >
              <span class="ingredient-emoji">{fat.emoji}</span>
              <span class="ingredient-name">{fat.name}</span>
            </button>
          );
        })}
      </div>
      <button
        class="next-step-btn"
        onClick={onGoToVegetables}
        disabled={!addedFat}
      >
        Next <span class="arrow">→</span>
      </button>
    </div>
  );

  const renderVegetableGrid = () => (
    <div class="mobile-ingredient-section">
      <h3>Add Vegetables (up to 3)</h3>
      <div class="mobile-ingredient-grid">
        {unlockedVegetables.map((veg) => {
          const isSelected = addedVegetables.includes(veg.id);
          return (
            <button
              key={veg.id}
              class={`mobile-ingredient-btn ${isSelected ? "selected" : ""}`}
              onClick={() => handleIngredientClick("vegetable", veg.id, isSelected)}
              disabled={!isSelected && addedVegetables.length >= 3}
            >
              <span class="ingredient-emoji">{veg.emoji}</span>
              <span class="ingredient-name">{veg.name}</span>
            </button>
          );
        })}
      </div>
      <div class="step-nav-buttons">
        <button class="back-step-btn" onClick={onGoBackToFat}>
          <span class="arrow">←</span> Back
        </button>
        <button
          class="next-step-btn"
          onClick={onGoToStock}
          disabled={addedVegetables.length === 0}
        >
          Next <span class="arrow">→</span>
        </button>
      </div>
    </div>
  );

  const renderStockGrid = () => (
    <div class="mobile-ingredient-section">
      <h3>Choose a Stock</h3>
      <div class="mobile-ingredient-grid">
        {unlockedStocks.map((stock) => {
          const isSelected = addedStock === stock.id;
          return (
            <button
              key={stock.id}
              class={`mobile-ingredient-btn ${isSelected ? "selected" : ""}`}
              onClick={() => handleIngredientClick("stock", stock.id, isSelected)}
            >
              <span class="ingredient-emoji">{stock.emoji}</span>
              <span class="ingredient-name">{stock.name}</span>
            </button>
          );
        })}
      </div>
      <div class="step-nav-buttons">
        <button class="back-step-btn" onClick={onGoBackToVegetables}>
          <span class="arrow">←</span> Back
        </button>
        <button
          class="next-step-btn serve-btn"
          onClick={onSubmit}
          disabled={!addedStock}
        >
          Serve
        </button>
      </div>
    </div>
  );

  return (
    <div class="mobile-ingredients">
      {currentStep === "fat" && renderFatGrid()}
      {currentStep === "vegetable" && renderVegetableGrid()}
      {currentStep === "stock" && renderStockGrid()}
    </div>
  );
}
