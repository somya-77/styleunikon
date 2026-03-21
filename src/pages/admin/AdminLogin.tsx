import { Layout } from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Shield, Mail, Lock, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const verifyExistingAdminSession = async () => {
      if (authLoading) return;

      if (!user) {
        if (!cancelled) setCheckingSession(false);
        return;
      }

      const { data: isAdmin, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'admin',
      });

      if (cancelled) return;

      if (error) {
        setCheckingSession(false);
        toast.error('Failed to verify admin session');
        return;
      }

      if (isAdmin) {
        navigate('/admin', { replace: true });
        return;
      }

      await supabase.auth.signOut();
      setCheckingSession(false);
      toast.error('Access denied. Admin credentials required.');
    };

    verifyExistingAdminSession();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    const { data: signInData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !signInData.user || !signInData.session) {
      setLoading(false);
      toast.error(error?.message || 'Authentication failed');
      return;
    }

    const { data: isAdmin, error: roleError } = await supabase.rpc('has_role', {
      _user_id: signInData.user.id,
      _role: 'admin',
    });

    if (roleError) {
      setLoading(false);
      toast.error('Failed to verify admin access');
      return;
    }

    if (!isAdmin) {
      await supabase.auth.signOut();
      setLoading(false);
      toast.error('Access denied. Admin credentials required.');
      return;
    }

    setLoading(false);
    toast.success('Welcome, Admin!');
    navigate('/admin', { replace: true });
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-primary flex items-center justify-center mx-auto mb-6">
              <Shield size={28} className="text-primary-foreground" />
            </div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Restricted Access</p>
            <h1 className="text-4xl font-extrabold">
              ADMIN <span className="text-accent">PANEL</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="border-2 border-foreground p-6 md:p-8">
            <div className="mb-5">
              <label className="font-heading text-xs font-bold uppercase block mb-2">ADMIN EMAIL</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@styleunikon.com"
                  className="w-full border-2 border-foreground bg-background pl-11 pr-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="font-heading text-xs font-bold uppercase block mb-2">PASSWORD</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border-2 border-foreground bg-background pl-11 pr-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-center flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'VERIFYING...' : (
                <>ACCESS DASHBOARD <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-destructive" />
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Authorized personnel only
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;
