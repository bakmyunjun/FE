import type { ReportViewHeader } from '@/types/interview';

interface Props {
  header: ReportViewHeader;
}

export default function ReportHeader({ header }: Props) {
  return (
    <section className="rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-500 p-8 text-white">
      {/* 제목 영역 */}
      <div>
        <h1 className="text-2xl font-bold">{header.title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-200">
          {header.summary}
        </p>
      </div>
    </section>
  );
}
