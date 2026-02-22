import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import type { ReportTurnMetricItem } from '@/types/interview';

interface Props {
  turnMetrics: ReportTurnMetricItem[];
}

export function TurnMetricsChart({ turnMetrics }: Props) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={turnMetrics}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
        <XAxis
          dataKey="question"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#666' }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#666' }}
          width={30}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="time"
          name="답변 시간(초)"
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="eyeOff"
          name="시선 이탈(%)"
          fill="#f59e0b"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="silence"
          name="침묵 비율(%)"
          fill="#ef4444"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
