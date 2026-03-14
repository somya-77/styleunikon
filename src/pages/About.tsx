import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Layout>
      <div className="px-8 lg:px-16 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold mb-8"
        >
          ABOUT<br /><span className="text-accent">US</span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-4">
              Welcome to Customized T-shirt House, your premier destination for personalized apparel 
              in Ahmedabad. We specialize in high-quality custom T-shirt printing using techniques like 
              screen printing and DTG printing.
            </p>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-4">
              Perfect for businesses, colleges, events, and personal designs. We source premium fabrics, 
              use state-of-the-art printing technology, and inspect every single garment by hand before delivery.
            </p>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              Whether you're a startup building a brand, a college planning an event, or an individual 
              who wants unique apparel — we're your trusted printing partner with a 5.0 ⭐ Google rating.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="border-2 border-foreground"
          >
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop"
              alt="Workshop"
              className="w-full h-full object-cover aspect-[4/3]"
            />
          </motion.div>
        </div>

        <section className="section-divider py-12">
          <h2 className="text-3xl font-extrabold mb-8">OUR PROCESS</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'DESIGN', desc: 'Upload your artwork or create with our builder.' },
              { step: '02', title: 'REVIEW', desc: 'We verify print quality and color accuracy.' },
              { step: '03', title: 'PRINT', desc: 'DTG or screen print on premium cotton.' },
              { step: '04', title: 'DELIVER', desc: 'Quality-checked and delivered to your door.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-2 border-foreground p-6"
              >
                <span className="font-heading text-4xl font-extrabold text-accent">{item.step}</span>
                <h3 className="font-heading text-sm font-bold mt-4 mb-2">{item.title}</h3>
                <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-extrabold mb-8">VISIT OUR STORE</h2>
          <div className="border-2 border-foreground p-6 bg-card">
            <p className="font-body text-sm mb-2"><strong>Customize T-shirt House</strong></p>
            <p className="font-body text-sm text-muted-foreground mb-1">SUMEL 11, D/219, opp. Reliance Mart, near BAPS Circle, Shahibag, Ahmedabad, Gujarat 380004</p>
            <p className="font-body text-sm text-muted-foreground mb-1">📞 +91 97240 14643</p>
            <p className="font-body text-sm text-muted-foreground">🕐 10:00 AM – 10:00 PM (Open all days)</p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
