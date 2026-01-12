import { Suspense } from 'react';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex h-14 items-center border-b px-6">헤더</header>

      <main className="mx-auto w-full max-w-[1200px] px-6 py-8">
        <Suspense fallback={<div>로딩 중...</div>}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="flex h-14 items-center border-t px-6">푸터</footer>
    </div>
  );
}
