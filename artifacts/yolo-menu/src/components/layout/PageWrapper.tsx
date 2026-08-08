import { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col mx-auto max-w-md w-full bg-background shadow-2xl overflow-x-hidden relative">
      <Header />
      <main className="flex-1 pb-28 flex flex-col">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
