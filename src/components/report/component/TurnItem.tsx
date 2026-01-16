interface TurnItemProps {
  index: number;
  question: string;
  meta: string; // 예: "0초 · 정확 15%"
}

export default function TurnItem({ index, question, meta }: TurnItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg border px-4 py-3">
      {/* 번호 */}
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
        {index}
      </div>

      {/* 내용 */}
      <div>
        <p className="font-medium">{question}</p>
        <p className="mt-1 text-xs text-muted-foreground">{meta}</p>
      </div>
    </div>
  );
}
