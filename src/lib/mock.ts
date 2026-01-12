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
