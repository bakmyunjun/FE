export interface InterviewRecord {
  id: number;
  score: number;
  date: string;
  duration: string;
  questionProgress: string;
  strengths: string[];
  improvements: string[];
  metrics: {
    logic: number;
    clarity: number;
    eyeContact: number;
    voice: number;
    star: number;
    time: number;
  };
}

// 점수 추이 차트용 데이터
export interface ScoreTrendData {
  date: string;
  score: number;
}

export const scoreTrendData: ScoreTrendData[] = [
  { date: '12/18', score: 58 },
  { date: '12/20', score: 64 },
  { date: '12/22', score: 68 },
  { date: '12/25', score: 72 },
  { date: '12/28', score: 78 },
];

// 역량 분석 레이더 차트용 데이터
export interface SkillRadarData {
  skill: string;
  value: number;
  fullMark: number;
}

export const getSkillRadarData = (metrics: InterviewRecord['metrics']): SkillRadarData[] => [
  { skill: '논리성', value: metrics.logic, fullMark: 100 },
  { skill: '구체성', value: metrics.clarity, fullMark: 100 },
  { skill: '시선', value: metrics.eyeContact, fullMark: 100 },
  { skill: '목소리', value: metrics.voice, fullMark: 100 },
  { skill: 'STAR', value: metrics.star, fullMark: 100 },
  { skill: '시간', value: metrics.time, fullMark: 100 },
];

// 리포트 종합 역량 분석용 DTO
export interface ReportSummarySkills {
  logic: number;        // 논리성
  specificity: number;  // 구체성
  delivery: number;     // 전달력
  eyeContact: number;   // 시선 처리
  voice: number;        // 목소리
  structure: number;    // STAR 구조
}

export interface ReportSummary {
  skills: ReportSummarySkills;
  strengths: string[];
  improvements: string[];
}

export const getReportSkillRadarData = (skills: ReportSummarySkills): SkillRadarData[] => [
  { skill: '논리성', value: skills.logic, fullMark: 100 },
  { skill: '구체성', value: skills.specificity, fullMark: 100 },
  { skill: '전달력', value: skills.delivery, fullMark: 100 },
  { skill: '시선', value: skills.eyeContact, fullMark: 100 },
  { skill: '목소리', value: skills.voice, fullMark: 100 },
  { skill: 'STAR', value: skills.structure, fullMark: 100 },
];

export const reportSummaryMock: ReportSummary = {
  skills: {
    logic: 78,
    specificity: 72,
    delivery: 85,
    eyeContact: 68,
    voice: 74,
    structure: 80,
  },
  strengths: [
    '답변의 논리적 구조가 명확하고 일관성이 있습니다',
    'STAR 기법을 활용한 구조화된 답변이 돋보입니다',
    '핵심 메시지 전달력이 우수합니다',
  ],
  improvements: [
    '구체적인 수치나 성과 데이터를 더 활용해보세요',
    '카메라 응시를 더 자연스럽게 유지해보세요',
    '답변 중 적절한 pause를 활용하면 더 좋습니다',
  ],
};

// 턴별 지표 차트용 DTO
export interface TurnMetricData {
  question: string;    // Q1, Q2, ...
  time: number;        // 답변 시간 (초)
  eyeOff: number;      // 시선 이탈 비율 (%)
  silence: number;     // 침묵 비율 (%)
}

export const turnMetricsMock: TurnMetricData[] = [
  { question: 'Q1', time: 18, eyeOff: 12, silence: 8 },
  { question: 'Q2', time: 22, eyeOff: 8, silence: 5 },
  { question: 'Q3', time: 25, eyeOff: 18, silence: 12 },
  { question: 'Q4', time: 20, eyeOff: 10, silence: 6 },
  { question: 'Q5', time: 24, eyeOff: 14, silence: 9 },
  { question: 'Q6', time: 19, eyeOff: 9, silence: 7 },
  { question: 'Q7', time: 26, eyeOff: 20, silence: 15 },
  { question: 'Q8', time: 21, eyeOff: 11, silence: 8 },
  { question: 'Q9', time: 23, eyeOff: 16, silence: 10 },
  { question: 'Q10', time: 20, eyeOff: 13, silence: 7 },
];

export const interviewRecords: InterviewRecord[] = [
  {
    id: 1,
    score: 72,
    date: '2024-12-25',
    duration: '21분 05초',
    questionProgress: '10/10 질문 완료',
    strengths: ['STAR 기법'],
    improvements: ['목소리 변조', '어휘 다양성'],
    metrics: {
      logic: 75,
      clarity: 65,
      eyeContact: 62,
      voice: 70,
      star: 76,
      time: 84,
    },
  },
  {
    id: 2,
    score: 68,
    date: '2024-12-22',
    duration: '19분 48초',
    questionProgress: '10/10 질문 완료',
    strengths: ['적절한 답변'],
    improvements: ['근거 부족', '시선 이탈'],
    metrics: {
      logic: 70,
      clarity: 60,
      eyeContact: 58,
      voice: 68,
      star: 72,
      time: 80,
    },
  },
  {
    id: 3,
    score: 64,
    date: '2024-12-20',
    duration: '20분 15초',
    questionProgress: '8/10 질문 완료',
    strengths: ['성실한 답변'],
    improvements: ['논리성 보완', '시간 관리', 'STAR 기법'],
    metrics: {
      logic: 68,
      clarity: 58,
      eyeContact: 55,
      voice: 65,
      star: 68,
      time: 70,
    },
  },
];
