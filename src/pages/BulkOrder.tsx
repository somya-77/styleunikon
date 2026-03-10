import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { toast } from 'sonner';

const BulkOrder = () => {
  const [form, setForm] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    quantity: '',
    instructions: '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.email || !form.quantity) {
      toast.error('Please fill in all required fields');
      return;
    }
    // In production this would save to bulk_inquiries table
    setSubmitted(true);
    toast.success('Inquiry submitted successfully!');
  };

  if (submitted) {
    return (
      <Layout>
        <div className="px-8 lg:px-16 py-24 text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-accent">INQUIRY RECEIVED!</h1>
          <p className="font-body text-lg text-muted-foreground mb-8">
            Our team will contact you within 24 hours with a custom quote.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-8 lg:px-16 py-12">
        <h1 className="text-4xl font-extrabold mb-2">BULK ORDER</h1>
        <p className="font-body text-muted-foreground mb-8">For companies, events, and teams. Minimum 50 units.</p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { key: 'companyName', label: 'COMPANY NAME', type: 'text' },
              { key: 'contactPerson', label: 'CONTACT PERSON', type: 'text' },
              { key: 'phone', label: 'PHONE', type: 'tel' },
              { key: 'email', label: 'EMAIL', type: 'email' },
              { key: 'quantity', label: 'QUANTITY (UNITS)', type: 'number' },
            ].map(field => (
              <div key={field.key}>
                <label className="font-heading text-xs font-bold uppercase block mb-2">{field.label}</label>
                <input
                  type={field.type}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full border-2 border-foreground bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="font-heading text-xs font-bold uppercase block mb-2">UPLOAD LOGO</label>
              <label className="btn-outline block text-center cursor-pointer text-xs py-2">
                {logoFile ? logoFile.name : 'CHOOSE FILE'}
                <input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files?.[0] || null)} className="hidden" />
              </label>
            </div>

            <div>
              <label className="font-heading text-xs font-bold uppercase block mb-2">SPECIAL INSTRUCTIONS</label>
              <textarea
                value={form.instructions}
                onChange={e => setForm({ ...form, instructions: e.target.value })}
                rows={4}
                className="w-full border-2 border-foreground bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            <button type="submit" className="btn-accent mt-4 text-center">SUBMIT INQUIRY</button>
          </form>

          <div className="border-2 border-foreground p-6 lg:sticky lg:top-20 lg:self-start bg-secondary">
            <h3 className="font-heading text-lg font-extrabold mb-4">BULK BENEFITS</h3>
            <ul className="font-body text-sm space-y-3">
              <li className="border-b border-foreground/20 pb-3">50–100 units: <strong>10% off</strong></li>
              <li className="border-b border-foreground/20 pb-3">100–500 units: <strong>20% off</strong></li>
              <li className="border-b border-foreground/20 pb-3">500+ units: <strong>Custom pricing</strong></li>
              <li className="pb-3">Free shipping on orders over 200 units</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BulkOrder;
