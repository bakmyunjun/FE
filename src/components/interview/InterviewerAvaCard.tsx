import { Card, CardContent } from '@/components/ui/card';
import InterviewTimer from '@/components/interview/InterviewTimer';
import interviewerAvaVideo from '@/assets/videos/interviewer-ava.mp4';

export default function InterviewerAvaCard({ timeLeft }: { timeLeft: number }) {
  return (
    <Card className="col-span-2 h-[320px] overflow-hidden">
      <CardContent className="relative h-full p-0">
        <div className="flex h-full items-center justify-center">
          <video
            className="h-full w-full object-cover"
            src={interviewerAvaVideo}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        <InterviewTimer timeLeft={timeLeft} />
      </CardContent>
    </Card>
  );
}
