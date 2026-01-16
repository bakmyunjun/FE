type Quality = '좋음' | '보통';

const badgeVariant: Record<Quality, string> = {
  좋음: 'bg-amber-100 text-amber-700',
  보통: 'bg-blue-100 text-blue-700',
};

export default function QuestionItem({
  question,
  description,
  quality,
}: {
  question: string;
  description: string;
  quality?: Quality;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
      <div>
        <p className="font-medium">{question}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      {quality && (
        <Badge
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${badgeVariant[quality]}`}
        >
          {quality}
        </Badge>
      )}
    </div>
  );
}
