export type MainTopicId = 'frontend' | 'backend';

export type SubTopicId =
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'state'
  | 'quality'
  | 'spring'
  | 'nestjs'
  | 'database'
  | 'network'
  | 'auth';

export interface MainTopic {
  id: MainTopicId;
  label: string;
  subTopics: SubTopic[];
}

export interface SubTopic {
  id: SubTopicId;
  label: string;
}

export const INTERVIEW_TOPICS: MainTopic[] = [
  {
    id: 'frontend',
    label: '프론트엔드',
    subTopics: [
      { id: 'javascript', label: 'Javascript' },
      { id: 'typescript', label: 'TypeScript' },
      { id: 'react', label: 'React' },
      { id: 'state', label: '상태 관리' },
      { id: 'quality', label: '최적화 · 품질' },
    ],
  },
  {
    id: 'backend',
    label: '백엔드',
    subTopics: [
      { id: 'spring', label: 'Spring' },
      { id: 'nestjs', label: 'NestJS' },
      { id: 'database', label: '데이터베이스' },
      { id: 'network', label: 'API 설계 · 통신' },
      { id: 'auth', label: '인증 · 보안' },
    ],
  },
];
