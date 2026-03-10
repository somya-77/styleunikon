import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { products, SIZES, COLORS } from '@/data/products';
import { useState } from 'react';

const Shop = () => {
  const [filterSize, setFilterSize] = useState<string>('');
  const [filterColor, setFilterColor] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');

  let filtered = [...products];
  if (filterSize) filtered = filtered.filter(p => p.sizes.includes(filterSize));
  if (filterColor) filtered = filtered.filter(p => p.colors.includes(filterColor));
  if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);

  return (
    <Layout>
      <div className="px-8 lg:px-16 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8">ALL PRODUCTS</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          {/* Products */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((product, i) => (
                <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="font-body text-muted-foreground py-12 text-center">No products match your filters.</p>
            )}
          </div>

          {/* Filters sidebar */}
          <aside className="order-first lg:order-last">
            <div className="border-2 border-foreground p-6 sticky top-20">
              <h3 className="font-heading text-sm font-bold uppercase mb-6">FILTERS</h3>

              <div className="mb-6">
                <h4 className="font-heading text-xs font-bold uppercase mb-3 text-muted-foreground">SIZE</h4>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => setFilterSize(filterSize === size ? '' : size)}
                      className={`px-3 py-2 text-xs font-heading font-bold border-2 transition-all duration-200 ${
                        filterSize === size
                          ? 'border-foreground bg-primary text-primary-foreground'
                          : 'border-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-heading text-xs font-bold uppercase mb-3 text-muted-foreground">COLOR</h4>
                <div className="flex flex-col gap-1">
                  {COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => setFilterColor(filterColor === color ? '' : color)}
                      className={`text-left px-3 py-2 text-xs font-heading font-bold border-2 transition-all duration-200 ${
                        filterColor === color
                          ? 'border-foreground bg-primary text-primary-foreground'
                          : 'border-transparent hover:border-foreground'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

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

              <button
                onClick={() => { setFilterSize(''); setFilterColor(''); setSortBy(''); }}
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
