import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { DoorOpenIcon } from 'lucide-react';

export default function InterviewHeader() {
  return (
    <header className="flex items-center justify-between border-b bg-muted px-8 py-4">
      <div className="flex items-center gap-2">
        <span className="text-sub2">진행도</span>
        <Progress value={10} className="w-40" />
        <span className="text-sub2">1 / 10</span>
      </div>
      <Button
        className="hover:text-destructive [&_svg]:!size-8"
        variant="ghost"
        size="icon"
        aria-label="나가기"
      >
        <DoorOpenIcon />
      </Button>
    </header>
  );
}
