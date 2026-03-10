import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';

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
            <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Link to="/customize" className="btn-accent">Customize Now</Link>
              <Link to="/bulk-order" className="btn-outline">Bulk Order</Link>
            </div>
          </div>
          <div className="hidden lg:block w-[400px] border-l-4 border-foreground">
            <img
              src={products[0].images[0]}
              alt="StyleUnikon Hero"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-divider px-8 lg:px-16 py-16">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold">FEATURED</h2>
          <Link to="/shop" className="font-heading text-sm font-bold uppercase tracking-wider hover:text-accent transition-colors border-b-2 border-foreground pb-1">
            View All
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
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">THE CRAFT</h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-4">
              Every StyleUnikon tee starts as raw cotton and ends as a statement. We source our fabrics from certified mills, 
              print using state-of-the-art DTG and screen printing technology, and inspect every garment by hand.
            </p>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              Whether you're building a brand, outfitting a team, or expressing your identity — we make the T-shirt 
              that matches the ambition.
            </p>
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

      {/* Testimonials */}
      <section className="section-divider px-8 lg:px-16 py-16 bg-secondary">
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
    </Layout>
  );
};

export default Index;
