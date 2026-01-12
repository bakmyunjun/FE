import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] px-6 py-8">
        <Suspense fallback={<div>로딩 중...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
