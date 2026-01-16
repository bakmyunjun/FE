import Analysis from '@/components/report/Analysis';
import Coaching from '@/components/report/Coaching';
import Record from '@/components/report/Record';
import ReportHeader from '@/components/report/ReportHeader';
import Summary from '@/components/report/Summary';
import { useState } from 'react';

const TABS = [
  { key: 'summary', label: '종합 요약' },
  { key: 'analysis', label: '상세 분석' },
  { key: 'coaching', label: '코칭 & 액션' },
  { key: 'record', label: '전체 기록' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function Report() {
  const [activeTab, setActiveTab] = useState<TabKey>('summary');
  return (
    <div>
      <ReportHeader />
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
          {activeTab === 'summary' && <Summary />}
          {activeTab === 'analysis' && <Analysis />}
          {activeTab === 'coaching' && <Coaching />}
          {activeTab === 'record' && <Record />}
        </div>
      </div>
    </div>
  );
}
