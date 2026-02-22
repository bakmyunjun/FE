import { useRef } from 'react';
import type { VoiceMetrics } from '@/types/interview';

const RMS_SILENCE_THRESHOLD = 0.02;
const MIN_PITCH = 80;
const MAX_PITCH = 300;

export function useVoiceMetrics() {
  const pitchRef = useRef<number[]>([]);
  const volumeRef = useRef<number[]>([]);
  const speakingTimeRef = useRef(0);
  const pauseTimeRef = useRef(0);
  const previousFrameTimestampRef = useRef<number | null>(null);

  // 한 프레임의 음성 분석 결과 기록
  const pushFrame = (pitch: number | null, rms: number) => {
    if (pitch !== null && pitch >= MIN_PITCH && pitch <= MAX_PITCH) {
      pitchRef.current.push(pitch);
    }

    volumeRef.current.push(rms);

    const now = performance.now();

    if (previousFrameTimestampRef.current !== null) {
      // 이전 프레임과 현재 프레임 사이 경과 시간
      const delta = (now - previousFrameTimestampRef.current) / 1000;

      // 발화 시간 & 침묵 시간
      if (rms > RMS_SILENCE_THRESHOLD) {
        speakingTimeRef.current += delta;
      } else {
        pauseTimeRef.current += delta;
      }
    } else {
      previousFrameTimestampRef.current = now;
      return;
    }

    previousFrameTimestampRef.current = now;
  };

  // 말하는 속도 계산
  const computeSpeakingRate = (answerText: string) => {
    const syllableCount = answerText.match(/[가-힣]/g)?.length ?? 0;
    const speakingTime = speakingTimeRef.current;

    if (speakingTime === 0) return 0;

    return syllableCount / speakingTime;
  };

  // 누적된 데이터 최종 통계
  const computeFinalMetrics = (answerText: string): VoiceMetrics => {
    const avgPitch = pitchRef.current.length
      ? pitchRef.current.reduce((a, b) => a + b, 0) / pitchRef.current.length
      : 0;

    const avgVolume = volumeRef.current.length
      ? volumeRef.current.reduce((a, b) => a + b, 0) / volumeRef.current.length
      : 0;

    const speakingRate = computeSpeakingRate(answerText);

    return {
      avgPitch: Number(avgPitch.toFixed(1)),
      avgVolume: Number(avgVolume.toFixed(2)),
      speakingRate: Number(speakingRate.toFixed(1)),
      timeDistribution: {
        speaking: Number(speakingTimeRef.current.toFixed(1)),
        pause: Number(pauseTimeRef.current.toFixed(1)),
      },
    };
  };

  const resetMetrics = () => {
    pitchRef.current = [];
    volumeRef.current = [];
    speakingTimeRef.current = 0;
    pauseTimeRef.current = 0;
    previousFrameTimestampRef.current = null;
  };

  return {
    pushFrame,
    computeFinalMetrics,
    resetMetrics,
  };
}
