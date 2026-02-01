import { toast } from 'sonner';
import { useRef, useState } from 'react';

export function useSpeechToText() {
  const recognitionRef = useRef<SpeechRecognition | null>(null); // 음성 인식 엔진
  const finalTextRef = useRef(''); // 확정된 음성 인식 결과

  const [answerText, setAnswerText] = useState('');

  const startSTT = () => {
    if (recognitionRef.current) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('브라우저가 음성 인식을 지원하지 않습니다.');
      toast.error('브라우저가 음성 인식을 지원하지 않습니다.', {
        position: 'top-center',
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (e) => {
      let interimText = '';

      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i];

        if (result.isFinal) {
          finalTextRef.current += result[0].transcript + ' ';
        } else {
          interimText += result[0].transcript;
        }
      }

      setAnswerText(finalTextRef.current + interimText);
    };

    recognition.onerror = (e) => {
      stopSTT();
      console.error('STT error:', e.error);
      toast.error('음성 인식을 사용할 수 없습니다.', {
        description: '마이크 권한을 확인해주세요.',
      });
      setAnswerText(
        '음성 인식을 사용할 수 없습니다. 마이크 권한을 확인해주세요.',
      );
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopSTT = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
  };

  const resetAnswerText = () => {
    finalTextRef.current = '';
    setAnswerText('');
  };

  return { answerText, startSTT, stopSTT, resetAnswerText };
}
