import { Layout } from '@/components/Layout';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error('Please fill in all required fields');
      return;
    }
    // In production this would go to the database
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <Layout>
        <div className="px-8 lg:px-16 py-24 text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-accent">ORDER PLACED!</h1>
          <p className="font-body text-lg text-muted-foreground mb-8">
            Your order has been placed successfully! We'll contact you to confirm.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="px-8 lg:px-16 py-24 text-center">
          <h1 className="text-4xl font-extrabold mb-4">NOTHING TO CHECKOUT</h1>
          <button onClick={() => navigate('/shop')} className="btn-primary">Shop Now</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-8 lg:px-16 py-12">
        <h1 className="text-4xl font-extrabold mb-8">CHECKOUT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-xl font-extrabold">SHIPPING DETAILS</h2>

            {[
              { key: 'name', label: 'FULL NAME', type: 'text' },
              { key: 'email', label: 'EMAIL', type: 'email' },
              { key: 'phone', label: 'PHONE NUMBER', type: 'tel' },
              { key: 'address', label: 'ADDRESS', type: 'text' },
              { key: 'city', label: 'CITY', type: 'text' },
              { key: 'zip', label: 'ZIP CODE', type: 'text' },
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

            <div className="mt-4">
              <h3 className="font-heading text-xs font-bold uppercase mb-2">PAYMENT METHOD</h3>
              <div className="border-2 border-foreground p-4 bg-secondary">
                <span className="font-heading text-sm font-bold">CASH ON DELIVERY (COD)</span>
              </div>
            </div>

            <button type="submit" className="btn-accent mt-4 text-center">
              PLACE ORDER — ${totalPrice}
            </button>
          </form>

          {/* Summary */}
          <div className="lg:sticky lg:top-20 lg:self-start border-2 border-foreground p-6">
            <h3 className="font-heading text-sm font-bold uppercase mb-4">ORDER SUMMARY</h3>
            {items.map(item => (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between font-body text-sm mb-2">
                <span>{item.name} × {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t-2 border-foreground mt-4 pt-4 flex justify-between">
              <span className="font-heading text-sm font-bold">TOTAL</span>
              <span className="font-heading text-xl font-extrabold">${totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
