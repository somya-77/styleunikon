import { Layout } from '@/components/Layout';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';

const Signup = () => {
  const { signUp, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '', phone: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/account', { replace: true });
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    const { error } = await signUp(form.email, form.password, form.fullName);
    setLoading(false);

    if (error) {
      toast.error(error);
    } else {
      toast.success('Please check your email to verify your account before signing in.');
      navigate('/login');
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Join us</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[0.9]">
              CREATE<br /><span className="text-accent">ACCOUNT</span>
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="border-2 border-foreground p-6 md:p-8">
            <div className="mb-4">
              <label className="font-heading text-xs font-bold uppercase block mb-2">FULL NAME *</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                  placeholder="John Doe"
                  className="w-full border-2 border-foreground bg-background pl-11 pr-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="font-heading text-xs font-bold uppercase block mb-2">EMAIL *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full border-2 border-foreground bg-background pl-11 pr-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="font-heading text-xs font-bold uppercase block mb-2">PHONE</label>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="w-full border-2 border-foreground bg-background pl-11 pr-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="font-heading text-xs font-bold uppercase block mb-2">PASSWORD *</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 6 characters"
                  className="w-full border-2 border-foreground bg-background pl-11 pr-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="font-heading text-xs font-bold uppercase block mb-2">CONFIRM PASSWORD *</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="Re-enter password"
                  className="w-full border-2 border-foreground bg-background pl-11 pr-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-accent w-full text-center flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'CREATING ACCOUNT...' : (
                <>CREATE ACCOUNT <ArrowRight size={16} /></>
              )}
            </button>

            <div className="mt-6 pt-6 border-t-2 border-foreground/20 text-center">
              <p className="font-body text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/account" className="font-heading font-bold text-foreground hover:text-accent transition-colors underline accent-underline">
                  SIGN IN
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-accent" />
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Secure signup • Your data is protected
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
