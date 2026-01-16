interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function RecordPagination({
  currentPage,
  totalPages,
  onChange,
}: PaginationProps) {
  return (
    <div className="mt-6 flex justify-center gap-2">
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        const active = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onChange(page)}
            className={`h-8 w-8 rounded-md text-sm font-medium ${
              active
                ? 'bg-primary text-white'
                : 'border text-muted-foreground hover:bg-muted'
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
