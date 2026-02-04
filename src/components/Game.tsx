import { useGameState } from "../hooks/useGameState";
import { OrderDisplay } from "./OrderDisplay";
import { RecipeModal } from "./RecipeModal";
import { CookingArea } from "./CookingArea";
import { MobileIngredients } from "./MobileIngredients";
import { FeedbackMessage } from "./FeedbackMessage";
import { PlayerLevel } from "./PlayerLevel";
import { LevelUpModal } from "./LevelUpModal";

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
    removeIngredient,
    resetSoup,
    checkSoup,
    nextOrder,
    clearFeedback,
    toggleRecipeModal,
    goToVegetableStep,
    goToStockStep,
    pinRecipe,
    canSubmit,
    currentStep,
    playerProgress,
  } = useGameState();

  const {
    level,
    xp,
    pendingLevelUp,
    clearLevelUp,
    unlockedIngredients,
    availableRecipes,
    getNewlyUnlockedRecipes,
  } = playerProgress;

  return (
    <div class="game-container">
      <header class="mobile-header">
        <button
          class="mobile-recipe-btn"
          onClick={toggleRecipeModal}
          title="Recipe Book"
        >
          📖
        </button>
        <OrderDisplay order={currentOrder} pinnedRecipeId={pinnedRecipeId} />
        <PlayerLevel level={level} xp={xp} />
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
        <button class="mobile-reset-btn" onClick={resetSoup}>
          Reset
        </button>
      </div>

      <MobileIngredients
        addedFat={addedFat}
        addedVegetables={addedVegetables}
        addedStock={addedStock}
        currentStep={currentStep}
        onAddIngredient={addIngredient}
        onRemoveIngredient={removeIngredient}
        onGoToVegetables={goToVegetableStep}
        onGoToStock={goToStockStep}
        onSubmit={checkSoup}
        unlockedIngredients={unlockedIngredients}
      />

      {showRecipeModal && (
        <RecipeModal
          onClose={toggleRecipeModal}
          pinnedRecipeId={pinnedRecipeId}
          onPinRecipe={pinRecipe}
          availableRecipes={availableRecipes}
        />
      )}

      {feedback && (
        <FeedbackMessage
          type={feedback}
          onDismiss={clearFeedback}
          onNextOrder={nextOrder}
        />
      )}

      {pendingLevelUp && !feedback && (
        <LevelUpModal
          level={pendingLevelUp}
          newRecipes={getNewlyUnlockedRecipes()}
          onClose={clearLevelUp}
        />
      )}
    </div>
  );
}
