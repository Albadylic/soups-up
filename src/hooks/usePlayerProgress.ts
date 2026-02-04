import { useState, useCallback, useEffect } from 'preact/hooks';
import type { PlayerProgress, Recipe } from '../types';
import { getLevelFromXP, getUnlockedIngredients } from '../data/levelConfig';
import recipes from '../data/recipes.json';

const STORAGE_KEY = 'soup-kitchen-progress';

function loadProgress(): PlayerProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        level: parsed.level ?? 1,
        xp: parsed.xp ?? 0,
      };
    }
  } catch {
    // Ignore storage errors
  }
  return { level: 1, xp: 0 };
}

function saveProgress(progress: PlayerProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage errors
  }
}

export function usePlayerProgress() {
  const [progress, setProgress] = useState<PlayerProgress>(loadProgress);
  const [pendingLevelUp, setPendingLevelUp] = useState<number | null>(null);

  // Save progress whenever it changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const awardXP = useCallback((amount: number) => {
    setProgress(prev => {
      const newXP = prev.xp + amount;
      const newLevel = getLevelFromXP(newXP);

      // Check if player leveled up
      if (newLevel > prev.level) {
        setPendingLevelUp(newLevel);
      }

      return { xp: newXP, level: newLevel };
    });
  }, []);

  const clearLevelUp = useCallback(() => {
    setPendingLevelUp(null);
  }, []);

  const unlockedIngredients = getUnlockedIngredients(progress.level);

  // Check if a recipe is available based on unlocked ingredients
  const isRecipeAvailable = useCallback((recipe: Recipe): boolean => {
    // Check fat
    if (!unlockedIngredients.fats.includes(recipe.fat)) {
      return false;
    }
    // Check all vegetables
    for (const veg of recipe.vegetables) {
      if (!unlockedIngredients.vegetables.includes(veg)) {
        return false;
      }
    }
    // Check stock
    if (!unlockedIngredients.stocks.includes(recipe.stock)) {
      return false;
    }
    return true;
  }, [unlockedIngredients]);

  // Get available recipes (those with all ingredients unlocked)
  const availableRecipes = (recipes as Recipe[]).filter(isRecipeAvailable);

  // Get newly unlocked recipes at the pending level
  const getNewlyUnlockedRecipes = useCallback((): Recipe[] => {
    if (!pendingLevelUp) return [];

    const prevUnlocked = getUnlockedIngredients(pendingLevelUp - 1);
    const currentUnlocked = getUnlockedIngredients(pendingLevelUp);

    const wasAvailable = (recipe: Recipe): boolean => {
      if (!prevUnlocked.fats.includes(recipe.fat)) return false;
      for (const veg of recipe.vegetables) {
        if (!prevUnlocked.vegetables.includes(veg)) return false;
      }
      if (!prevUnlocked.stocks.includes(recipe.stock)) return false;
      return true;
    };

    const isNowAvailable = (recipe: Recipe): boolean => {
      if (!currentUnlocked.fats.includes(recipe.fat)) return false;
      for (const veg of recipe.vegetables) {
        if (!currentUnlocked.vegetables.includes(veg)) return false;
      }
      if (!currentUnlocked.stocks.includes(recipe.stock)) return false;
      return true;
    };

    return (recipes as Recipe[]).filter(r => !wasAvailable(r) && isNowAvailable(r));
  }, [pendingLevelUp]);

  return {
    level: progress.level,
    xp: progress.xp,
    awardXP,
    pendingLevelUp,
    clearLevelUp,
    unlockedIngredients,
    availableRecipes,
    isRecipeAvailable,
    getNewlyUnlockedRecipes,
  };
}
