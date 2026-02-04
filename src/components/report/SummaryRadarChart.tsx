import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { getReportSkillRadarData, type ReportSummarySkills } from '@/lib/mock';

interface SummaryRadarChartProps {
  skills: ReportSummarySkills;
}

export function SummaryRadarChart({ skills }: SummaryRadarChartProps) {
  const data = getReportSkillRadarData(skills);

  return (
    <ResponsiveContainer width="100%" height={240}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke="#e5e5e5" />
        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: '#666' }} />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <Radar
          name="역량"
          dataKey="value"
          stroke="#3b82f6"
          fill="#93c5fd"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
