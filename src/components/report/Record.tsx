import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState } from 'react';
import TurnItem from '@/components/report/component/TurnItem';
import RecordPagination from '@/components/report/component/RecordPagination';
import type { ReportViewRecord } from '@/types/interview';

const PAGE_SIZE = 5;

interface Props {
  record: ReportViewRecord;
}

export default function Record({ record }: Props) {
  const [page, setPage] = useState(1);
  const { turns } = record;

  const totalPages = Math.ceil(turns.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const visibleTurns = turns.slice(start, start + PAGE_SIZE);

  return (
    <Card>
      <CardHeader className="font-semibold">턴별 상세 내역</CardHeader>
      <CardContent>
        {turns.length > 0 ? (
          <>
            <div className="flex flex-col gap-4">
              {visibleTurns.map((turn) => (
                <TurnItem key={turn.turnIndex} turn={turn} />
              ))}
            </div>

            {totalPages > 1 && (
              <RecordPagination
                currentPage={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            기록된 턴이 없습니다.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
