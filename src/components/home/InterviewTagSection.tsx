import { Badge } from '@/components/ui/badge';

type TagVariant = 'strength' | 'improvement';

export default function TagSection({
  title,
  tags,
  variant,
}: {
  title: string;
  tags: string[];
  variant: TagVariant;
}) {
  const badgeStyle =
    variant === 'strength'
      ? 'bg-slate-100 text-green-700'
      : 'bg-slate-100 text-red-700';

  return (
    <div>
      <p className="mb-2 text-xs font-medium text-muted-foreground">{title}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            className={`rounded-full px-3 py-1 text-xs ${badgeStyle}`}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
