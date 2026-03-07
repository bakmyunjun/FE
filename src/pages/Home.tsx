import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { InterviewRecordItem } from '@/components/home/InterviewRecordItem';
import { StatCard } from '@/components/home/StatCard';
import { ScoreTrendChart } from '@/components/home/ScoreTrendChart';
import { SkillRadarChart } from '@/components/home/SkillRadarChart';
import RecordPagination from '@/components/report/component/RecordPagination';
import { useMemo, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useMe } from '@/hooks/queries/useMe';
import { useInterviewRecords } from '@/hooks/queries/useInterviewRecords';
import {
  TrendingUp,
  BarChart3,
  CalendarDays,
  MessageSquare,
  SearchIcon,
  Filter,
  Check,
} from 'lucide-react';

const PAGE_SIZE = 10;

export default function Home() {
  const { data: user } = useMe();
  const { data: records, isLoading, isError } = useInterviewRecords();

  const [page, setPage] = useState(1);
  const [searchWord, setSearchWord] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const totalSessions = records?.length ?? 0;
  const latestScore = records?.[0]?.score ?? 0;

  const avgScore =
    records && records.length > 0
      ? Math.round(
          records.reduce((sum, r) => sum + r.score, 0) / records.length,
        )
      : 0;
  const totalAnswer = records?.[0]?.questionProgress?.split(' ')[0] ?? '0';

  // search
  const filteredRecords = useMemo(() => {
    if (!records) return [];

    return records.filter((record) =>
      record.title.toLowerCase().includes(searchWord.toLowerCase()),
    );
  }, [records, searchWord]);

  // sort filter
  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [filteredRecords, sortOrder]);

  // pagination
  const totalPages = Math.ceil(sortedRecords.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const visibleRecords = sortedRecords.slice(start, start + PAGE_SIZE);

  return (
    <div className="flex flex-col gap-3">
      {/* 프로필 요약 */}
      <Card className="bg-gradient-to-b from-neutral-800 to-neutral-500 text-white">
        <CardContent className="flex items-center justify-between p-8">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gray-300" />
            <div>
              <p className="text-sub1 font-bold">{user?.nickname ?? '-'}</p>
              <p className="text-body2 text-gray-200">{user?.email ?? '-'}</p>
              <p className="mt-1 text-body2 text-gray-200">
                총 {totalSessions}회 연습
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              useAuthStore.getState().logout();
            }}
          >
            로그아웃
          </Button>
        </CardContent>
      </Card>

      {/* 통계 카드 4개 */}
      <section className="grid grid-cols-4 gap-6">
        <StatCard
          title="최근 점수"
          value={String(latestScore)}
          sub={totalSessions > 1 ? `이전 대비` : '첫 세션'}
          icon={TrendingUp}
        />
        <StatCard
          title="평균 점수"
          value={String(avgScore)}
          sub="전체 연습 기준"
          icon={BarChart3}
        />
        <StatCard
          title="총 세션"
          value={String(totalSessions)}
          sub="완료된 연습"
          icon={CalendarDays}
        />
        <StatCard
          title="총 답변"
          value={String(totalAnswer)}
          sub="완료한 질문"
          icon={MessageSquare}
        />
      </section>

      {/* 차트 영역 */}
      <section className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader className="font-semibold">점수 추이</CardHeader>
          <CardContent>
            <ScoreTrendChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="font-semibold">최근 세션 역량 분석</CardHeader>
          <CardContent>
            <SkillRadarChart />
          </CardContent>
        </Card>
      </section>

      {/* 면접 기록 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <h3 className="text-lg font-semibold">면접 기록</h3>
          <div className="flex items-center gap-3">
            {/* 검색 */}
            <div className="relative">
              <Input
                className="h-9 w-[180px] pl-9 pr-3 text-sm shadow-none"
                type="text"
                onChange={(e) => {
                  setSearchWord(e.target.value);
                  setPage(1);
                }}
                placeholder="레포트 제목 검색..."
              />
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            {/* 필터 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex h-9 items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  정렬
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setSortOrder('desc');
                    setPage(1);
                  }}
                  className="flex justify-between"
                >
                  내림차순
                  {sortOrder === 'desc' && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSortOrder('asc');
                    setPage(1);
                  }}
                  className="flex justify-between"
                >
                  오름차순
                  {sortOrder === 'asc' && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <section className="flex flex-col gap-4 p-6">
          {isLoading ? (
            <p className="text-center text-muted-foreground">로딩 중...</p>
          ) : isError ? (
            <p className="text-center text-destructive">
              데이터를 불러오는 중 오류가 발생했습니다.
            </p>
          ) : !records?.length ? (
            <p className="text-center text-muted-foreground">
              면접 기록이 없습니다.
            </p>
          ) : !filteredRecords.length ? (
            <p className="text-center text-muted-foreground">
              "{searchWord}"에 대한 검색 결과가 없습니다.
            </p>
          ) : (
            <>
              {visibleRecords.map((record) => (
                <InterviewRecordItem key={record.id} record={record} />
              ))}
            </>
          )}

          {totalPages > 1 && (
            <RecordPagination
              currentPage={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          )}
        </section>
      </Card>
    </div>
  );
}
