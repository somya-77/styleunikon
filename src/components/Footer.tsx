import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="lg:ml-20 border-t-4 border-foreground bg-primary text-primary-foreground">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 lg:p-12">
        <div>
          <h3 className="text-lg font-extrabold mb-4">STYLE<span className="text-accent">UNIKON</span></h3>
          <p className="font-body text-sm opacity-80 leading-relaxed">
            Premium custom T-shirts. Made with precision. Printed with intent. Worn with identity.
          </p>
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
          <div className="flex flex-col gap-2 font-body text-sm opacity-80">
            <span>+1 (555) 123-4567</span>
            <span>hello@styleunikon.com</span>
            <span>WhatsApp: +1 (555) 123-4567</span>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 px-8 lg:px-12 py-4 flex items-center justify-between">
        <p className="font-body text-xs opacity-60">© {new Date().getFullYear()} StyleUnikon. All rights reserved.</p>
        <Link to="/admin/login" className="font-body text-[10px] opacity-40 hover:opacity-80 transition-opacity">
          Admin
        </Link>
      </div>
    </footer>
  );
}
