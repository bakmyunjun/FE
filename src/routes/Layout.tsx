import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex h-14 items-center border-b px-4">헤더</header>
      <main className="p-4">
        <Outlet />
      </main>
      <footer>푸터</footer>
    </div>
  );
}
