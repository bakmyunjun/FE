import { CheckCircle } from 'lucide-react';

function SummaryCard({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur">
      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="text-sm leading-relaxed text-neutral-100">{text}</p>
    </div>
  );
}

export default function ReportHeader() {
  return (
    <section className="rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-500 p-8 text-white">
      {/* 제목 영역 */}
      <div>
        <h1 className="text-2xl font-bold">면접 결과 리포트</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-200">
          전반적으로 구조화된 답변을 제시하였으며, 구체적인 수치와 근거를
          보완한다면 더욱 설득력 있는 답변이 될 것입니다.
        </p>
      </div>

      {/* 요약 카드 */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard text="답변의 길이와 구조가 적절하며, 시간 배분이 안정적입니다." />
        <SummaryCard text="기술 용어 사용은 적절하지만, 비전공자 관점의 설명이 다소 부족합니다." />
        <SummaryCard text="비언어적 요소(시선, 목소리 톤)에서 개선이 필요합니다." />
      </div>
    </section>
  );
}
