import { Card, CardContent } from '../ui/card';
import { useRef, useEffect } from 'react';

export default function VoiceWaveCard({ voiceWave }: { voiceWave: number[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null); // Canvas DOM 참조

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#3B82F6'; // Tailwind color-blue-500
    ctx.lineWidth = 2;
    ctx.beginPath();

    // 파형 배열 → 화면 좌표 변환
    if (voiceWave.length < 2) return;

    voiceWave.forEach((value, index) => {
      const x = (index / (voiceWave.length - 1)) * width;
      const y = height / 2 + value * (height / 2);

      index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });

    ctx.stroke();
  }, [voiceWave]);

  return (
    <Card className="h-[100px]">
      <CardContent className="flex h-full items-center justify-center p-2">
        <canvas ref={canvasRef} width={300} height={80} className="w-full" />
      </CardContent>
    </Card>
  );
}
