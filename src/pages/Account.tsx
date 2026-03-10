import { Layout } from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { LogOut, Package, User, MapPin, ShoppingCart } from 'lucide-react';

const Account = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()
        .then(({ data }) => setProfile(data));

      supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data }) => setOrders(data || []));
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out');
    navigate('/');
  };

  if (loading) {
    return (
      <Layout>
        <div className="px-8 lg:px-16 py-24 text-center">
          <p className="font-heading text-lg font-bold animate-pulse">LOADING...</p>
        </div>
      </Layout>
    );
  }

  if (!user) return null;

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
            <LogOut size={14} />
            SIGN OUT
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {/* Profile Card */}
          <div className="border-2 border-foreground p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent flex items-center justify-center">
                <User size={18} className="text-accent-foreground" />
              </div>
              <h3 className="font-heading text-sm font-bold uppercase">PROFILE</h3>
            </div>
            <div className="space-y-2 font-body text-sm">
              <p><span className="text-muted-foreground">Name:</span> {profile?.full_name || '—'}</p>
              <p><span className="text-muted-foreground">Email:</span> {user.email}</p>
              <p><span className="text-muted-foreground">Phone:</span> {profile?.phone || '—'}</p>
            </div>
          </div>

          {/* Address Card */}
          <div className="border-2 border-foreground p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <MapPin size={18} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading text-sm font-bold uppercase">SAVED ADDRESS</h3>
            </div>
            <div className="space-y-2 font-body text-sm">
              <p>{profile?.address || 'No address saved'}</p>
              {profile?.city && <p>{profile.city} {profile.zip_code}</p>}
            </div>
          </div>

          {/* Stats Card */}
          <div className="border-2 border-foreground p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-secondary flex items-center justify-center">
                <ShoppingCart size={18} />
              </div>
              <h3 className="font-heading text-sm font-bold uppercase">STATS</h3>
            </div>
            <div className="space-y-2 font-body text-sm">
              <p><span className="text-muted-foreground">Total Orders:</span> <strong>{orders.length}</strong></p>
              <p><span className="text-muted-foreground">Total Spent:</span> <strong>${orders.reduce((s, o) => s + Number(o.total_price), 0)}</strong></p>
            </div>
          </div>
        </div>

        {/* Order History */}
        <h2 className="text-2xl font-extrabold mb-4">ORDER HISTORY</h2>
        {orders.length === 0 ? (
          <div className="border-2 border-foreground p-8 text-center">
            <Package size={32} className="mx-auto text-muted-foreground mb-4" />
            <p className="font-body text-sm text-muted-foreground mb-4">No orders yet</p>
            <Link to="/shop" className="btn-accent inline-block">Start Shopping</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map(order => (
              <div key={order.id} className="border-2 border-foreground p-6">
                <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                  <div>
                    <p className="font-body text-xs text-muted-foreground font-mono">#{order.id.slice(0, 8)}</p>
                    <p className="font-body text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-heading text-[10px] font-bold uppercase px-2 py-1 ${
                      order.status === 'delivered' ? 'bg-accent text-accent-foreground' :
                      order.status === 'shipped' ? 'bg-primary text-primary-foreground' :
                      order.status === 'processing' ? 'bg-secondary text-secondary-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {order.status}
                    </span>
                    <span className="font-heading text-lg font-extrabold">${order.total_price}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  {order.order_items?.map((item: any) => (
                    <p key={item.id} className="font-body text-xs">
                      {item.product_name} — {item.color} / {item.size} × {item.quantity} — ${item.price * item.quantity}
                      {item.custom_text && <span className="text-muted-foreground"> (Custom: "{item.custom_text}")</span>}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Account;
