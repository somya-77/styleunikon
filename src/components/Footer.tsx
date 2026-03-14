import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="lg:ml-20 border-t-4 border-foreground bg-primary text-primary-foreground">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-8 lg:p-12">
        <div>
          <h3 className="text-lg font-extrabold mb-4">CUSTOMIZE<span className="text-accent"> T-SHIRT HOUSE</span></h3>
          <p className="font-body text-sm opacity-80 leading-relaxed">
            Your premier destination for personalized apparel. High-quality custom T-shirt printing using screen printing and DTG technology.
          </p>
          <div className="flex items-center gap-1 mt-3">
            <span className="text-accent font-bold">5.0 ⭐</span>
            <span className="font-body text-xs opacity-60">Google Rating</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-extrabold mb-4">NAVIGATION</h4>
          <nav className="flex flex-col gap-2 font-body text-sm">
            <Link to="/shop" className="opacity-80 hover:opacity-100 hover:text-accent transition-all">Shop</Link>
            <Link to="/customize" className="opacity-80 hover:opacity-100 hover:text-accent transition-all">Customize</Link>
            <Link to="/bulk-order" className="opacity-80 hover:opacity-100 hover:text-accent transition-all">Bulk Order</Link>
            <Link to="/about" className="opacity-80 hover:opacity-100 hover:text-accent transition-all">About</Link>
          </nav>
        </div>
        <div>
          <h4 className="text-sm font-extrabold mb-4">CONTACT</h4>
          <div className="flex flex-col gap-3 font-body text-sm opacity-80">
            <div className="flex items-start gap-2">
              <Phone size={14} className="mt-0.5 shrink-0" />
              <span>+91 97240 14643</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock size={14} className="mt-0.5 shrink-0" />
              <span>10:00 AM – 10:00 PM (All days)</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-extrabold mb-4">VISIT US</h4>
          <div className="flex items-start gap-2 font-body text-sm opacity-80">
            <MapPin size={14} className="mt-0.5 shrink-0" />
            <span>SUMEL 11, D/219, opp. Reliance Mart, near BAPS Circle, Shahibag, Ahmedabad, Gujarat 380004</span>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 px-8 lg:px-12 py-4 flex items-center justify-between">
        <p className="font-body text-xs opacity-60">© {new Date().getFullYear()} Customize T-shirt House. All rights reserved.</p>
        <Link to="/admin/login" className="font-body text-[10px] opacity-40 hover:opacity-80 transition-opacity">
          Admin
        </Link>
      </div>
    </footer>
  );
}
