import { AlertTriangle } from 'lucide-react';

export default function TextPatternItem({
  title,
  description,
  example,
}: {
  title: string;
  description: string;
  example: string;
}) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start gap-2">
        <AlertTriangle className="mt-0.5 h-4 w-4 text-yellow-500" />
        <div>
          <p className="font-medium">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          <div className="mt-2 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
            {example}
          </div>
        </div>
      </div>
    </div>
  );
}
