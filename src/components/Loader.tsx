import logo from '@/assets/images/logo.svg';

export default function Loader() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex animate-bounce items-center gap-2">
        <img className="h-10 w-10" src={logo} alt="박면준 로고 이미지" />
        <div className="text-h3 font-bold">bakmyunjun</div>
      </div>
    </div>
  );
}
