import { Button } from '@/components/ui/button';
import logo from '@/assets/images/logo.svg';
import { useNavigate } from 'react-router';

export default function Header() {
  const navi = useNavigate();
  return (
    <header className="text-h3 flex h-16 flex-row items-center justify-between border-b px-6 font-bold">
      <div className="flex flex-row items-center justify-center gap-2">
        <img className="h-10 w-10" src={logo} alt="로고 이미지" />
        <div>bakmyunjun</div>
      </div>
      <Button onClick={() => navi('/interview')}>면접 시작</Button>
    </header>
  );
}
