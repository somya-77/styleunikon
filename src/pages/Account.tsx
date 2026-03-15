import { Layout } from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { formatPrice } from '@/data/products';
import { toast } from 'sonner';
import { LogOut, Package, User, MapPin, ShoppingCart, Truck, CheckCircle, Clock, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

const ORDER_STEPS = ['pending', 'processing', 'printing', 'shipped', 'out_for_delivery', 'delivered'];
const STEP_LABELS: Record<string, string> = {
  pending: 'Pending', processing: 'Processing', printing: 'Printing',
  shipped: 'Shipped', out_for_delivery: 'Out for Delivery', delivered: 'Delivered',
};
const STEP_ICONS: Record<string, any> = {
  pending: Clock, processing: Package, printing: Printer,
  shipped: Truck, out_for_delivery: Truck, delivered: CheckCircle,
};

const Account = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'tracking'>('profile');

  useEffect(() => { if (!loading && !user) navigate('/login'); }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      supabase.from('profiles').select('*').eq('user_id', user.id).single().then(({ data }) => setProfile(data));
      supabase.from('orders').select('*, order_items(*)').eq('customer_id', user.id).order('created_at', { ascending: false }).then(({ data }) => setOrders(data || []));
    }
  }, [user]);

  const handleSignOut = async () => { await signOut(); toast.success('Signed out'); navigate('/'); };

  if (loading) {
    return (<Layout><div className="px-8 lg:px-16 py-24 text-center"><p className="font-heading text-lg font-bold animate-pulse">LOADING...</p></div></Layout>);
  }
  if (!user) return null;

  const renderOrderTracker = (status: string) => {
    const currentIndex = ORDER_STEPS.indexOf(status);
    return (
      <div className="flex items-center gap-1 mt-4 overflow-x-auto pb-2">
        {ORDER_STEPS.map((step, i) => {
          const Icon = STEP_ICONS[step];
          const isComplete = i <= currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <div key={step} className="flex items-center">
              <div className={`flex flex-col items-center min-w-[60px] ${isComplete ? 'text-accent' : 'text-muted-foreground/40'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  isCurrent ? 'border-accent bg-accent text-accent-foreground' :
                  isComplete ? 'border-accent bg-accent/20' : 'border-muted'
                }`}>
                  <Icon size={14} />
                </div>
                <span className="font-body text-[8px] uppercase mt-1 text-center leading-tight">{STEP_LABELS[step]}</span>
              </div>
              {i < ORDER_STEPS.length - 1 && (
                <div className={`w-6 h-0.5 ${i < currentIndex ? 'bg-accent' : 'bg-muted'}`} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const TABS = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'orders' as const, label: 'My Orders', icon: Package },
    { id: 'tracking' as const, label: 'Track Order', icon: Truck },
  ];

  return (
    <Layout>
      <div className="px-8 lg:px-16 py-12">
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Your account</p>
            <h1 className="text-4xl font-extrabold">
              WELCOME, <span className="text-accent">{profile?.full_name || user.email?.split('@')[0] || 'USER'}</span>
            </h1>
          </div>
          <button onClick={handleSignOut} className="btn-outline flex items-center gap-2 text-xs py-2 px-4">
            <LogOut size={14} /> SIGN OUT
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-heading font-bold uppercase border-2 transition-all duration-200 ${
                activeTab === t.id ? 'border-foreground bg-primary text-primary-foreground' : 'border-foreground/30 hover:border-foreground'
              }`}>
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent flex items-center justify-center"><User size={18} className="text-accent-foreground" /></div>
                <h3 className="font-heading text-sm font-bold uppercase">PROFILE</h3>
              </div>
              <div className="space-y-2 font-body text-sm">
                <p><span className="text-muted-foreground">Name:</span> {profile?.full_name || '—'}</p>
                <p><span className="text-muted-foreground">Email:</span> {user.email}</p>
                <p><span className="text-muted-foreground">Phone:</span> {profile?.phone || '—'}</p>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary flex items-center justify-center"><MapPin size={18} className="text-primary-foreground" /></div>
                <h3 className="font-heading text-sm font-bold uppercase">SAVED ADDRESS</h3>
              </div>
              <div className="space-y-2 font-body text-sm">
                <p>{profile?.address || 'No address saved'}</p>
                {profile?.city && <p>{profile.city} {profile.zip_code}</p>}
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary flex items-center justify-center"><ShoppingCart size={18} /></div>
                <h3 className="font-heading text-sm font-bold uppercase">STATS</h3>
              </div>
              <div className="space-y-2 font-body text-sm">
                <p><span className="text-muted-foreground">Total Orders:</span> <strong>{orders.length}</strong></p>
                <p><span className="text-muted-foreground">Total Spent:</span> <strong>{formatPrice(orders.reduce((s, o) => s + Number(o.total_price), 0))}</strong></p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-extrabold mb-4">ORDER HISTORY</h2>
            {orders.length === 0 ? (
              <div className="glass-card p-8 text-center">
                <Package size={32} className="mx-auto text-muted-foreground mb-4" />
                <p className="font-body text-sm text-muted-foreground mb-4">No orders yet</p>
                <Link to="/shop" className="btn-accent inline-block">Start Shopping</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {orders.map(order => (
                  <div key={order.id} className="glass-card p-6">
                    <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                      <div>
                        <p className="font-body text-xs text-muted-foreground font-mono">#{order.id.slice(0, 8)}</p>
                        <p className="font-body text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`font-heading text-[10px] font-bold uppercase px-2 py-1 ${
                          order.status === 'delivered' ? 'bg-accent text-accent-foreground' :
                          order.status === 'shipped' || order.status === 'out_for_delivery' ? 'bg-primary text-primary-foreground' :
                          order.status === 'processing' || order.status === 'printing' ? 'bg-secondary text-secondary-foreground' :
                          'bg-muted text-muted-foreground'
                        }`}>{STEP_LABELS[order.status] || order.status}</span>
                        <span className="font-heading text-lg font-extrabold">{formatPrice(order.total_price)}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {order.order_items?.map((item: any) => (
                        <p key={item.id} className="font-body text-xs">
                          {item.product_name} — {item.color} / {item.size} × {item.quantity} — {formatPrice(item.price * item.quantity)}
                        </p>
                      ))}
                    </div>
                    {renderOrderTracker(order.status)}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'tracking' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-extrabold mb-4">TRACK YOUR ORDERS</h2>
            {orders.length === 0 ? (
              <div className="glass-card p-8 text-center">
                <Truck size={32} className="mx-auto text-muted-foreground mb-4" />
                <p className="font-body text-sm text-muted-foreground">No orders to track</p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {orders.filter(o => o.status !== 'delivered').map(order => (
                  <div key={order.id} className="glass-card p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-heading text-sm font-bold">Order #{order.id.slice(0, 8)}</p>
                      <p className="font-heading text-sm font-bold">{formatPrice(order.total_price)}</p>
                    </div>
                    {renderOrderTracker(order.status)}
                  </div>
                ))}
                {orders.filter(o => o.status !== 'delivered').length === 0 && (
                  <div className="glass-card p-8 text-center">
                    <CheckCircle size={32} className="mx-auto text-accent mb-4" />
                    <p className="font-body text-sm text-muted-foreground">All orders have been delivered! 🎉</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Account;
