import { Badge, Card, CheckIcon, XIcon, m } from '@study/ui';
import { useI18n } from '../../../i18n';
import { isCorrect } from '../content';
import type { Letter, Question } from '../../../types';
import Markdown from './Markdown';

interface Props {
  question: Question;
  selected: Letter[];
  onToggle?: (letter: Letter) => void;
  revealed?: boolean;
  label?: string;
}

export default function QuestionCard({ question, selected, onToggle, revealed = false, label }: Props) {
  const { t } = useI18n();
  const correct = isCorrect(question, selected);
  const interactive = Boolean(onToggle) && !revealed;

  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {label && <Badge tone="slate">{label}</Badge>}
        {/* Never reveal how many answers are correct: the question text already says
            "(Choose TWO)" when it matters, so stating the count would make this easier
            than the real exam. */}
        {question.multi && <Badge tone="amber">{t('question.multiAnswer')}</Badge>}
        {revealed &&
          (correct ? (
            <Badge tone="green">
              <CheckIcon width={12} height={12} />
              {t('question.correct')}
            </Badge>
          ) : (
            <Badge tone="red">
              <XIcon width={12} height={12} />
              {t('question.wrong')}
            </Badge>
          ))}
        {question.source && <span className="ml-auto text-xs text-slate-500">{question.source}</span>}
      </div>

      <p className="text-[15px] leading-relaxed font-medium text-slate-900">{question.text}</p>

      <div
        className="mt-4 space-y-2"
        role="group"
        aria-label={t(question.multi ? 'question.groupMulti' : 'question.groupSingle')}
      >
        {question.options.map((option) => {
          const picked = selected.includes(option.letter);
          const isAnswer = question.correct.includes(option.letter);

          let style = 'border-line bg-surface/60 hover:border-line-strong';
          if (revealed) {
            if (isAnswer) style = 'border-emerald-500/60 bg-emerald-500/10';
            else if (picked) style = 'border-rose-500/60 bg-rose-500/10';
            else style = 'border-line bg-surface/40 opacity-60';
          } else if (picked) {
            style = 'border-brand-500/70 bg-brand-500/10';
          }

          let markerStyle = 'border-slate-300 text-slate-500';
          if (revealed && isAnswer) markerStyle = 'border-emerald-400 bg-emerald-500 text-slate-950';
          else if (revealed && picked) markerStyle = 'border-rose-400 bg-rose-500 text-slate-900';
          else if (picked) markerStyle = 'border-brand-400 bg-brand-500 text-slate-950';

          /* Answer text colour follows the same correct/incorrect logic as the border and
             marker above, so the verdict is legible at a glance instead of relying only on
             the surrounding box colour. */
          let textStyle = 'text-slate-700';
          if (revealed) {
            if (isAnswer) textStyle = 'font-semibold text-emerald-700';
            else if (picked) textStyle = 'font-semibold text-rose-700';
            else textStyle = 'text-slate-500';
          } else if (picked) {
            textStyle = 'font-medium text-brand-800';
          }

          /* Revealed answers are stated in text as well as in colour, so the result is
             still readable without colour vision. */
          const revealedNote = revealed
            ? isAnswer
              ? t('question.optionCorrect')
              : picked
                ? t('question.optionPickedWrong')
                : ''
            : '';

          return (
            <button
              key={option.letter}
              type="button"
              disabled={!interactive}
              aria-pressed={interactive ? picked : undefined}
              onClick={() => onToggle?.(option.letter)}
              className={`focus-ring flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${style} ${
                interactive ? 'cursor-pointer active:scale-[0.995]' : 'cursor-default'
              }`}
            >
              <span
                className={`mt-0.5 flex size-6 shrink-0 items-center justify-center border text-xs font-bold transition-colors duration-200 ${markerStyle} ${
                  question.multi ? 'rounded-md' : 'rounded-full'
                }`}
                aria-hidden="true"
              >
                {option.letter}
              </span>
              <span className={`text-sm leading-relaxed transition-colors duration-200 ${textStyle}`}>
                {option.text}
                {revealedNote && <span className="sr-only">{revealedNote}</span>}
              </span>
            </button>
          );
        })}
      </div>

      {revealed && (
        <m.div
          className="mt-4 rounded-xl border border-line bg-canvas/60 p-4"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <p className="mb-1.5 text-xs font-semibold tracking-wide text-brand-700 uppercase">
            {t('question.answerIs', { letters: question.correct.join(', ') })}
          </p>
          {question.explanation ? (
            <Markdown className="text-sm">{question.explanation}</Markdown>
          ) : (
            <p className="text-sm text-slate-500">{t('question.noExplanation')}</p>
          )}
        </m.div>
      )}
    </Card>
  );
}
