import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState } from 'react';
import TurnItem from '@/components/report/component/TurnItem';
import RecordPagination from '@/components/report/component/RecordPagination';

const mockTurns = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  question: `질문 ${i + 1}. 예시 질문입니다.`,
  meta: '0초 · 정확 15%',
}));
const PAGE_SIZE = 6;

export default function Record() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(mockTurns.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const visibleTurns = mockTurns.slice(start, start + PAGE_SIZE);
  return (
    <Card>
      <CardHeader className="font-semibold">턴별 상세 내역</CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {visibleTurns.map((turn, idx) => (
            <TurnItem
              key={turn.id}
              index={start + idx + 1}
              question={turn.question}
              meta={turn.meta}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <RecordPagination
            currentPage={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        )}
      </CardContent>
    </Card>
  );
}
