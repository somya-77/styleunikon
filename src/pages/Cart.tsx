import { Layout } from '@/components/Layout';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="px-8 lg:px-16 py-24 text-center">
          <h1 className="text-4xl font-extrabold mb-4">CART IS EMPTY</h1>
          <p className="font-body text-muted-foreground mb-8">Add some items to get started.</p>
          <Link to="/shop" className="btn-primary">Shop Now</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-8 lg:px-16 py-12">
        <h1 className="text-4xl font-extrabold mb-8">YOUR CART</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <div className="flex flex-col gap-4">
            {items.map((item, i) => (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="border-2 border-foreground grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-4">
                <div className="aspect-square bg-secondary">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-sm font-bold uppercase">{item.name}</h3>
                    <p className="font-body text-xs text-muted-foreground mt-1">
                      {item.color} / {item.size}
                      {item.customText && ` / "${item.customText}"`}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border-2 border-foreground">
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                        className="px-3 py-1 font-heading text-xs font-bold hover:bg-accent transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 font-heading text-xs font-bold border-x-2 border-foreground">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                        className="px-3 py-1 font-heading text-xs font-bold hover:bg-accent transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-heading text-sm font-bold">${item.price * item.quantity}</span>
                      <button
                        onClick={() => removeItem(item.productId, item.size, item.color)}
                        className="p-1 hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-20 lg:self-start border-2 border-foreground p-6">
            <h3 className="font-heading text-sm font-bold uppercase mb-6">ORDER SUMMARY</h3>
            <div className="flex justify-between font-body text-sm mb-2">
              <span>Subtotal</span>
              <span className="font-semibold">${totalPrice}</span>
            </div>
            <div className="flex justify-between font-body text-sm mb-2">
              <span>Shipping</span>
              <span className="text-muted-foreground">Calculated at checkout</span>
            </div>
            <div className="border-t-2 border-foreground mt-4 pt-4 flex justify-between">
              <span className="font-heading text-sm font-bold uppercase">Total</span>
              <span className="font-heading text-xl font-extrabold">${totalPrice}</span>
            </div>
            <Link to="/checkout" className="btn-accent w-full text-center mt-6 block">
              CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
