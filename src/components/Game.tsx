import { useGameState } from '../hooks/useGameState';
import { OrderDisplay } from './OrderDisplay';
import { RecipeModal } from './RecipeModal';
import { Sidebar } from './Sidebar';
import { CookingArea } from './CookingArea';
import { FeedbackMessage } from './FeedbackMessage';

export function Game() {
  const {
    currentOrder,
    addedFat,
    addedVegetables,
    addedStock,
    showRecipeModal,
    feedback,
    addIngredient,
    resetSoup,
    checkSoup,
    nextOrder,
    clearFeedback,
    toggleRecipeModal,
    canSubmit,
    currentStep,
  } = useGameState();

  return (
    <div class="game-container">
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
        <OrderDisplay order={currentOrder} />
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

      {showRecipeModal && <RecipeModal onClose={toggleRecipeModal} />}

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
