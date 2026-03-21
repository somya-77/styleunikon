interface StockBadgeProps {
  stockQty: number;
  inStock: boolean;
  compact?: boolean;
}

export function StockBadge({ stockQty, inStock, compact = false }: StockBadgeProps) {
  if (!inStock || stockQty <= 0) {
    return (
      <span className={`inline-flex items-center gap-1 font-heading font-bold text-destructive bg-destructive/10 ${
        compact ? 'text-[9px] px-2 py-0.5' : 'text-xs px-3 py-1'
      }`}>
        ● Out of Stock
      </span>
    );
  }

  if (stockQty <= 20) {
    return (
      <span className={`inline-flex items-center gap-1 font-heading font-bold text-orange-600 bg-orange-100 ${
        compact ? 'text-[9px] px-2 py-0.5' : 'text-xs px-3 py-1'
      }`}>
        ● Only {stockQty} left
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 font-heading font-bold text-green-600 bg-green-100 ${
      compact ? 'text-[9px] px-2 py-0.5' : 'text-xs px-3 py-1'
    }`}>
      ● In Stock
    </span>
  );
}
