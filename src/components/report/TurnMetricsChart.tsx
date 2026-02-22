import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import type { PerTurnScore } from '@/types/interview';

interface Props {
  perTurnScores: PerTurnScore[];
}

export function TurnMetricsChart({ perTurnScores }: Props) {
  const data = perTurnScores.map((item) => ({
    turn: `Q${item.turnIndex}`,
    score: item.score,
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
        <XAxis
          dataKey="turn"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#666' }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#666' }}
          domain={[0, 100]}
          width={30}
        />
        <Bar
          dataKey="score"
          name="점수"
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
