export type AnswerStatus = 'READY' | 'ANSWERING' | 'ANSWERED';

export type FaceMetrics = {
  detectedFrames: number;
  expressionDistribution: {
    neutral: number;
    smile: number;
    frown: number;
  };
};

export type VoiceMetrics = {
  avgPitch: number;
  avgVolume: number;
  speakingRate: number;
  timeDistribution: {
    speaking: number;
    pause: number;
  };
};
