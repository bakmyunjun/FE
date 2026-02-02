import { useRef, useState, useEffect } from 'react';

export function useVoiceRecorder() {
  const micStreamRef = useRef<MediaStream | null>(null); // 마이크 스트림
  const audioContextRef = useRef<AudioContext | null>(null); // 오디오 처리 엔진
  const analyserRef = useRef<AnalyserNode | null>(null); // 소리 분석기
  const animationRef = useRef<number | null>(null); // 애니메이션 프레임 ID (중단용)

  const [voiceWave, setVoiceWave] = useState<number[]>([]);

  const startRecording = async () => {
    if (audioContextRef.current) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micStreamRef.current = stream;

    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const analyser = audioContext.createAnalyser();
    analyserRef.current = analyser;
    analyser.fftSize = 256; // 파형 해상도 설정

    // 마이크 → 분석기 연결
    const micSource = audioContext.createMediaStreamSource(stream);
    micSource.connect(analyser);

    visualizeWave();
  };

  // 파형 계속 읽는 루프
  const visualizeWave = () => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const bufferSize = analyser.frequencyBinCount;
    const rawData = new Uint8Array(bufferSize);

    const updateWave = () => {
      analyser.getByteTimeDomainData(rawData);

      // 0 ~ 255 → -1 ~ 1 로 정규화
      const normalizedWave = Array.from(rawData).map(
        (value) => (value - 128) / 128,
      );

      setVoiceWave(normalizedWave);
      animationRef.current = requestAnimationFrame(updateWave); // 다음 프레임 예약
    };

    updateWave();
  };

  const stopRecording = () => {
    // 파형 업데이트 루프 중단
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
  };

  useEffect(() => {
    return () => stopRecording();
  }, []);

  return {
    voiceWave,
    startRecording,
    stopRecording,
  };
}
