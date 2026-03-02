import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useScoreTrend } from '@/hooks/queries/useScoreTrend';

export function ScoreTrendChart() {
  const { data: scoreTrendData, isLoading } = useScoreTrend();

  if (isLoading) {
    return (
      <div className="flex h-[240px] items-center justify-center">
        <p className="text-sm text-muted-foreground">로딩 중...</p>
      </div>
    );
  }

  if (!scoreTrendData || scoreTrendData.length === 0) {
    return (
      <div className="flex h-[240px] items-center justify-center">
        <p className="text-sm text-muted-foreground">데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart
        data={scoreTrendData}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#666' }}
        />
        <YAxis
          domain={[0, 100]}
          ticks={[0, 25, 50, 75, 100]}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#666' }}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
