import { TimerIcon } from 'lucide-react';

export default function InterviewTimer({ timeLeft }: { timeLeft: number }) {
  const formatTime = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m} : ${s}`;
  };

  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-muted px-3 py-1 shadow">
      <TimerIcon className="h-5 w-5" />
      {formatTime(timeLeft)}
    </div>
  );
}
