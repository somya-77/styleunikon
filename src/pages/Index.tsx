import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';

const HIGHLIGHTS = [
  { value: '50K+', label: 'TEES PRINTED' },
  { value: '200+', label: 'BRANDS SERVED' },
  { value: '4.9★', label: 'CUSTOMER RATING' },
  { value: '48H', label: 'AVG. DELIVERY' },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center section-divider">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-0">
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-0">
            <p className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6 animate-fade-in">
              Premium Custom Apparel
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              WEAR YOUR<br />
              BRAND.<br />
              <span className="text-accent">PRINT YOUR</span><br />
              IDENTITY.
            </h1>
            <div className="flex flex-wrap gap-3 mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Link to="/customize" className="btn-accent">Customize Now</Link>
              <Link to="/bulk-order" className="btn-outline">Bulk Order</Link>
            </div>

            {/* Highlights row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '0.35s' }}>
              {HIGHLIGHTS.map(h => (
                <div key={h.label} className="border-l-4 border-accent pl-4">
                  <span className="font-heading text-2xl md:text-3xl font-extrabold block">{h.value}</span>
                  <span className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{h.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero product stack — 2 products stacked on the right */}
          <div className="hidden lg:grid grid-rows-2 w-[400px] border-l-4 border-foreground">
            <div className="relative overflow-hidden border-b-4 border-foreground group">
              <img
                src={products[0].images[0]}
                alt={products[0].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <Link
                to={`/product/${products[0].id}`}
                className="absolute bottom-0 left-0 right-0 bg-primary/90 text-primary-foreground px-4 py-3 flex items-center justify-between transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground"
              >
                <span className="font-heading text-xs font-bold uppercase tracking-wider">{products[0].name}</span>
                <span className="font-heading text-sm font-extrabold">${products[0].price}</span>
              </Link>
            </div>
            <div className="relative overflow-hidden group">
              <img
                src={products[1].images[0]}
                alt={products[1].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <Link
                to={`/product/${products[1].id}`}
                className="absolute bottom-0 left-0 right-0 bg-primary/90 text-primary-foreground px-4 py-3 flex items-center justify-between transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground"
              >
                <span className="font-heading text-xs font-bold uppercase tracking-wider">{products[1].name}</span>
                <span className="font-heading text-sm font-extrabold">${products[1].price}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Hero Products — visible only on mobile */}
      <section className="lg:hidden section-divider">
        <div className="grid grid-cols-2 gap-0">
          {products.slice(0, 2).map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="relative aspect-[3/4] overflow-hidden group border-r-2 last:border-r-0 border-foreground"
            >
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-primary-foreground p-3">
                <span className="font-heading text-[10px] font-bold uppercase block">{product.name}</span>
                <span className="font-heading text-xs font-extrabold">${product.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Highlights bar — full width accent strip */}
      <section className="section-divider bg-accent">
        <div className="px-8 lg:px-16 py-6 flex flex-wrap items-center justify-between gap-4">
          <span className="font-heading text-sm font-extrabold text-accent-foreground">FREE SHIPPING ON 200+ UNITS</span>
          <span className="font-heading text-sm font-extrabold text-accent-foreground">•</span>
          <span className="font-heading text-sm font-extrabold text-accent-foreground">DTG & SCREEN PRINTING</span>
          <span className="font-heading text-sm font-extrabold text-accent-foreground">•</span>
          <span className="font-heading text-sm font-extrabold text-accent-foreground">100% ORGANIC COTTON</span>
          <span className="font-heading text-sm font-extrabold text-accent-foreground">•</span>
          <span className="font-heading text-sm font-extrabold text-accent-foreground">HAND-INSPECTED</span>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-divider px-8 lg:px-16 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Curated Selection</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">FEATURED</h2>
          </div>
          <Link to="/shop" className="font-heading text-sm font-bold uppercase tracking-wider hover:text-accent transition-colors border-b-2 border-foreground pb-1">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.slice(0, 3).map((product, i) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-divider px-8 lg:px-16 py-16 bg-primary text-primary-foreground">
        <p className="font-body text-xs uppercase tracking-[0.3em] opacity-50 mb-6">Why StyleUnikon</p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-2">
          HIGH QUALITY FABRIC.
        </h2>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-2">
          FAST PRINTING.
        </h2>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-2">
          <span className="text-accent">BULK DISCOUNTS.</span>
        </h2>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          TRUSTED BY COMPANIES.
        </h2>
      </section>

      {/* Brand Story */}
      <section className="section-divider px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">THE CRAFT</h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-4">
              Every StyleUnikon tee starts as raw cotton and ends as a statement. We source our fabrics from certified mills, 
              print using state-of-the-art DTG and screen printing technology, and inspect every garment by hand.
            </p>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-6">
              Whether you're building a brand, outfitting a team, or expressing your identity — we make the T-shirt 
              that matches the ambition.
            </p>
            <Link to="/about" className="btn-outline inline-block">Learn More</Link>
          </div>
          <div className="border-2 border-foreground">
            <img
              src={products[1].images[0]}
              alt="Brand story"
              className="w-full h-full object-cover aspect-[4/3]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* More Products Row */}
      <section className="section-divider px-8 lg:px-16 py-16 bg-secondary">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">New Arrivals</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">MORE TO EXPLORE</h2>
          </div>
          <Link to="/shop" className="font-heading text-sm font-bold uppercase tracking-wider hover:text-accent transition-colors border-b-2 border-foreground pb-1">
            Shop All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.slice(3, 6).map((product, i) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-divider px-8 lg:px-16 py-16">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10">WHAT THEY SAY</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { quote: "The quality blew us away. Our entire team wears them daily.", author: "SARAH K.", role: "Startup Founder" },
            { quote: "Best custom tees we've ever ordered. The print quality is insane.", author: "JAMES L.", role: "Creative Director" },
            { quote: "Bulk ordering was seamless. Fast delivery, no defects. Will reorder.", author: "MARIA R.", role: "Event Manager" },
          ].map((t, i) => (
            <div key={i} className="border-2 border-foreground p-6 bg-card">
              <p className="font-body text-sm leading-relaxed mb-6">"{t.quote}"</p>
              <p className="font-heading text-sm font-bold">{t.author}</p>
              <p className="font-body text-xs text-muted-foreground">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 lg:px-16 py-20 bg-primary text-primary-foreground text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">READY TO PRINT?</h2>
        <p className="font-body text-sm opacity-70 mb-8 max-w-md mx-auto">
          Start designing your custom tee or get a bulk quote for your team.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/customize" className="btn-accent">Start Designing</Link>
          <Link to="/bulk-order" className="btn-outline border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            Get Bulk Quote
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
