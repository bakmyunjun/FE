import { Card, CardContent } from '@/components/ui/card';

import type { LucideIcon } from 'lucide-react';
import {
  TrendingUp,
  BarChart3,
  CalendarDays,
  MessageSquare,
} from 'lucide-react';

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

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
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
      <section className="grid grid-cols-4 gap-6 md:grid-rows-4">
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
          sub="개의 질문 완료"
          icon={MessageSquare}
        />
      </section>

      {/* 차트 영역 */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <h3 className="mb-4 font-semibold">점수 추이</h3>
          <div className="h-[240px] rounded-md bg-gray-100" />
        </Card>

        <Card>
          <h3 className="mb-4 font-semibold">최근 세션 역량 분석</h3>
          <div className="h-[240px] rounded-md bg-gray-100" />
        </Card>
      </section>

      {/* 면접 기록 */}
      <Card>
        <h3 className="mb-4 font-semibold">면접 기록</h3>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 font-bold">
              78
            </div>
            <div>
              <p className="font-medium">2024-12-28</p>
              <p className="text-sm text-muted-foreground">
                10/10 질문 완료 · 18분 32초
              </p>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">›</span>
        </div>
      </Card>
    </div>
  );
}
