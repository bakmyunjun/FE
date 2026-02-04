import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { turnMetricsMock } from '@/lib/mock';

export function TurnMetricsChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={turnMetricsMock}>
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
          domain={[0, 28]}
          width={30}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="square"
          align="center"
          formatter={(value) => (
            <span className="text-xs text-muted-foreground">{value}</span>
          )}
        />
        <Bar dataKey="time" name="시간" fill="#3b82f6" radius={[2, 2, 0, 0]} />
        <Bar
          dataKey="eyeOff"
          name="시선이탈"
          fill="#f59e0b"
          radius={[2, 2, 0, 0]}
        />
        <Bar
          dataKey="silence"
          name="침묵비율"
          fill="#059669"
          radius={[2, 2, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
