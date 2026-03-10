import { Link } from 'react-router-dom';
import { Product } from '@/data/products';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card block group">
      <div className="aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4 border-t-2 border-foreground">
        <h3 className="font-heading text-sm font-bold uppercase tracking-wider">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="font-body text-sm font-semibold">${product.price}</span>
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map(color => (
              <span key={color} className="text-[10px] font-body text-muted-foreground">{color}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
