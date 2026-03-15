import { useAuth } from '@/context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PUBLIC_PATHS = ['/login', '/signup', '/admin/login'];

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-heading text-sm font-bold uppercase tracking-wider animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  if (PUBLIC_PATHS.includes(location.pathname)) {
    return <>{children}</>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
