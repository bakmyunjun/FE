import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SquareUserIcon } from 'lucide-react';
import githubLogo from '@/assets/images/github-mark.svg';
import kakaoLogo from '@/assets/images/kakao-mark.svg';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
          <SquareUserIcon className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="mb-1 text-h3 font-semibold">박면준</h3>
          <p className="text-caption text-muted-foreground">박세게 면접 준비</p>
        </div>
      </div>

      <Card className="mt-4 w-full max-w-[360px]">
        <CardContent className="flex flex-col gap-4 p-6">
          <h3 className="text-center text-h3">로그인</h3>
          <Button>
            <img className="h-5 w-5" src={githubLogo} alt="GitHub 로고" />
            GitHub 계정으로 로그인
          </Button>
          <Button className="bg-[#FEE500] text-black hover:bg-[#FEE500]/75">
            <img className="h-5 w-5" src={kakaoLogo} alt="Kakao 로고" />
            Kakao 계정으로 로그인
          </Button>
          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-caption text-muted-foreground">또는</span>
            <Separator className="flex-1" />
          </div>
          <Button variant="outline">게스트로 시작하기</Button>
          <p className="text-center text-caption text-muted-foreground">
            게스트로 로그인 시 데이터가 저장되지 않습니다
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
