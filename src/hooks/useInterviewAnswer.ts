import { useSpeechToText } from './useSpeechToText';

export function useInterviewAnswer() {
  const stt = useSpeechToText();

  const startAnswer = () => {
    stt.startSTT();
  };

  const stopAnswer = () => {
    stt.stopSTT();
  };

  return {
    answerText: stt.answerText,
    startAnswer,
    stopAnswer,
    resetAnswer: stt.resetAnswerText,
  };
}
