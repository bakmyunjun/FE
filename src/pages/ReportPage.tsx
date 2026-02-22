import Analysis from '@/components/report/Analysis';
import Coaching from '@/components/report/Coaching';
import Record from '@/components/report/Record';
import ReportHeader from '@/components/report/ReportHeader';
import Summary from '@/components/report/Summary';
import { useInterviewReport } from '@/hooks/queries/useInterviewReport';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const TABS = [
  { key: 'summary', label: '종합 요약' },
  { key: 'analysis', label: '상세 분석' },
  { key: 'coaching', label: '코칭 & 액션' },
  { key: 'record', label: '전체 기록' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function Report() {
  const { id } = useParams<{ id: string }>();
  const reportId = Number(id) || 0;
  const { data, isLoading } = useInterviewReport(id ?? '');
  const [activeTab, setActiveTab] = useState<TabKey>('summary');

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">리포트를 불러오는 중...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">리포트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const { report } = data;
  const { view } = report;

  return (
    <div>
      <ReportHeader header={view.header} />
      <div className="w-full">
        {/* 탭 */}
        <div className="flex border-b">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex-1 py-4 text-sm font-medium transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'} `}
              >
                {tab.label}

                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-foreground" />
                )}
              </button>
            );
          })}
        </div>

        {/* 탭 콘텐츠 */}
        <div className="mt-6">
          {activeTab === 'summary' && <Summary reportId={reportId} />}
          {activeTab === 'analysis' && <Analysis reportId={reportId} />}
          {activeTab === 'coaching' && <Coaching coaching={view.coaching} />}
          {activeTab === 'record' && <Record record={view.record} />}
        </div>
      </div>
    </div>
  );
}
