interface RecipeBookIconProps {
  onClick: () => void;
}

export function RecipeBookIcon({ onClick }: RecipeBookIconProps) {
  return (
    <button class="recipe-book-icon" onClick={onClick} title="Recipe Book">
      📖
    </button>
  );
}
