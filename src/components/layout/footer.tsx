import { Lightbulb } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted/50 p-6 ring-1 ring-black/5">
      <div className="flex flex-row gap-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
          <Lightbulb className="h-3 w-3" />
        </div>
        <h4 className="mb-2 text-base font-semibold">면접 연습 팁</h4>
      </div>

      <div>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• 꾸준한 연습이 중요합니다. 일주일에 2–3회 연습을 권장합니다.</li>
          <li>• 과거 세션을 복습하며 개선점을 확인하세요.</li>
          <li>• 점수보다는 구체적인 피드백에 집중하세요.</li>
          <li>• 실전처럼 연습하되, 실수를 두려워하지 마세요.</li>
        </ul>
      </div>
    </footer>
  );
}
