import { useVoiceRecorder } from './useVoiceRecorder';
import { useSpeechToText } from './useSpeechToText';
import { useFaceMetrics } from './useFaceMetrics';
import { useRef } from 'react';

export function useInterviewAnswer(
  videoRef: React.RefObject<HTMLVideoElement | null>,
) {
  const voice = useVoiceRecorder();
  const stt = useSpeechToText();
  const face = useFaceMetrics(videoRef);

  const faceIntervalRef = useRef<number | null>(null);

  const startAnswer = async () => {
    await voice.startRecording();
    stt.startSTT();
    faceIntervalRef.current = await face.startTracking();
  };

  const stopAnswer = () => {
    stt.stopSTT();
    face.stopTracking(faceIntervalRef.current);

    const finalMetrics = voice.stopRecording(stt.answerText);
    voice.setVoiceMetrics(finalMetrics);
  };

  return {
    answerText: stt.answerText,
    faceMetrics: face.faceMetrics,
    voiceMetrics: voice.voiceMetrics,
    voiceWave: voice.voiceWave,
    startAnswer,
    stopAnswer,
    resetAnswer: stt.resetAnswerText,
  };
}
