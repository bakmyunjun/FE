import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { getSkillRadarData, interviewRecords } from '@/lib/mock';

export function SkillRadarChart() {
  // 가장 최근 세션의 metrics 사용
  const latestRecord = interviewRecords[0];
  const data = getSkillRadarData(latestRecord.metrics);

  return (
    <ResponsiveContainer width="100%" height={240}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke="#e5e5e5" />
        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: '#666' }} />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <Radar
          name="역량"
          dataKey="value"
          stroke="#5eead4"
          fill="#5eead4"
          fillOpacity={0.5}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
