import { Badge } from '@/components/ui/badge';

type Quality = 'GOOD' | 'NORMAL';

const badgeVariant: Record<Quality, string> = {
  GOOD: 'bg-green-100 text-green-700',
  NORMAL: 'bg-amber-100 text-amber-700',
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
        <Badge className={`self-center ${badgeVariant[quality]}`}>
          {quality === 'GOOD' ? '좋음' : '보통'}
        </Badge>
      )}
    </div>
  );
}
