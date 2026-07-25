import type { Letter, Question } from '../types';
import { isCorrect } from '../lib/content';
import Markdown from './Markdown';
import { Badge } from './ui';

interface Props {
  question: Question;
  selected: Letter[];
  onToggle?: (letter: Letter) => void;
  revealed?: boolean;
  label?: string;
}

export default function QuestionCard({ question, selected, onToggle, revealed = false, label }: Props) {
  const correct = isCorrect(question, selected);
  const interactive = Boolean(onToggle) && !revealed;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {label && <Badge tone="slate">{label}</Badge>}
        {/* Không hiện số đáp án đúng: bản thân câu hỏi đã ghi "(Choose TWO)" khi cần,
            nói thêm số lượng sẽ dễ hơn đề thi thật. */}
        {question.multi && <Badge tone="amber">Chọn nhiều đáp án</Badge>}
        {revealed && (correct ? <Badge tone="green">Đúng</Badge> : <Badge tone="red">Sai</Badge>)}
        {question.source && (
          <span className="ml-auto text-xs text-slate-500">{question.source}</span>
        )}
      </div>

      <p className="text-[15px] leading-relaxed font-medium text-white">{question.text}</p>

      <div className="mt-4 space-y-2">
        {question.options.map((option) => {
          const picked = selected.includes(option.letter);
          const isAnswer = question.correct.includes(option.letter);

          let style = 'border-slate-800 bg-slate-900/60 hover:border-slate-700';
          if (revealed) {
            if (isAnswer) style = 'border-emerald-500/60 bg-emerald-500/10';
            else if (picked) style = 'border-rose-500/60 bg-rose-500/10';
            else style = 'border-slate-800 bg-slate-900/40 opacity-60';
          } else if (picked) {
            style = 'border-amber-500/70 bg-amber-500/10';
          }

          let markerStyle = 'border-slate-600 text-slate-500';
          if (revealed && isAnswer) markerStyle = 'border-emerald-400 bg-emerald-500 text-slate-950';
          else if (revealed && picked) markerStyle = 'border-rose-400 bg-rose-500 text-white';
          else if (picked) markerStyle = 'border-amber-400 bg-amber-500 text-slate-950';

          return (
            <button
              key={option.letter}
              type="button"
              disabled={!interactive}
              onClick={() => onToggle?.(option.letter)}
              className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${style} ${
                interactive ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border text-xs font-bold ${markerStyle} ${
                  question.multi ? 'rounded-md' : 'rounded-full'
                }`}
              >
                {option.letter}
              </span>
              <span className="text-sm leading-relaxed text-slate-200">{option.text}</span>
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <p className="mb-1.5 text-xs font-semibold tracking-wide text-amber-300 uppercase">
            Đáp án: {question.correct.join(', ')}
          </p>
          {question.explanation ? (
            <Markdown className="text-sm">{question.explanation}</Markdown>
          ) : (
            <p className="text-sm text-slate-500">Chưa có giải thích cho câu này.</p>
          )}
        </div>
      )}
    </div>
  );
}
