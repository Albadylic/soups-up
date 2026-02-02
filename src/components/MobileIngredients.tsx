import type { Ingredients, IngredientType } from "../types";
import ingredientsData from "../data/ingredients.json";

interface MobileIngredientsProps {
  addedFat: string | null;
  addedVegetables: string[];
  addedStock: string | null;
  currentStep: "fat" | "vegetable" | "stock" | "ready";
  onAddIngredient: (type: IngredientType, id: string) => void;
  onNextStep: () => void;
  canSubmit: boolean;
  onSubmit: () => void;
  onReset: () => void;
}

const ingredients = ingredientsData as Ingredients;

export function MobileIngredients({
  addedFat,
  addedVegetables,
  addedStock,
  currentStep,
  onAddIngredient,
  onNextStep,
  canSubmit,
  onSubmit,
  onReset,
}: MobileIngredientsProps) {
  const renderFatGrid = () => (
    <div class="mobile-ingredient-section">
      <h3>Choose a Fat</h3>
      <div class="mobile-ingredient-grid">
        {ingredients.fats.map((fat) => (
          <button
            key={fat.id}
            class={`mobile-ingredient-btn ${addedFat === fat.id ? "selected" : ""}`}
            onClick={() => onAddIngredient("fat", fat.id)}
          >
            <span class="ingredient-emoji">{fat.emoji}</span>
            <span class="ingredient-name">{fat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderVegetableGrid = () => (
    <div class="mobile-ingredient-section">
      <h3>Add Vegetables (up to 3)</h3>
      <div class="mobile-ingredient-grid">
        {ingredients.vegetables.map((veg) => (
          <button
            key={veg.id}
            class={`mobile-ingredient-btn ${addedVegetables.includes(veg.id) ? "selected" : ""}`}
            onClick={() => onAddIngredient("vegetable", veg.id)}
            disabled={addedVegetables.includes(veg.id) || addedVegetables.length >= 3}
          >
            <span class="ingredient-emoji">{veg.emoji}</span>
            <span class="ingredient-name">{veg.name}</span>
          </button>
        ))}
      </div>
      {addedVegetables.length > 0 && (
        <button class="next-step-btn" onClick={onNextStep}>
          Next <span class="arrow">→</span>
        </button>
      )}
    </div>
  );

  const renderStockGrid = () => (
    <div class="mobile-ingredient-section">
      <h3>Choose a Stock</h3>
      <div class="mobile-ingredient-grid">
        {ingredients.stocks.map((stock) => (
          <button
            key={stock.id}
            class={`mobile-ingredient-btn ${addedStock === stock.id ? "selected" : ""}`}
            onClick={() => onAddIngredient("stock", stock.id)}
          >
            <span class="ingredient-emoji">{stock.emoji}</span>
            <span class="ingredient-name">{stock.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderReadyState = () => (
    <div class="mobile-ingredient-section">
      <h3>Ready to Serve!</h3>
    </div>
  );

  return (
    <div class="mobile-ingredients">
      {currentStep === "fat" && renderFatGrid()}
      {currentStep === "vegetable" && renderVegetableGrid()}
      {currentStep === "stock" && renderStockGrid()}
      {currentStep === "ready" && renderReadyState()}

      <div class="mobile-action-buttons">
        <button class="submit-btn" onClick={onSubmit} disabled={!canSubmit}>
          Serve
        </button>
        <button class="reset-btn" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
