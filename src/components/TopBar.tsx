import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const MOBILE_NAV = [
  { label: 'SHOP', path: '/shop' },
  { label: 'CUSTOMIZE', path: '/customize' },
  { label: 'BULK ORDER', path: '/bulk-order' },
  { label: 'ABOUT', path: '/about' },
];

export function TopBar() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-foreground">
        <div className="flex items-center justify-between px-4 lg:px-8 h-16">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/" className="font-heading text-xl font-extrabold tracking-tight">
              STYLE<span className="text-accent">UNIKON</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/account"
              className="p-2 border-2 border-transparent hover:border-foreground transition-all duration-200"
              aria-label="Account"
            >
              <User size={18} />
            </Link>
            <Link
              to="/cart"
              className="p-2 border-2 border-transparent hover:border-foreground transition-all duration-200 relative"
              aria-label="Cart"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-heading font-bold w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-16 lg:hidden">
          <nav className="flex flex-col p-8 gap-2">
            {MOBILE_NAV.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="font-heading text-3xl font-extrabold py-4 border-b-2 border-foreground hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
