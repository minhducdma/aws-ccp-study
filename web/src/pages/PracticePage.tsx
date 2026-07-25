import { useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { Badge, Button, ButtonLink, Card, EmptyState, ProgressBar } from '../components/ui';
import { getPhase, isCorrect } from '../lib/content';
import { useProgress } from '../lib/progress';
import type { Letter } from '../types';

export default function PracticePage() {
  const { phaseId } = useParams();
  const phase = getPhase(phaseId);
  const { progress, savePractice, resetPractice, recordWrong, clearWrong } = useProgress();
  const [showGrid, setShowGrid] = useState(false);

  if (!phase?.practice) {
    return (
      <EmptyState
        title="Chưa có câu luyện tập"
        description="Bộ câu hỏi của phase này chưa được soạn xong. Chạy lại npm run content sau khi file markdown xuất hiện."
      />
    );
  }

  const setId = phase.practice.id;
  const questions = phase.practice.questions;
  const state = progress.practice[setId] ?? { index: 0, answers: {}, checked: [] };
  const index = Math.min(state.index, questions.length - 1);
  const question = questions[index];
  const selected = state.answers[question.id] ?? [];
  const checked = state.checked.includes(question.id);

  const correctCount = state.checked.filter((id) => {
    const q = questions.find((item) => item.id === id);
    return q ? isCorrect(q, state.answers[id]) : false;
  }).length;

  const toggle = (letter: Letter) => {
    const next = question.multi
      ? selected.includes(letter)
        ? selected.filter((l) => l !== letter)
        : [...selected, letter]
      : [letter];
    savePractice(setId, { answers: { ...state.answers, [question.id]: next } });
  };

  const check = () => {
    savePractice(setId, { checked: [...new Set([...state.checked, question.id])] });
    if (isCorrect(question, selected)) clearWrong(question.id);
    else recordWrong([question.id]);
  };

  const goTo = (nextIndex: number) => {
    savePractice(setId, { index: Math.max(0, Math.min(questions.length - 1, nextIndex)) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="amber">
            Phase {phase.order} · Luyện tập
          </Badge>
          <Badge tone="sky">{phase.title}</Badge>
          <span className="ml-auto text-sm text-slate-400">
            Đúng <span className="font-semibold text-emerald-400">{correctCount}</span>/
            {state.checked.length} đã kiểm tra
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ProgressBar value={state.checked.length} max={questions.length} />
          <span className="shrink-0 text-xs text-slate-500">
            {state.checked.length}/{questions.length}
          </span>
        </div>
      </header>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">
          Câu {index + 1} / {questions.length}
        </span>
        <div className="flex gap-2">
          <Button tone="ghost" onClick={() => setShowGrid((v) => !v)} className="text-xs">
            {showGrid ? 'Ẩn danh sách' : 'Xem danh sách câu'}
          </Button>
          <Button
            tone="ghost"
            onClick={() => {
              if (confirm('Làm lại bộ luyện tập này từ đầu?')) resetPractice(setId);
            }}
            className="text-xs"
          >
            Làm lại từ đầu
          </Button>
        </div>
      </div>

      {showGrid && (
        <Card className="p-4">
          <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-12">
            {questions.map((q, i) => {
              const done = state.checked.includes(q.id);
              const ok = done && isCorrect(q, state.answers[q.id]);
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-8 rounded-md text-xs font-semibold transition-colors ${
                    i === index
                      ? 'bg-amber-500 text-slate-950'
                      : done
                        ? ok
                          ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </Card>
      )}

      <QuestionCard
        question={question}
        selected={selected}
        onToggle={checked ? undefined : toggle}
        revealed={checked}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button tone="secondary" onClick={() => goTo(index - 1)} disabled={index === 0}>
          ← Câu trước
        </Button>
        <div className="flex gap-2">
          {!checked ? (
            <Button onClick={check} disabled={selected.length === 0}>
              Kiểm tra đáp án
            </Button>
          ) : index < questions.length - 1 ? (
            <Button onClick={() => goTo(index + 1)}>Câu tiếp →</Button>
          ) : (
            phase.gateQuiz && <ButtonLink to={`/exam/${phase.gateQuiz.id}`}>Làm Gate Quiz →</ButtonLink>
          )}
        </div>
      </div>

      {state.checked.length === questions.length && phase.gateQuiz && (
        <Card className="border-emerald-500/30 bg-emerald-500/5 p-5">
          <p className="font-semibold text-white">
            Xong toàn bộ {questions.length} câu luyện tập — đúng {correctCount} câu (
            {Math.round((correctCount / questions.length) * 100)}%)
          </p>
          <p className="mt-1 text-sm text-slate-400">
            {correctCount / questions.length >= 0.8
              ? 'Tỉ lệ này đủ tốt để làm Gate Quiz.'
              : 'Nên đọc lại notes và ôn phần câu sai trước khi vào Gate Quiz.'}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <ButtonLink to={`/exam/${phase.gateQuiz.id}`}>Làm Gate Quiz</ButtonLink>
            <ButtonLink to="/review" tone="secondary">
              Ôn câu sai
            </ButtonLink>
          </div>
        </Card>
      )}
    </div>
  );
}
