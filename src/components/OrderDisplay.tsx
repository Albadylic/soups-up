import type { Recipe } from '../types';

interface OrderDisplayProps {
  order: Recipe | null;
}

export function OrderDisplay({ order }: OrderDisplayProps) {
  return (
    <div class="order-display">
      <span class="order-label">Order:</span>
      <span class="order-name">{order ? order.name : "Loading..."}</span>
    </div>
  );
}
