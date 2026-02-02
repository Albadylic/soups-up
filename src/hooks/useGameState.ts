import { useState, useCallback, useEffect } from 'preact/hooks';
import type { GameState, Recipe, IngredientType } from '../types';
import recipes from '../data/recipes.json';

const getRandomRecipe = (): Recipe => {
  const index = Math.floor(Math.random() * recipes.length);
  return recipes[index];
};

export function useGameState() {
  const [state, setState] = useState<GameState>({
    currentOrder: null,
    addedFat: null,
    addedVegetables: [],
    addedStock: null,
    showRecipeModal: false,
    feedback: null,
  });

  // Initialize with a random order
  useEffect(() => {
    setState(prev => ({
      ...prev,
      currentOrder: getRandomRecipe(),
    }));
  }, []);

  const addIngredient = useCallback((type: IngredientType, id: string) => {
    setState(prev => {
      // Enforce order: fat first, then vegetables, then stock
      if (type === 'fat') {
        if (prev.addedFat) return prev; // Already have fat
        return { ...prev, addedFat: id };
      }

      if (type === 'vegetable') {
        if (!prev.addedFat) return prev; // Need fat first
        if (prev.addedStock) return prev; // Already added stock
        if (prev.addedVegetables.length >= 3) return prev; // Max 3 vegetables
        if (prev.addedVegetables.includes(id)) return prev; // Already added
        return { ...prev, addedVegetables: [...prev.addedVegetables, id] };
      }

      if (type === 'stock') {
        if (!prev.addedFat) return prev; // Need fat first
        if (prev.addedVegetables.length === 0) return prev; // Need at least 1 vegetable
        if (prev.addedStock) return prev; // Already have stock
        return { ...prev, addedStock: id };
      }

      return prev;
    });
  }, []);

  const resetSoup = useCallback(() => {
    setState(prev => ({
      ...prev,
      addedFat: null,
      addedVegetables: [],
      addedStock: null,
    }));
  }, []);

  const checkSoup = useCallback(() => {
    setState(prev => {
      if (!prev.currentOrder || !prev.addedFat || !prev.addedStock) {
        return { ...prev, feedback: 'failure' };
      }

      const order = prev.currentOrder;

      // Check fat matches
      if (prev.addedFat !== order.fat) {
        return { ...prev, feedback: 'failure' };
      }

      // Check vegetables match (order matters in this implementation)
      const veggiesMatch =
        prev.addedVegetables.length === order.vegetables.length &&
        prev.addedVegetables.every((v, i) => v === order.vegetables[i]);

      if (!veggiesMatch) {
        return { ...prev, feedback: 'failure' };
      }

      // Check stock matches
      if (prev.addedStock !== order.stock) {
        return { ...prev, feedback: 'failure' };
      }

      return { ...prev, feedback: 'success' };
    });
  }, []);

  const nextOrder = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentOrder: getRandomRecipe(),
      addedFat: null,
      addedVegetables: [],
      addedStock: null,
      feedback: null,
    }));
  }, []);

  const clearFeedback = useCallback(() => {
    setState(prev => ({ ...prev, feedback: null }));
  }, []);

  const toggleRecipeModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      showRecipeModal: !prev.showRecipeModal,
    }));
  }, []);

  const canSubmit = Boolean(state.addedFat && state.addedVegetables.length > 0 && state.addedStock);

  const currentStep = (): 'fat' | 'vegetable' | 'stock' | 'ready' => {
    if (!state.addedFat) return 'fat';
    if (state.addedVegetables.length === 0 || (!state.addedStock && state.addedVegetables.length < 3)) return 'vegetable';
    if (!state.addedStock) return 'stock';
    return 'ready';
  };

  return {
    ...state,
    addIngredient,
    resetSoup,
    checkSoup,
    nextOrder,
    clearFeedback,
    toggleRecipeModal,
    canSubmit,
    currentStep: currentStep(),
  };
}
