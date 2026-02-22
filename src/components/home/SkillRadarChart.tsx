import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { useInterviewRecords } from '@/hooks/queries/useInterviewRecords';
import type { InterviewRecordMetrics } from '@/types/interview';

interface SkillRadarData {
  skill: string;
  value: number;
  fullMark: number;
}

function getSkillRadarData(metrics: InterviewRecordMetrics): SkillRadarData[] {
  return [
    { skill: '논리성', value: metrics.logic, fullMark: 100 },
    { skill: '구체성', value: metrics.clarity, fullMark: 100 },
    { skill: '시선', value: metrics.eyeContact, fullMark: 100 },
    { skill: '목소리', value: metrics.voice, fullMark: 100 },
    { skill: 'STAR', value: metrics.star, fullMark: 100 },
    { skill: '시간', value: metrics.time, fullMark: 100 },
  ];
}

export function SkillRadarChart() {
  const { data: records, isLoading } = useInterviewRecords();

  if (isLoading) {
    return (
      <div className="flex h-[240px] items-center justify-center">
        <p className="text-sm text-muted-foreground">로딩 중...</p>
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div className="flex h-[240px] items-center justify-center">
        <p className="text-sm text-muted-foreground">데이터가 없습니다.</p>
      </div>
    );
  }

  // 가장 최근 세션의 metrics 사용
  const latestRecord = records[0];
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
