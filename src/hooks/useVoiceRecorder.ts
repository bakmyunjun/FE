import { useRef, useState } from 'react';
import { useVoiceMetrics } from './useVoiceMetrics';
import { estimatePitch } from '@/lib/utils/estimatePitch';
import type { VoiceMetrics } from '@/types/interview';

const FFT_SIZE = 2048; // 주파수 해상도

export function useVoiceRecorder() {
  const micStreamRef = useRef<MediaStream | null>(null); // 마이크 스트림
  const audioContextRef = useRef<AudioContext | null>(null); // 오디오 처리 엔진
  const analyserRef = useRef<AnalyserNode | null>(null); // 소리 분석기
  const animationRef = useRef<number | null>(null); // 애니메이션 프레임 루프 ID (중단용)

  const metrics = useVoiceMetrics();

  const [voiceMetrics, setVoiceMetrics] = useState<VoiceMetrics>({
    avgPitch: 0,
    avgVolume: 0,
    speakingRate: 0,
    timeDistribution: { speaking: 0, pause: 0 },
  });
  const [voiceWave, setVoiceWave] = useState<number[]>([]);

  const startRecording = async () => {
    if (audioContextRef.current) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micStreamRef.current = stream;

    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const analyser = audioContext.createAnalyser();
    analyserRef.current = analyser;
    analyser.fftSize = FFT_SIZE;

    // 마이크 → 분석기 연결
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    audioLoop();
  };

  // 오디오 프레임 분석 루프
  const audioLoop = () => {
    if (!analyserRef.current || !audioContextRef.current) return;

    const analyser = analyserRef.current;
    const buffer = new Float32Array(analyser.frequencyBinCount);

    const loop = () => {
      analyser.getFloatTimeDomainData(buffer);

      // 기본 주파수 계산 (음높이)
      const pitch = estimatePitch(buffer, audioContextRef.current!.sampleRate);

      // RMS Volume 계산 (음량)
      let sumSquares = 0;
      for (let i = 0; i < buffer.length; i++) {
        sumSquares += buffer[i] * buffer[i];
      }
      const rms = Math.sqrt(sumSquares / buffer.length);

      // 프레임 저장
      metrics.pushFrame(pitch, rms);

      setVoiceWave(Array.from(buffer));

      animationRef.current = requestAnimationFrame(loop);
    };

    loop();
  };

  const stopRecording = (answerText: string) => {
    // 루프 종료
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    micStreamRef.current?.getTracks().forEach((track) => track.stop());
    micStreamRef.current = null;

    audioContextRef.current?.close();
    audioContextRef.current = null;

    analyserRef.current = null;

    setVoiceWave([]);

    const finalMetrics = metrics.computeFinalMetrics(answerText);
    metrics.resetMetrics();

    return finalMetrics;
  };

  return {
    voiceMetrics,
    setVoiceMetrics,
    voiceWave,
    startRecording,
    stopRecording,
  };
}
