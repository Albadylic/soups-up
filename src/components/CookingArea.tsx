import type { Ingredients } from "../types";
import ingredientsData from "../data/ingredients.json";

interface CookingAreaProps {
  addedFat: string | null;
  addedVegetables: string[];
  addedStock: string | null;
  currentStep: "fat" | "vegetable" | "stock" | "ready";
  canSubmit: boolean;
  onSubmit: () => void;
  onReset: () => void;
  hideButtons?: boolean;
}

const ingredients = ingredientsData as Ingredients;

const getIngredientDisplay = (
  id: string,
  category: "fats" | "vegetables" | "stocks",
): string => {
  const item = ingredients[category].find((i) => i.id === id);
  return item ? `${item.emoji} ${item.name}` : id;
};

export function CookingArea({
  addedFat,
  addedVegetables,
  addedStock,
  currentStep,
  canSubmit,
  onSubmit,
  onReset,
  hideButtons = false,
}: CookingAreaProps) {
  const hasIngredients = addedFat || addedVegetables.length > 0 || addedStock;

  return (
    <main class="cooking-area">
      <div class="pot-container">
        <div class="cooking-progress">
          <span
            class={`progress-step ${currentStep === "fat" ? "active" : addedFat ? "completed" : ""}`}
          >
            Fat
          </span>
          <span class="progress-arrow">→</span>
          <span
            class={`progress-step ${currentStep === "vegetable" ? "active" : addedVegetables.length > 0 && addedStock ? "completed" : ""}`}
          >
            Vegetables
          </span>
          <span class="progress-arrow">→</span>
          <span
            class={`progress-step ${currentStep === "stock" ? "active" : addedStock ? "completed" : ""}`}
          >
            Stock
          </span>
        </div>

        <div class="pot-wrapper">
          <div class="steam">
            <span class="steam-bubble"></span>
            <span class="steam-bubble"></span>
            <span class="steam-bubble"></span>
          </div>
          <div class="pot">
            <div class="pot-handle pot-handle-left"></div>
            <div class="pot-handle pot-handle-right"></div>
            <div class="pot-rim"></div>
            <div class="pot-body">
              <div class="pot-soup">
                <div class="pot-contents">
                  {!hasIngredients ? (
                    <p class="empty">Add ingredients!</p>
                  ) : (
                    <>
                      {addedFat && (
                        <p>{getIngredientDisplay(addedFat, "fats")}</p>
                      )}
                      {addedVegetables.map((v) => (
                        <p key={v}>{getIngredientDisplay(v, "vegetables")}</p>
                      ))}
                      {addedStock && (
                        <p>{getIngredientDisplay(addedStock, "stocks")}</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div class="pot-face">
              <div class="pot-eyes">
                <span class="pot-eye"></span>
                <span class="pot-eye"></span>
              </div>
              <div class="pot-mouth"></div>
              <div class="pot-blush pot-blush-left"></div>
              <div class="pot-blush pot-blush-right"></div>
            </div>
          </div>
        </div>

        {!hideButtons && (
          <div class="action-buttons">
            <button class="submit-btn" onClick={onSubmit} disabled={!canSubmit}>
              Serve
            </button>
            <button class="reset-btn" onClick={onReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
