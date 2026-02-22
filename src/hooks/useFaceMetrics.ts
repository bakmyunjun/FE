import * as faceapi from 'face-api.js';
import { useRef, useState } from 'react';
import type { FaceMetrics } from '@/types/interview';

export function useFaceMetrics(
  videoRef: React.RefObject<HTMLVideoElement | null>,
) {
  const modelsLoadedRef = useRef(false); // face-api 모델 로드 상태 캐싱
  const detectedFramesRef = useRef(0); // 얼굴이 정상적으로 감지된 프레임 수
  const expressionSumRef = useRef({
    // 각 감정 점수의 누적 합
    neutral: 0,
    happy: 0,
    sad: 0,
    angry: 0,
    disgusted: 0,
  });

  const [faceMetrics, setFaceMetrics] = useState<FaceMetrics | null>(null);

  // 얼굴 검출 모델 + 표정 모델 로드
  const loadFaceExpressionModels = async () => {
    if (modelsLoadedRef.current) return;

    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    ]);

    modelsLoadedRef.current = true;
  };

  const startTracking = async () => {
    await loadFaceExpressionModels();

    const trackingIntervalId = window.setInterval(async () => {
      const video = videoRef.current;
      if (!video) return;

      // 얼굴 검출 + 표정 추론
      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (!detection?.expressions) return;

      detectedFramesRef.current++;

      const exp = detection.expressions;
      expressionSumRef.current.neutral += exp.neutral ?? 0;
      expressionSumRef.current.happy += exp.happy ?? 0;
      expressionSumRef.current.sad += exp.sad ?? 0;
      expressionSumRef.current.angry += exp.angry ?? 0;
      expressionSumRef.current.disgusted += exp.disgusted ?? 0;
    }, 200);

    return trackingIntervalId;
  };

  const stopTracking = (trackingIntervalId: number | null) => {
    if (trackingIntervalId !== null) clearInterval(trackingIntervalId);

    const frames = detectedFramesRef.current || 1;

    const avg = {
      neutral: expressionSumRef.current.neutral / frames,
      happy: expressionSumRef.current.happy / frames,
      sad: expressionSumRef.current.sad / frames,
      angry: expressionSumRef.current.angry / frames,
      disgusted: expressionSumRef.current.disgusted / frames,
    };
    const frownAvg = avg.angry * 0.5 + avg.disgusted * 0.3 + avg.sad * 0.2;

    const total = avg.neutral + avg.happy + frownAvg || 1;

    const distribution = {
      neutral: Number((avg.neutral / total).toFixed(1)),
      smile: Number((avg.happy / total).toFixed(1)),
      frown: Number((frownAvg / total).toFixed(1)),
    };

    const metrics: FaceMetrics = {
      detectedFrames: detectedFramesRef.current,
      expressionDistribution: distribution,
    };

    setFaceMetrics(metrics);

    detectedFramesRef.current = 0;
    expressionSumRef.current = {
      neutral: 0,
      happy: 0,
      sad: 0,
      angry: 0,
      disgusted: 0,
    };

    return metrics;
  };

  return {
    faceMetrics,
    startTracking,
    stopTracking,
  };
}
