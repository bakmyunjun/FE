import { Suspense } from 'react';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex h-14 items-center border-b px-4">헤더</header>
      <main className="h-[100vh] p-4">
        <Suspense fallback={<div>로딩 중...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="flex h-14 items-center border-t px-4">푸터</footer>
    </div>
  );
}
