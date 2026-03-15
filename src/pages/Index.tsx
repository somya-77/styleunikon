import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { products, CATEGORIES, formatPrice } from '@/data/products';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Zap, Users, Award, Printer, MapPin, Phone, Clock, Coffee, Frame, KeyRound, Gift } from 'lucide-react';

const HIGHLIGHTS = [
  { value: '50K+', label: 'PRODUCTS PRINTED' },
  { value: '200+', label: 'BRANDS SERVED' },
  { value: '5.0★', label: 'GOOGLE RATING' },
  { value: '24H', label: 'FAST DELIVERY' },
];

const TRUST_ITEMS = [
  { icon: Award, title: 'High-Quality Fabric', desc: 'Premium cotton that feels great and lasts long' },
  { icon: Zap, title: 'Fast Printing', desc: 'Quick turnaround without compromising quality' },
  { icon: Users, title: 'Bulk Discounts', desc: 'Special pricing for orders of 10+ pieces' },
  { icon: Star, title: 'Trusted Locally', desc: 'Serving Ahmedabad businesses since day one' },
  { icon: Printer, title: 'Premium Print', desc: 'DTG & screen printing for photo-quality results' },
];

const PRODUCT_CATEGORIES = [
  { icon: '👕', title: 'Custom T-Shirts', desc: 'Screen & DTG printed tees', link: '/shop', price: 'From ₹299' },
  { icon: '☕', title: 'Coffee Mugs', desc: 'Photo & logo printed mugs', link: '/shop', price: 'From ₹249' },
  { icon: '🖼️', title: 'Wooden Frames', desc: 'Engraved & photo frames', link: '/shop', price: 'From ₹399' },
  { icon: '🔑', title: 'Keychains', desc: 'Custom wooden & photo keychains', link: '/shop', price: 'From ₹149' },
  { icon: '🎁', title: 'Corporate Gifts', desc: 'Branded gift sets & combos', link: '/shop', price: 'From ₹599' },
];

