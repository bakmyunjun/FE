import { Button } from '../ui/button';
import {
  INTERVIEW_TOPICS,
  type MainTopicId,
  type SubTopicId,
} from '@/types/interview';

const MAIN_TOPIC_BUTTON_CLASS = 'h-10 w-28 px-4';
const SUB_TOPIC_BUTTON_CLASS = 'h-8 w-28 px-4';

type Props = {
  mainTopicId: MainTopicId | null;
  subTopicIds: SubTopicId[];
  onSelectMainTopic: (id: MainTopicId) => void;
  onToggleSubTopic: (id: SubTopicId) => void;
};

export default function TopicSelector({
  mainTopicId,
  subTopicIds,
  onSelectMainTopic,
  onToggleSubTopic,
}: Props) {
  const selectedMainTopic = INTERVIEW_TOPICS.find(
    (topic) => topic.id === mainTopicId,
  );

  return (
    <>
      {/* 메인 주제 */}
      <div className="mb-2 flex gap-2">
        {INTERVIEW_TOPICS.map((topic) => (
          <Button
            key={topic.id}
            className={MAIN_TOPIC_BUTTON_CLASS}
            variant={mainTopicId === topic.id ? 'default' : 'outline'}
            onClick={() => onSelectMainTopic(topic.id)}
          >
            {topic.label}
          </Button>
        ))}
      </div>

      {mainTopicId !== null && subTopicIds.length === 0 && (
        <p className="text-caption text-muted-foreground">
          · 서브 주제를 1개 이상 선택해주세요.
        </p>
      )}

      {/* 서브 주제 */}
      {selectedMainTopic && (
        <div className="flex gap-2">
          {selectedMainTopic.subTopics.map((sub) => (
            <Button
              key={sub.id}
              className={SUB_TOPIC_BUTTON_CLASS}
              variant={subTopicIds.includes(sub.id) ? 'default' : 'outline'}
              onClick={() => onToggleSubTopic(sub.id)}
            >
              {sub.label}
            </Button>
          ))}
        </div>
      )}
    </>
  );
}
