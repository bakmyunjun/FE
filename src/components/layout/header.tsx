import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="text-h3 flex h-16 flex-row items-center justify-between border-b px-6 font-bold">
      <div>마이페이지</div>
      <Button>면접 시작</Button>
    </header>
  );
}
