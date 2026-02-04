export const LEVEL_THRESHOLDS = [
  { level: 1, xpRequired: 0 },
  { level: 2, xpRequired: 25 },
  { level: 3, xpRequired: 75 },
  { level: 4, xpRequired: 175 },
  { level: 5, xpRequired: 350 },
];

export const INGREDIENT_UNLOCKS: Record<number, {
  fats: string[];
  vegetables: string[];
  stocks: string[];
}> = {
  1: {
    fats: ['vegan-butter'],
    vegetables: ['onions', 'carrots'],
    stocks: ['vegetable'],
  },
  2: {
    fats: [],
    vegetables: ['potato', 'garlic'],
    stocks: [],
  },
  3: {
    fats: ['oil'],
    vegetables: ['mushrooms'],
    stocks: ['mushroom'],
  },
  4: {
    fats: [],
    vegetables: ['tomato', 'cabbage'],
    stocks: [],
  },
  5: {
    fats: [],
    vegetables: [],
    stocks: ['seaweed'],
  },
};

export function getUnlockedIngredients(playerLevel: number): {
  fats: string[];
  vegetables: string[];
  stocks: string[];
} {
  const unlocked = {
    fats: [] as string[],
    vegetables: [] as string[],
    stocks: [] as string[],
  };

  for (let level = 1; level <= playerLevel; level++) {
    const levelUnlocks = INGREDIENT_UNLOCKS[level];
    if (levelUnlocks) {
      unlocked.fats.push(...levelUnlocks.fats);
      unlocked.vegetables.push(...levelUnlocks.vegetables);
      unlocked.stocks.push(...levelUnlocks.stocks);
    }
  }

  return unlocked;
}

export function getLevelFromXP(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].xpRequired) {
      return LEVEL_THRESHOLDS[i].level;
    }
  }
  return 1;
}

export function getXPForNextLevel(currentLevel: number): number | null {
  const nextLevel = LEVEL_THRESHOLDS.find(t => t.level === currentLevel + 1);
  return nextLevel ? nextLevel.xpRequired : null;
}

export function getXPForCurrentLevel(currentLevel: number): number {
  const current = LEVEL_THRESHOLDS.find(t => t.level === currentLevel);
  return current ? current.xpRequired : 0;
}