const TESTIMONIALS = [
  { quote: 'Very good service and best quality of work.', author: 'TWINKLE SHAH', rating: 5 },
  { quote: 'Best place to get your customised gifts.', author: 'RAJIV SHAH', rating: 5 },
  { quote: 'At this price they provide the best quality of t-shirts with prints.', author: 'PURVANSHI SHAH', rating: 5 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center section-divider relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-0 relative z-10">
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-0">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6"
            >
              Customize T-shirt House — Ahmedabad
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] mb-8"
            >
              WEAR YOUR<br />
              BRAND.<br />
              <span className="text-accent">PRINT YOUR</span><br />
              IDENTITY.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link to="/customize" className="btn-accent">Customize Now</Link>
              <Link to="/bulk-order" className="btn-outline">Bulk Order</Link>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="border-l-4 border-accent pl-4"
                >
                  <span className="font-heading text-2xl md:text-3xl font-extrabold block">{h.value}</span>
                  <span className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{h.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="hidden lg:grid grid-rows-2 w-[400px] border-l-4 border-foreground">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative overflow-hidden border-b-4 border-foreground group"
            >
              <img src={products[0].images[0]} alt={products[0].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <Link to={`/product/${products[0].id}`}
                className="absolute bottom-0 left-0 right-0 bg-primary/90 text-primary-foreground px-4 py-3 flex items-center justify-between transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                <span className="font-heading text-xs font-bold uppercase tracking-wider">{products[0].name}</span>
                <span className="font-heading text-sm font-extrabold">{formatPrice(products[0].price)}</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative overflow-hidden group"
            >
              <img src={products[1].images[0]} alt={products[1].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <Link to={`/product/${products[1].id}`}
                className="absolute bottom-0 left-0 right-0 bg-primary/90 text-primary-foreground px-4 py-3 flex items-center justify-between transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                <span className="font-heading text-xs font-bold uppercase tracking-wider">{products[1].name}</span>
                <span className="font-heading text-sm font-extrabold">{formatPrice(products[1].price)}</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile Hero Products */}
      <section className="lg:hidden section-divider">
        <div className="grid grid-cols-2 gap-0">
          {products.slice(0, 2).map(product => (
            <Link key={product.id} to={`/product/${product.id}`}
              className="relative aspect-[3/4] overflow-hidden group border-r-2 last:border-r-0 border-foreground">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-primary-foreground p-3">
                <span className="font-heading text-[10px] font-bold uppercase block">{product.name}</span>
                <span className="font-heading text-xs font-extrabold">{formatPrice(product.price)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Highlights bar */}
      <section className="section-divider bg-accent">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="px-8 lg:px-16 py-6 flex flex-wrap items-center justify-between gap-4"
        >
          <span className="font-heading text-sm font-extrabold text-accent-foreground">T-SHIRTS • MUGS • FRAMES • KEYCHAINS • CORPORATE GIFTS</span>
        </motion.div>
      </section>

      {/* Product Categories */}
      <section className="section-divider px-8 lg:px-16 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">What We Offer</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10">OUR PRODUCTS</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PRODUCT_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link to={cat.link}
                className="glass-card p-6 block hover:shadow-[var(--shadow-hard)] hover:-translate-y-1 transition-all duration-300">
                <span className="text-3xl block mb-3">{cat.icon}</span>
                <h3 className="font-heading text-sm font-bold mb-1">{cat.title}</h3>
                <p className="font-body text-xs text-muted-foreground mb-3">{cat.desc}</p>
                <span className="font-heading text-xs font-extrabold text-accent">{cat.price}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-divider px-8 lg:px-16 py-16 bg-secondary/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Curated Selection</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">FEATURED</h2>
          </div>
          <Link to="/shop" className="font-heading text-sm font-bold uppercase tracking-wider hover:text-accent transition-colors border-b-2 border-foreground pb-1">
            View All →
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Why Customers Choose Us */}
      <section className="section-divider px-8 lg:px-16 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Trust & Quality</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10">WHY CUSTOMERS CHOOSE US</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card p-6 hover:shadow-[var(--shadow-hard)] transition-shadow duration-300"
            >
              <item.icon size={28} className="text-accent mb-4" />
              <h3 className="font-heading text-sm font-bold mb-2">{item.title}</h3>
              <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Big Statement */}
      <section className="section-divider px-8 lg:px-16 py-16 bg-primary text-primary-foreground overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] opacity-50 mb-6">Why Customize T-shirt House</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-2">HIGH QUALITY FABRIC.</h2>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-2">FAST PRINTING.</h2>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-2"><span className="text-accent">BULK DISCOUNTS.</span></h2>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">TRUSTED BY LOCAL BUSINESSES.</h2>
        </motion.div>
      </section>

      {/* Bulk Pricing */}
      <section className="section-divider px-8 lg:px-16 py-16 bg-accent/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Save More</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10">BULK PRICING</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { range: '10–25 pieces', price: '₹279/piece', highlight: false },
            { range: '25–50 pieces', price: '₹249/piece', highlight: true },
            { range: '50+ pieces', price: '₹219/piece', highlight: false },
          ].map((tier, i) => (
            <motion.div
              key={tier.range}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`border-2 border-foreground p-8 text-center ${tier.highlight ? 'bg-accent text-accent-foreground' : 'bg-card'}`}
            >
              <p className="font-heading text-sm font-bold uppercase mb-2">{tier.range}</p>
              <p className="font-heading text-3xl font-extrabold">{tier.price}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/bulk-order" className="btn-primary inline-block">Get Bulk Quote</Link>
        </div>
      </section>

      {/* More Products */}
      <section className="section-divider px-8 lg:px-16 py-16 bg-secondary">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">New Categories</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">MUGS, FRAMES & MORE</h2>
          </div>
          <Link to="/shop" className="font-heading text-sm font-bold uppercase tracking-wider hover:text-accent transition-colors border-b-2 border-foreground pb-1">
            Shop All →
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.filter(p => p.category !== 'tshirts').slice(0, 4).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-divider px-8 lg:px-16 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10">WHAT OUR CUSTOMERS SAY</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card p-6 hover:shadow-[var(--shadow-hard)] transition-shadow duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="font-body text-sm leading-relaxed mb-6">"{t.quote}"</p>
              <p className="font-heading text-xs font-bold">— {t.author}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-divider px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">THE CRAFT</h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-4">
              Welcome to Customized T-shirt House, your premier destination for personalized apparel and gifts. 
              We specialize in high-quality custom printing using techniques like screen printing and DTG printing.
            </p>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-6">
              Perfect for businesses, colleges, events, and personal designs. From T-shirts to mugs, 
              wooden frames to corporate gifts — we bring your ideas to life.
            </p>
            <Link to="/about" className="btn-outline inline-block">Learn More</Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-2 border-foreground"
          >
            <img src={products[1].images[0]} alt="Brand story" className="w-full h-full object-cover aspect-[4/3]" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* Contact / Visit Store */}
      <section className="section-divider px-8 lg:px-16 py-16 bg-secondary/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Visit Us</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10">CONTACT & LOCATION</h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-8">
            <h3 className="font-heading text-lg font-bold mb-6">CUSTOMIZE T-SHIRT HOUSE</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-1 shrink-0" />
                <p className="font-body text-sm">SUMEL 11, D/219, opp. Reliance Mart, near BAPS Circle, Bhadreshwar Society, Shahibag, Ahmedabad, Gujarat 380004</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <a href="tel:+919724014643" className="font-body text-sm hover:text-accent transition-colors">+91 97240 14643</a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-accent shrink-0" />
                <p className="font-body text-sm">10:00 AM – 10:00 PM (All days)</p>
              </div>
              <div className="flex items-center gap-3">
                <Star size={18} className="text-accent fill-accent shrink-0" />
                <p className="font-body text-sm font-semibold">5.0 ⭐ Google Rating</p>
              </div>
            </div>
          </div>
          <div className="border-2 border-foreground overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.2693453413346!2d72.5863775!3d23.0533396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f5a0a5a8e7%3A0x1234567890!2sShahibag%2C+Ahmedabad!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Store Location"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
