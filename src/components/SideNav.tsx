import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Palette, Package, Info } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'SHOP', path: '/shop', icon: ShoppingBag },
  { label: 'CUSTOMIZE', path: '/customize', icon: Palette },
  { label: 'BULK ORDER', path: '/bulk-order', icon: Package },
  { label: 'ABOUT', path: '/about', icon: Info },
];

export function SideNav() {
  const location = useLocation();

  return (
    <nav className="fixed left-0 top-16 z-40 hidden lg:flex flex-col gap-1 p-3 w-20">
      {NAV_ITEMS.map(item => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`group flex flex-col items-center gap-1 py-3 px-1 transition-all duration-200 border-2 ${
              isActive
                ? 'border-foreground bg-primary text-primary-foreground'
                : 'border-transparent hover:border-foreground'
            }`}
            title={item.label}
          >
            <item.icon size={18} strokeWidth={2} />
            <span className="text-[9px] font-heading font-bold tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
