import { ReactNode } from 'react';
import { SideNav } from './SideNav';
import { TopBar } from './TopBar';
import { Footer } from './Footer';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <SideNav />
      <main className="flex-1 lg:ml-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
