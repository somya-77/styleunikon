import { Link } from 'react-router-dom';
import { Product, formatPrice, PLACEHOLDER_IMAGE } from '@/data/products';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { StockBadge } from '@/components/StockBadge';

const BADGE_STYLES: Record<string, string> = {
  new: 'bg-accent text-accent-foreground',
  bestseller: 'bg-primary text-primary-foreground',
  limited: 'bg-destructive text-destructive-foreground',
};

const BADGE_LABELS: Record<string, string> = {
  new: 'NEW',
  bestseller: 'BEST SELLER',
  limited: 'LIMITED',
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgSrc = product.images[0] || PLACEHOLDER_IMAGE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <Link to={`/product/${product.id}`} className="product-card block group relative">
        <div className="aspect-[4/5] overflow-hidden bg-secondary relative">
          {/* Skeleton loader */}
          {!imgLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />
          {/* Badge */}
          {product.badge && (
            <span className={`absolute top-3 left-3 font-heading text-[10px] font-bold uppercase px-3 py-1 z-10 ${BADGE_STYLES[product.badge]}`}>
              {BADGE_LABELS[product.badge]}
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
              <span className="font-heading text-sm font-bold bg-destructive text-destructive-foreground px-4 py-2">OUT OF STOCK</span>
            </div>
          )}
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-end justify-center opacity-0 group-hover:opacity-100">
            <span className="font-heading text-xs font-bold uppercase bg-background/90 text-foreground px-6 py-2 mb-4 backdrop-blur-sm">
              View Details
            </span>
          </div>
        </div>
        <div className="p-4 border-t-2 border-foreground">
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider">{product.name}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="font-heading text-sm font-extrabold text-accent">{formatPrice(product.price)}</span>
            <span className="font-body text-[10px] text-muted-foreground uppercase">{product.category}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
