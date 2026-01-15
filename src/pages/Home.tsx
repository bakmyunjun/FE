import { InterviewRecordItem } from '@/components/home/InterviewRecordItem';

import { StatCard } from '@/components/home/StatCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { interviewRecords } from '@/lib/mock';

import {
  TrendingUp,
  BarChart3,
  CalendarDays,
  MessageSquare,
  SearchIcon,
  Filter,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col gap-3">
      {/* 프로필 요약 */}
      <Card className="bg-gradient-to-b from-neutral-800 to-neutral-500 text-white">
        <CardContent className="flex flex-row items-center gap-4 pt-6">
          <div className="h-14 w-14 rounded-full bg-gray-300" />
          <div>
            <p className="text-xl font-bold">hochoi8621</p>
            <p className="text-sm text-gray-200">hochoi8621@gmail.com</p>
            <p className="mt-1 text-sm text-gray-200">
              총 5회 연습 · 평균 68점
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 통계 카드 4개 */}
      <section className="grid grid-cols-4 gap-6">
        <StatCard title="최근 점수" value="78" sub="+6점" icon={TrendingUp} />
        <StatCard
          title="평균 점수"
          value="68"
          sub="전체 세션 기준"
          icon={BarChart3}
        />
        <StatCard
          title="총 세션"
          value="5"
          sub="완료된 연습"
          icon={CalendarDays}
        />
        <StatCard
          title="총 답변"
          value="48"
          sub="6개의 질문 완료"
          icon={MessageSquare}
        />
      </section>

      {/* 차트 영역 */}
      <section className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader className="font-semibold">점수 추이</CardHeader>
          <CardContent>
            <div className="h-[240px] rounded-md bg-gray-100" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="font-semibold">최근 섹션 역량 분석</CardHeader>
          <CardContent>
            <div className="h-[240px] rounded-md bg-gray-100" />
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
                type="text"
                placeholder="검색..."
                className="h-9 w-[180px] pl-9 pr-3 text-sm shadow-none"
              />
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            {/* 필터*/}
            <Button variant="outline" className="flex h-9 items-center gap-2">
              <Filter className="h-4 w-4" />
              전체
            </Button>
          </div>
        </CardHeader>
        {/* 면접 기록*/}
        <section className="flex flex-col gap-4 p-6">
          {interviewRecords.map((record) => (
            <InterviewRecordItem key={record.id} record={record} />
          ))}
        </section>
      </Card>
    </div>
  );
}
