import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const PAGE_GROUP_SIZE = 5;

export default function RecordPagination({
  currentPage,
  totalPages,
  onChange,
}: PaginationProps) {
  // 현재 페이지가 속한 그룹 계산
  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);

  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const hasPrevGroup = startPage > 1;
  const hasNextGroup = endPage < totalPages;

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      {/* 이전 그룹 */}
      <button
        type="button"
        disabled={!hasPrevGroup}
        onClick={() => onChange(startPage - 1)}
        className={`h-8 rounded-md px-3 text-sm ${
          hasPrevGroup
            ? 'border hover:bg-muted'
            : 'cursor-not-allowed opacity-40'
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* 페이지 번호 */}
      {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
        const page = startPage + i;
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

      {/* 다음 그룹 */}
      <button
        type="button"
        disabled={!hasNextGroup}
        onClick={() => onChange(endPage + 1)}
        className={`h-8 rounded-md px-3 text-sm ${
          hasNextGroup
            ? 'border hover:bg-muted'
            : 'cursor-not-allowed opacity-40'
        }`}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
