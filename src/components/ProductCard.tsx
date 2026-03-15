import { Link } from 'react-router-dom';
import { Product, formatPrice } from '@/data/products';
import { motion } from 'framer-motion';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Link to={`/product/${product.id}`} className="product-card block group relative">
        <div className="aspect-[4/5] overflow-hidden bg-secondary relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
              <span className="font-heading text-sm font-bold bg-destructive text-destructive-foreground px-4 py-2">OUT OF STOCK</span>
            </div>
          )}
        </div>
        <div className="p-4 border-t-2 border-foreground">
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider">{product.name}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="font-body text-sm font-semibold">{formatPrice(product.price)}</span>
            <span className="font-body text-[10px] text-muted-foreground uppercase">{product.category}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
