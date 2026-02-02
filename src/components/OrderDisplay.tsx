import type { Recipe } from '../types';

interface OrderDisplayProps {
  order: Recipe | null;
}

export function OrderDisplay({ order }: OrderDisplayProps) {
  return (
    <div class="order-display">
      Order: <span>{order ? order.name : 'Loading...'}</span>
    </div>
  );
}
