import {
  AllClearArt,
  Badge,
  Button,
  ButtonLink,
  CheckIcon,
  EmptyState,
  RotateIcon,
  fadeUp,
  m,
  stagger,
} from '@study/ui';
import { useMemo, useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import { isCorrect, lookupQuestion } from '../lib/content';
import { useCourse } from '../lib/course';
import { useProgress } from '../lib/progress';
import type { Letter } from '../types';

export default function ReviewPage() {
  const { course, url } = useCourse();
  const { progress, clearWrong, recordWrong } = useProgress(course);
  const [attempts, setAttempts] = useState<Record<string, Letter[]>>({});
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const items = useMemo(
    () =>
      Object.entries(progress.wrong)
        .map(([id, times]) => ({ ...lookupQuestion(course, id), id, times }))
        .filter((item) => item.question)
        .sort((a, b) => b.times - a.times),
    [course, progress.wrong],
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl">
        <EmptyState
          illustration={<AllClearArt />}
          title="Chưa có câu sai nào"
          description="Mỗi khi bạn trả lời sai ở phần luyện tập, Gate Quiz hay thi thử, câu đó sẽ tự động xuất hiện ở đây để ôn lại. Trả lời đúng lần nữa thì câu được xoá khỏi danh sách."
          action={<ButtonLink to={url()}>Về tổng quan</ButtonLink>}
        />
      </div>
    );
  }

  const toggle = (questionId: string, letter: Letter, multi: boolean) => {
    setAttempts((prev) => {
      const current = prev[questionId] ?? [];
      const next = multi
        ? current.includes(letter)
          ? current.filter((l) => l !== letter)
          : [...current, letter]
        : [letter];
      return { ...prev, [questionId]: next };
    });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header>
        <Badge tone="red">Sổ tay câu sai</Badge>
        <h1 className="mt-3 text-2xl font-bold text-white">{items.length} câu cần ôn lại</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Đây là những câu bạn từng trả lời sai, xếp theo số lần sai nhiều nhất. Trả lời đúng một lần
          nữa thì câu sẽ được xoá khỏi danh sách. Đọc lại danh sách này ngay trước khi thi thật.
        </p>
      </header>

      <m.div
        className="space-y-4"
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.02 }}
      >
        {items.map((item) => {
          const question = item.question!;
          const selected = attempts[item.id] ?? [];
          const isRevealed = revealed.has(item.id);

          return (
            <m.div key={item.id} variants={fadeUp} className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500">{item.context}</span>
                <Badge tone="red">Sai {item.times} lần</Badge>
              </div>

              <QuestionCard
                question={question}
                selected={selected}
                onToggle={isRevealed ? undefined : (letter) => toggle(item.id, letter, question.multi)}
                revealed={isRevealed}
              />

              <div className="flex flex-wrap gap-2">
                {!isRevealed ? (
                  <Button
                    size="sm"
                    disabled={selected.length === 0}
                    onClick={() => {
                      setRevealed((prev) => new Set(prev).add(item.id));
                      if (isCorrect(question, selected)) clearWrong(item.id);
                      else recordWrong([item.id]);
                    }}
                  >
                    Kiểm tra
                  </Button>
                ) : (
                  <>
                    <Button
                      tone="secondary"
                      size="sm"
                      icon={<RotateIcon width={14} height={14} />}
                      onClick={() =>
                        setRevealed((prev) => {
                          const next = new Set(prev);
                          next.delete(item.id);
                          return next;
                        })
                      }
                    >
                      Thử lại
                    </Button>
                    <Button
                      tone="ghost"
                      size="sm"
                      icon={<CheckIcon width={14} height={14} />}
                      onClick={() => clearWrong(item.id)}
                    >
                      Đánh dấu đã thuộc
                    </Button>
                  </>
                )}
              </div>
            </m.div>
          );
        })}
      </m.div>
    </div>
  );
}
