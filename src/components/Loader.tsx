import logo from '@/assets/images/logo.svg';

interface Props {
  message?: string;
}

export default function Loader({ message }: Props) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <div className="flex animate-bounce items-center gap-2">
        <img className="h-10 w-10" src={logo} alt="박면준 로고 이미지" />
        <div className="text-h3 font-bold">bakmyunjun</div>
      </div>
      {message && (
        <p className="text-sm text-muted-foreground">{message}</p>
      )}
    </div>
  );
}
