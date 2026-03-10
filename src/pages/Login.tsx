import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    navigate('/account');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Welcome back!');
      navigate('/account');
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Welcome back</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[0.9]">
              SIGN<br /><span className="text-accent">IN</span>
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="border-2 border-foreground p-6 md:p-8">
            <div className="mb-5">
              <label className="font-heading text-xs font-bold uppercase block mb-2">EMAIL</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full border-2 border-foreground bg-background pl-11 pr-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="mb-5">
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
              className="btn-accent w-full text-center flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'SIGNING IN...' : (
                <>SIGN IN <ArrowRight size={16} /></>
              )}
            </button>

            <div className="mt-6 pt-6 border-t-2 border-foreground/20 text-center">
              <p className="font-body text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="font-heading font-bold text-foreground hover:text-accent transition-colors underline accent-underline">
                  SIGN UP
                </Link>
              </p>
            </div>
          </form>

          {/* Trust badge */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-accent" />
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Secure login • Your data is protected
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
