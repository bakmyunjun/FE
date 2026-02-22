import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Lightbulb, Target } from 'lucide-react';
import type { ReportViewCoaching } from '@/types/interview';

interface Props {
  coaching: ReportViewCoaching;
}

export default function Coaching({ coaching }: Props) {
  const { actionItems, turnSuggestions } = coaching;

  return (
    <div className="flex flex-col gap-4">
      {/* 액션 아이템 */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 font-semibold">
          <Target className="h-5 w-5" />
          액션 아이템
        </CardHeader>
        <CardContent>
          {actionItems.length > 0 ? (
            <ul className="space-y-2">
              {actionItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              액션 아이템이 없습니다.
            </p>
          )}
        </CardContent>
      </Card>

      {/* 턴별 개선 제안 */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 font-semibold">
          <Lightbulb className="h-5 w-5" />
          질문별 개선 제안
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {turnSuggestions.length > 0 ? (
            turnSuggestions.map((suggestion) => (
              <div
                key={suggestion.turnIndex}
                className="rounded-lg border p-4"
              >
                <p className="font-medium">Q{suggestion.turnIndex}. {suggestion.question}</p>
                <div className="mt-2 space-y-1 text-sm">
                  <p className="text-red-600">약점: {suggestion.weakness}</p>
                  <p className="text-green-600">제안: {suggestion.suggestion}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              개선 제안이 없습니다.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
