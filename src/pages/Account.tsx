import { Layout } from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { LogOut, Package, User, MapPin } from 'lucide-react';

const Account = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

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
          <p className="font-heading text-lg font-bold">LOADING...</p>
        </div>
      </Layout>
    );
  }

  if (!user) return null;

  return (
    <Layout>
      <div className="px-8 lg:px-16 py-12">
        <div className="flex items-start justify-between mb-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

          {/* Orders Card */}
          <div className="border-2 border-foreground p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-secondary flex items-center justify-center">
                <Package size={18} />
              </div>
              <h3 className="font-heading text-sm font-bold uppercase">ORDERS</h3>
            </div>
            <p className="font-body text-sm text-muted-foreground mb-4">Your order history will appear here once you place an order.</p>
            <Link to="/shop" className="font-heading text-xs font-bold uppercase hover:text-accent transition-colors border-b-2 border-foreground pb-1">
              Start Shopping →
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
