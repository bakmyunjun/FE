// TODO: shadcn-ui badge로 변경
export default function TagSection({
  title,
  tags,
}: {
  title: string;
  tags: string[];
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-muted-foreground">{title}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-muted/60 px-3 py-1 text-xs text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
