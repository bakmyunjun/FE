import { toast } from 'sonner';
import { useRef, useState } from 'react';

export function useSpeechToText() {
  const recognitionRef = useRef<SpeechRecognition | null>(null); // 음성 인식 엔진
  const restartRef = useRef(false); // STT 자동 재시작 여부 플래그
  const finalTextRef = useRef(''); // 확정된 음성 인식 결과

  const [answerText, setAnswerText] = useState('');

  const createRecognition = (): SpeechRecognition | null => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('브라우저가 음성 인식을 지원하지 않습니다.');
      toast.error('브라우저가 음성 인식을 지원하지 않습니다.', {
        position: 'top-center',
      });
      return null;
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
      if (e.error === 'not-allowed') {
        stopSTT();
        setAnswerText(
          '음성 인식을 사용할 수 없습니다. 마이크 권한을 확인해주세요.',
        );
      }
    };

    // 음성 인식 중단 후 필요 시 STT 재시작
    recognition.onend = () => {
      if (!restartRef.current) return;

      // 새 인스턴스 재생성
      recognitionRef.current = null;
      const newRecognition = createRecognition();

      if (newRecognition) {
        recognitionRef.current = newRecognition;
        try {
          newRecognition.start();
        } catch (err) {
          console.warn('STT 재시작 실패:', err);
        }
      }
    };

    return recognition;
  };

  const startSTT = () => {
    if (recognitionRef.current) return;

    restartRef.current = true;

    const recognition = createRecognition();
    if (!recognition) return;

    try {
      recognition.start();
    } catch (err) {
      console.warn('STT 시작 실패:', err);
    }
    recognitionRef.current = recognition;
  };

  const stopSTT = () => {
    restartRef.current = false;
    recognitionRef.current?.stop();
    recognitionRef.current = null;
  };

  const resetAnswerText = () => {
    finalTextRef.current = '';
    setAnswerText('');
  };

  return { answerText, startSTT, stopSTT, resetAnswerText };
}
