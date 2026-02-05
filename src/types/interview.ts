export type AnswerStatus = 'READY' | 'ANSWERING' | 'ANSWERED';

export type VoiceMetrics = {
  avgPitch: number;
  avgVolume: number;
  speakingRate: number;
  timeDistribution: {
    speaking: number;
    pause: number;
  };
};
