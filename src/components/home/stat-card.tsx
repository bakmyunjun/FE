import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  sub: string;
  icon: LucideIcon;
}

export function StatCard({ title, value, sub, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>

      <p className="mt-2 text-2xl font-bold">{value}</p>

      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}
