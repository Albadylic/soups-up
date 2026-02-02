import { useGameState } from "../hooks/useGameState";
import { OrderDisplay } from "./OrderDisplay";
import { RecipeModal } from "./RecipeModal";
import { Sidebar } from "./Sidebar";
import { CookingArea } from "./CookingArea";
import { MobileIngredients } from "./MobileIngredients";
import { FeedbackMessage } from "./FeedbackMessage";

export function Game() {
  const {
    currentOrder,
    addedFat,
    addedVegetables,
    addedStock,
    showRecipeModal,
    feedback,
    pinnedRecipeId,
    addIngredient,
    resetSoup,
    checkSoup,
    nextOrder,
    clearFeedback,
    toggleRecipeModal,
    goToStockStep,
    pinRecipe,
    canSubmit,
    currentStep,
  } = useGameState();

  return (
    <div class="game-container">
      {/* Desktop Layout */}
      <Sidebar
        addedFat={addedFat}
        addedVegetables={addedVegetables}
        addedStock={addedStock}
        currentStep={currentStep}
        onAddIngredient={addIngredient}
        onReset={resetSoup}
        onToggleRecipeModal={toggleRecipeModal}
      />

      <div class="order-area">
        <OrderDisplay order={currentOrder} pinnedRecipeId={pinnedRecipeId} />
      </div>

      <CookingArea
        addedFat={addedFat}
        addedVegetables={addedVegetables}
        addedStock={addedStock}
        currentStep={currentStep}
        canSubmit={canSubmit}
        onSubmit={checkSoup}
        onReset={resetSoup}
      />

      {/* Mobile Layout */}
      <header class="mobile-header">
        <button
          class="mobile-recipe-btn"
          onClick={toggleRecipeModal}
          title="Recipe Book"
        >
          📖
        </button>
        <OrderDisplay order={currentOrder} pinnedRecipeId={pinnedRecipeId} />
      </header>

      <div class="mobile-pot-area">
        <CookingArea
          addedFat={addedFat}
          addedVegetables={addedVegetables}
          addedStock={addedStock}
          currentStep={currentStep}
          canSubmit={canSubmit}
          onSubmit={checkSoup}
          onReset={resetSoup}
          hideButtons
        />
      </div>

      <MobileIngredients
        addedFat={addedFat}
        addedVegetables={addedVegetables}
        addedStock={addedStock}
        currentStep={currentStep}
        onAddIngredient={addIngredient}
        onNextStep={goToStockStep}
        canSubmit={canSubmit}
        onSubmit={checkSoup}
        onReset={resetSoup}
      />

      {showRecipeModal && (
        <RecipeModal
          onClose={toggleRecipeModal}
          pinnedRecipeId={pinnedRecipeId}
          onPinRecipe={pinRecipe}
        />
      )}

      {feedback && (
        <FeedbackMessage
          type={feedback}
          onDismiss={clearFeedback}
          onNextOrder={nextOrder}
        />
      )}
    </div>
  );
}
