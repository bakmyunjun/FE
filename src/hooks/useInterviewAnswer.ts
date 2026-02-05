import { useVoiceRecorder } from './useVoiceRecorder';
import { useSpeechToText } from './useSpeechToText';

export function useInterviewAnswer() {
  const voice = useVoiceRecorder();
  const stt = useSpeechToText();

  const startAnswer = async () => {
    await voice.startRecording();
    stt.startSTT();
  };

  const stopAnswer = () => {
    stt.stopSTT();
    const finalMetrics = voice.stopRecording(stt.answerText);

    voice.setVoiceMetrics(finalMetrics);
  };

  return {
    answerText: stt.answerText,
    voiceMetrics: voice.voiceMetrics,
    voiceWave: voice.voiceWave,
    startAnswer,
    stopAnswer,
    resetAnswer: stt.resetAnswerText,
  };
}
