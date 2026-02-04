import { useState, useCallback, useEffect } from 'preact/hooks';
import type { GameState, Recipe, IngredientType } from '../types';
import { usePlayerProgress } from './usePlayerProgress';

export function useGameState() {
  const playerProgress = usePlayerProgress();
  const { availableRecipes, awardXP } = playerProgress;

  const getRandomRecipe = useCallback((): Recipe | null => {
    if (availableRecipes.length === 0) return null;
    const index = Math.floor(Math.random() * availableRecipes.length);
    return availableRecipes[index];
  }, [availableRecipes]);

  const [state, setState] = useState<GameState>({
    currentOrder: null,
    addedFat: null,
    addedVegetables: [],
    addedStock: null,
    showRecipeModal: false,
    feedback: null,
    readyForVegetables: false,
    readyForStock: false,
    pinnedRecipeId: null,
  });

  // Initialize with a random order from available recipes
  useEffect(() => {
    if (state.currentOrder === null && availableRecipes.length > 0) {
      setState(prev => ({
        ...prev,
        currentOrder: getRandomRecipe(),
      }));
    }
  }, [availableRecipes, state.currentOrder, getRandomRecipe]);

  const addIngredient = useCallback((type: IngredientType, id: string) => {
    setState(prev => {
      // Enforce order: fat first, then vegetables, then stock
      if (type === 'fat') {
        // Allow swapping fat (replaces existing selection)
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
        // Allow swapping stock
        return { ...prev, addedStock: id };
      }

      return prev;
    });
  }, []);

  const removeIngredient = useCallback((type: IngredientType, id: string) => {
    setState(prev => {
      if (type === 'fat' && prev.addedFat === id) {
        // Removing fat clears everything since vegetables and stock depend on it
        return {
          ...prev,
          addedFat: null,
          addedVegetables: [],
          addedStock: null,
          readyForVegetables: false,
          readyForStock: false,
        };
      }

      if (type === 'vegetable' && prev.addedVegetables.includes(id)) {
        const newVegetables = prev.addedVegetables.filter(v => v !== id);
        return {
          ...prev,
          addedVegetables: newVegetables,
          // If no vegetables left, also clear stock and reset ready states
          addedStock: newVegetables.length === 0 ? null : prev.addedStock,
          readyForStock: newVegetables.length === 0 ? false : prev.readyForStock,
        };
      }

      if (type === 'stock' && prev.addedStock === id) {
        return { ...prev, addedStock: null };
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
      readyForVegetables: false,
      readyForStock: false,
    }));
  }, []);

  const goToVegetableStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      readyForVegetables: true,
    }));
  }, []);

  const goToStockStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      readyForStock: true,
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

      // Check vegetables match (order doesn't matter)
      const veggiesMatch =
        prev.addedVegetables.length === order.vegetables.length &&
        prev.addedVegetables.every(v => order.vegetables.includes(v));

      if (!veggiesMatch) {
        return { ...prev, feedback: 'failure' };
      }

      // Check stock matches
      if (prev.addedStock !== order.stock) {
        return { ...prev, feedback: 'failure' };
      }

      // Award XP for successful recipe
      awardXP(order.xp);

      return { ...prev, feedback: 'success', pinnedRecipeId: null };
    });
  }, [awardXP]);

  const nextOrder = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentOrder: getRandomRecipe(),
      addedFat: null,
      addedVegetables: [],
      addedStock: null,
      feedback: null,
      readyForVegetables: false,
      readyForStock: false,
    }));
  }, [getRandomRecipe]);

  const clearFeedback = useCallback(() => {
    setState(prev => ({
      ...prev,
      feedback: null,
      addedFat: null,
      addedVegetables: [],
      addedStock: null,
      readyForVegetables: false,
      readyForStock: false,
    }));
  }, []);

  const toggleRecipeModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      showRecipeModal: !prev.showRecipeModal,
    }));
  }, []);

  const pinRecipe = useCallback((recipeId: string) => {
    setState(prev => ({
      ...prev,
      pinnedRecipeId: prev.pinnedRecipeId === recipeId ? null : recipeId,
      showRecipeModal: false,
    }));
  }, []);

  const canSubmit = Boolean(state.addedFat && state.addedVegetables.length > 0 && state.addedStock);

  const currentStep = (): 'fat' | 'vegetable' | 'stock' => {
    if (!state.readyForVegetables) return 'fat';
    if (!state.readyForStock) return 'vegetable';
    return 'stock';
  };

  return {
    ...state,
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
    currentStep: currentStep(),
    playerProgress,
  };
}
