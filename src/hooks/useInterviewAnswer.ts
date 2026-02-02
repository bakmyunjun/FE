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
    voice.stopRecording();
    stt.stopSTT();
  };

  return {
    answerText: stt.answerText,
    voiceWave: voice.voiceWave,
    startAnswer,
    stopAnswer,
    resetAnswer: stt.resetAnswerText,
  };
}
