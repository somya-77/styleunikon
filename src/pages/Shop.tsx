import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { products, CATEGORIES } from '@/data/products';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('');

  let filtered = activeCategory === 'all' ? [...products] : products.filter(p => p.category === activeCategory);
  if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);

  return (
    <Layout>
      <div className="px-8 lg:px-16 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Browse Collection</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8">ALL PRODUCTS</h1>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-heading font-bold uppercase border-2 transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'border-foreground bg-primary text-primary-foreground'
                  : 'border-foreground/30 hover:border-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8">
          {/* Products */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
            {filtered.length === 0 && (
              <p className="font-body text-muted-foreground py-12 text-center">No products in this category.</p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="order-first lg:order-last">
            <div className="glass-card p-6 sticky top-20">
              <h3 className="font-heading text-sm font-bold uppercase mb-6">SORT & FILTER</h3>

              <div className="mb-6">
                <h4 className="font-heading text-xs font-bold uppercase mb-3 text-muted-foreground">SORT BY</h4>
                <div className="flex flex-col gap-1">
                  {[
                    { label: 'PRICE: LOW → HIGH', value: 'price-asc' },
                    { label: 'PRICE: HIGH → LOW', value: 'price-desc' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(sortBy === opt.value ? '' : opt.value)}
                      className={`text-left px-3 py-2 text-xs font-heading font-bold border-2 transition-all duration-200 ${
                        sortBy === opt.value
                          ? 'border-foreground bg-primary text-primary-foreground'
                          : 'border-transparent hover:border-foreground'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className="font-body text-xs text-muted-foreground mb-2">{filtered.length} products</p>
              </div>

              <button
                onClick={() => { setActiveCategory('all'); setSortBy(''); }}
                className="btn-outline w-full text-xs py-2"
              >
                Clear All
              </button>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
