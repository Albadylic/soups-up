import type { Recipe } from '../types';

interface LevelUpModalProps {
  level: number;
  newRecipes: Recipe[];
  onClose: () => void;
}

export function LevelUpModal({ level, newRecipes, onClose }: LevelUpModalProps) {
  return (
    <div class="modal-overlay" onClick={onClose}>
      <div class="level-up-modal" onClick={e => e.stopPropagation()}>
        <div class="level-up-header">
          <h2>Level Up!</h2>
          <div class="level-up-badge">Level {level}</div>
        </div>
        {newRecipes.length > 0 && (
          <div class="new-recipes">
            <h3>New Recipes Unlocked</h3>
            <ul>
              {newRecipes.map(recipe => (
                <li key={recipe.id}>{recipe.name}</li>
              ))}
            </ul>
          </div>
        )}
        <button class="level-up-continue" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
}
