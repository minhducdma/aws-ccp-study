import { useMemo, useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import { Badge, Button, ButtonLink, EmptyState } from '../components/ui';
import { isCorrect, lookupQuestion } from '../lib/content';
import { useProgress } from '../lib/progress';
import type { Letter } from '../types';

export default function ReviewPage() {
  const { progress, clearWrong, recordWrong } = useProgress();
  const [attempts, setAttempts] = useState<Record<string, Letter[]>>({});
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const items = useMemo(
    () =>
      Object.entries(progress.wrong)
        .map(([id, times]) => ({ ...lookupQuestion(id), id, times }))
        .filter((item) => item.question)
        .sort((a, b) => b.times - a.times),
    [progress.wrong],
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl">
        <EmptyState
          title="Chưa có câu sai nào"
          description={
            <>
              Mỗi khi bạn trả lời sai ở phần luyện tập, Gate Quiz hay thi thử, câu đó sẽ tự động xuất hiện ở
              đây để ôn lại. Trả lời đúng lần nữa thì câu được xoá khỏi danh sách.
              <div className="mt-5">
                <ButtonLink to="/">Về tổng quan</ButtonLink>
              </div>
            </>
          }
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
          Đây là những câu bạn từng trả lời sai, xếp theo số lần sai nhiều nhất. Trả lời đúng một lần nữa thì
          câu sẽ được xoá khỏi danh sách. Đọc lại danh sách này ngay trước khi thi thật.
        </p>
      </header>

      <div className="space-y-4">
        {items.map((item) => {
          const question = item.question!;
          const selected = attempts[item.id] ?? [];
          const isRevealed = revealed.has(item.id);

          return (
            <div key={item.id} className="space-y-2">
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
                    disabled={selected.length === 0}
                    onClick={() => {
                      setRevealed((prev) => new Set(prev).add(item.id));
                      if (isCorrect(question, selected)) clearWrong(item.id);
                      else recordWrong([item.id]);
                    }}
                    className="text-xs"
                  >
                    Kiểm tra
                  </Button>
                ) : (
                  <>
                    <Button
                      tone="secondary"
                      onClick={() =>
                        setRevealed((prev) => {
                          const next = new Set(prev);
                          next.delete(item.id);
                          return next;
                        })
                      }
                      className="text-xs"
                    >
                      Thử lại
                    </Button>
                    <Button tone="ghost" onClick={() => clearWrong(item.id)} className="text-xs">
                      Đánh dấu đã thuộc
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
