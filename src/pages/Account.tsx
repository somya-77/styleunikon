import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';

const Account = () => {
  // Placeholder — will be connected to auth later
  return (
    <Layout>
      <div className="px-8 lg:px-16 py-12">
        <h1 className="text-4xl font-extrabold mb-8">ACCOUNT</h1>

        <div className="border-2 border-foreground p-8 max-w-lg">
          <h2 className="font-heading text-lg font-extrabold mb-4">SIGN IN</h2>
          <p className="font-body text-sm text-muted-foreground mb-6">
            Sign in to view your orders, manage your profile, and track shipments.
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="font-heading text-xs font-bold uppercase block mb-2">EMAIL</label>
              <input
                type="email"
                className="w-full border-2 border-foreground bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="font-heading text-xs font-bold uppercase block mb-2">PASSWORD</label>
              <input
                type="password"
                className="w-full border-2 border-foreground bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button className="btn-accent text-center">SIGN IN</button>
            <p className="font-body text-xs text-muted-foreground text-center">
              Don't have an account? <Link to="/signup" className="underline accent-underline hover:text-accent">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
