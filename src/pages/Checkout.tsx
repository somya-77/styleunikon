import { Layout } from '@/components/Layout';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!user) {
      toast.error('Please sign in to place an order');
      navigate('/login');
      return;
    }

    setLoading(true);

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: user.id,
        customer_name: form.name,
        customer_email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        zip_code: form.zip,
        total_price: totalPrice,
        status: 'pending',
        payment_method: 'COD',
      })
      .select()
      .single();

    if (orderError || !order) {
      setLoading(false);
      toast.error('Failed to place order. Please try again.');
      console.error(orderError);
      return;
    }

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.name,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      price: item.price,
      custom_text: item.customText || null,
      custom_logo_url: item.customLogoUrl || null,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    setLoading(false);

    if (itemsError) {
      toast.error('Order created but some items failed to save.');
      console.error(itemsError);
    }

    // Update profile address
    await supabase
      .from('profiles')
      .update({
        phone: form.phone,
        address: form.address,
        city: form.city,
        zip_code: form.zip,
        full_name: form.name,
      })
      .eq('user_id', user.id);

    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <Layout>
        <div className="px-8 lg:px-16 py-24 text-center">
          <div className="w-16 h-16 bg-accent flex items-center justify-center mx-auto mb-6">
            <span className="font-heading text-2xl font-extrabold text-accent-foreground">✓</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-4">ORDER <span className="text-accent">PLACED!</span></h1>
          <p className="font-body text-lg text-muted-foreground mb-8">
            Your order has been placed successfully! We'll contact you to confirm.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
            <button onClick={() => navigate('/account')} className="btn-outline">View Account</button>
          </div>
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
        <h1 className="text-4xl font-extrabold mb-2">CHECKOUT</h1>
        {!user && (
          <div className="border-2 border-accent bg-accent/10 p-4 mb-6">
            <p className="font-body text-sm">
              <Link to="/login" className="font-heading font-bold underline accent-underline hover:text-accent">Sign in</Link>
              {' '}to place your order and track it in your account.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-xl font-extrabold">SHIPPING DETAILS</h2>

            {[
              { key: 'name', label: 'FULL NAME *', type: 'text' },
              { key: 'email', label: 'EMAIL *', type: 'email' },
              { key: 'phone', label: 'PHONE NUMBER *', type: 'tel' },
              { key: 'address', label: 'ADDRESS *', type: 'text' },
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

            <button type="submit" disabled={loading || !user} className="btn-accent mt-4 text-center disabled:opacity-50">
              {loading ? 'PLACING ORDER...' : `PLACE ORDER — $${totalPrice}`}
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
