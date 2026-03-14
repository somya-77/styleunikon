import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogIn } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOBILE_NAV = [
  { label: 'SHOP', path: '/shop' },
  { label: 'CUSTOMIZE', path: '/customize' },
  { label: 'BULK ORDER', path: '/bulk-order' },
  { label: 'ABOUT', path: '/about' },
];

export function TopBar() {
  const { totalItems } = useCart();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b-4 border-foreground">
        <div className="flex items-center justify-between px-4 lg:px-8 h-16">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/" className="font-heading text-xl font-extrabold tracking-tight">
              CUSTOMIZE<span className="text-accent"> T-SHIRT</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <Link to="/account" className="p-2 border-2 border-transparent hover:border-foreground transition-all duration-200 flex items-center gap-2" aria-label="Account">
                <div className="w-6 h-6 bg-accent flex items-center justify-center">
                  <User size={12} className="text-accent-foreground" />
                </div>
                <span className="hidden md:inline font-heading text-[10px] font-bold uppercase">{user.email?.split('@')[0]}</span>
              </Link>
            ) : (
              <Link to="/login" className="p-2 border-2 border-transparent hover:border-foreground transition-all duration-200 flex items-center gap-2" aria-label="Sign in">
                <LogIn size={18} />
                <span className="hidden md:inline font-heading text-[10px] font-bold uppercase">Sign In</span>
              </Link>
            )}
            <Link to="/cart" className="p-2 border-2 border-transparent hover:border-foreground transition-all duration-200 relative" aria-label="Cart">
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-heading font-bold w-5 h-5 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background pt-16 lg:hidden"
          >
            <nav className="flex flex-col p-8 gap-2">
              {MOBILE_NAV.map((item, i) => (
                <motion.div key={item.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to={item.path} onClick={() => setMobileOpen(false)}
                    className="font-heading text-3xl font-extrabold py-4 border-b-2 border-foreground hover:text-accent transition-colors block">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              {!user && (
                <Link to="/login" onClick={() => setMobileOpen(false)}
                  className="font-heading text-3xl font-extrabold py-4 border-b-2 border-foreground text-accent">SIGN IN</Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-16" />
    </>
  );
}
