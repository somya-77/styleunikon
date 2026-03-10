import { Layout } from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="px-8 lg:px-16 py-12">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-8">ABOUT<br /><span className="text-accent">UNIKON</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-4">
              StyleUnikon was born from a simple belief: every T-shirt is a canvas, and every person deserves 
              apparel that represents who they are — not who a mass-market brand thinks they should be.
            </p>
            <p className="font-body text-base leading-relaxed text-muted-foreground mb-4">
              We source premium organic cotton, use state-of-the-art DTG and screen printing technology, 
              and inspect every single garment by hand before it ships.
            </p>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              Whether you're a startup building a brand, an event planner outfitting a team, or an individual 
              who refuses to wear generic — we're your printer.
            </p>
          </div>
          <div className="border-2 border-foreground">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop"
              alt="Workshop"
              className="w-full h-full object-cover aspect-[4/3]"
            />
          </div>
        </div>

        <section className="section-divider py-12">
          <h2 className="text-3xl font-extrabold mb-8">OUR PROCESS</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'DESIGN', desc: 'Upload your artwork or create with our builder.' },
              { step: '02', title: 'REVIEW', desc: 'We verify print quality and color accuracy.' },
              { step: '03', title: 'PRINT', desc: 'DTG or screen print on premium cotton.' },
              { step: '04', title: 'DELIVER', desc: 'Quality-checked and shipped to your door.' },
            ].map(item => (
              <div key={item.step} className="border-2 border-foreground p-6">
                <span className="font-heading text-4xl font-extrabold text-accent">{item.step}</span>
                <h3 className="font-heading text-sm font-bold mt-4 mb-2">{item.title}</h3>
                <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
