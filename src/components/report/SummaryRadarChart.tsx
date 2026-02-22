import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import type { ReportSummarySkills } from '@/types/interview';

interface Props {
  skills: ReportSummarySkills;
}

interface SkillRadarData {
  skill: string;
  value: number;
  fullMark: number;
}

function getSkillRadarData(skills: ReportSummarySkills): SkillRadarData[] {
  return [
    { skill: '논리성', value: skills.logic, fullMark: 100 },
    { skill: '구체성', value: skills.specificity, fullMark: 100 },
    { skill: '전달력', value: skills.delivery, fullMark: 100 },
    { skill: '시선', value: skills.eyeContact, fullMark: 100 },
    { skill: '목소리', value: skills.voice, fullMark: 100 },
    { skill: 'STAR', value: skills.structure, fullMark: 100 },
  ];
}

export function SummaryRadarChart({ skills }: Props) {
  const data = getSkillRadarData(skills);

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
