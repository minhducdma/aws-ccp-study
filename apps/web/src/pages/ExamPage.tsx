import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { Badge, Button, ButtonLink, Card, EmptyState, ProgressBar, StatTile } from '../components/ui';
import { domainLabel, formatDuration, getExam, isCorrect } from '../lib/content';
import { useCourse } from '../lib/course';
import { attemptsFor, hasPassed, useProgress } from '../lib/progress';
import type { Attempt, Course, Letter, Question } from '../types';

type Stage = 'intro' | 'running' | 'result';

export default function ExamPage() {
  const { examId } = useParams();
  const { course } = useCourse();
  const exam = getExam(course, examId);
  const { progress, saveAttempt } = useProgress(course);

  const [stage, setStage] = useState<Stage>('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Letter[]>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [startedAt, setStartedAt] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [result, setResult] = useState<Attempt | null>(null);

  const submit = useCallback(
    (finalAnswers: Record<string, Letter[]>) => {
      if (!exam) return;
      const score = exam.questions.filter((q) => isCorrect(q, finalAnswers[q.id])).length;
      const attempt: Attempt = {
        id: `${exam.id}-${Date.now()}`,
        examId: exam.id,
        kind: exam.kind,
        label: exam.label,
        startedAt,
        finishedAt: Date.now(),
        score,
        total: exam.questions.length,
        passScore: exam.passScore,
        passed: score >= exam.passScore,
        answers: finalAnswers,
      };
      saveAttempt(attempt);
      setResult(attempt);
      setStage('result');
      window.scrollTo({ top: 0 });
    },
    [exam, saveAttempt, startedAt],
  );

  useEffect(() => {
    if (stage !== 'running') return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [stage]);

  useEffect(() => {
    if (stage === 'running' && deadline > 0 && now >= deadline) submit(answers);
  }, [stage, deadline, now, answers, submit]);

  if (!exam) {
    return (
      <EmptyState
        title="Chưa có bài thi này"
        description="Nội dung đề chưa được soạn xong. Chạy lại npm run content sau khi file markdown xuất hiện."
      />
    );
  }

  const { questions, passScore, timeLimitMin, label, kind } = exam;
  const history = attemptsFor(progress, exam.id);
  const previousPass = hasPassed(progress, exam.id);

  const start = () => {
    const ts = Date.now();
    setAnswers({});
    setFlagged(new Set());
    setIndex(0);
    setStartedAt(ts);
    setDeadline(ts + timeLimitMin * 60_000);
    setNow(ts);
    setResult(null);
    setStage('running');
    window.scrollTo({ top: 0 });
  };

  if (stage === 'intro') {
    return (
      <ExamIntro
        label={label}
        kind={kind}
        total={questions.length}
        passScore={passScore}
        timeLimitMin={timeLimitMin}
        previousPass={previousPass}
        history={history}
        onStart={start}
      />
    );
  }

  if (stage === 'result' && result) {
    return <ExamResult course={course} exam={{ ...exam, questions }} attempt={result} onRetry={start} />;
  }

  const question = questions[index];
  const selected = answers[question.id] ?? [];
  const answeredCount = questions.filter((q) => (answers[q.id]?.length ?? 0) > 0).length;
  const remaining = deadline - now;
  const urgent = remaining < 5 * 60_000;

  const toggle = (letter: Letter) => {
    setAnswers((prev) => {
      const current = prev[question.id] ?? [];
      const next = question.multi
        ? current.includes(letter)
          ? current.filter((l) => l !== letter)
          : [...current, letter]
        : [letter];
      return { ...prev, [question.id]: next };
    });
  };

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(question.id)) next.delete(question.id);
      else next.add(question.id);
      return next;
    });
  };

  const confirmSubmit = () => {
    const unanswered = questions.length - answeredCount;
    const message =
      unanswered > 0
        ? `Còn ${unanswered} câu chưa trả lời (tính là sai). Nộp bài luôn?`
        : 'Nộp bài và xem kết quả?';
    if (confirm(message)) submit(answers);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header className="sticky top-[57px] z-10 -mx-4 border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone={kind === 'mock' ? 'sky' : 'amber'}>{label}</Badge>
          <span
            className={`ml-auto font-mono text-lg font-bold tabular-nums ${
              urgent ? 'text-rose-400' : 'text-white'
            }`}
          >
            {formatDuration(remaining)}
          </span>
          <Button tone="secondary" onClick={confirmSubmit} className="text-xs">
            Nộp bài
          </Button>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <ProgressBar value={answeredCount} max={questions.length} />
          <span className="shrink-0 text-xs text-slate-500">
            {answeredCount}/{questions.length} đã trả lời
          </span>
        </div>
      </header>

      <Card className="p-4">
        <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-12 lg:grid-cols-[repeat(15,minmax(0,1fr))]">
          {questions.map((q, i) => {
            const answered = (answers[q.id]?.length ?? 0) > 0;
            const isFlagged = flagged.has(q.id);
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  setIndex(i);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative h-8 rounded-md text-xs font-semibold transition-colors ${
                  i === index
                    ? 'bg-amber-500 text-slate-950'
                    : answered
                      ? 'bg-slate-700 text-white hover:bg-slate-600'
                      : 'bg-slate-800/60 text-slate-500 hover:bg-slate-800'
                }`}
              >
                {i + 1}
                {isFlagged && (
                  <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-sky-400" />
                )}
              </button>
            );
          })}
        </div>
      </Card>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">
          Câu {index + 1} / {questions.length}
        </span>
        <Button tone="ghost" onClick={toggleFlag} className="text-xs">
          {flagged.has(question.id) ? '● Bỏ đánh dấu' : '○ Đánh dấu xem lại'}
        </Button>
      </div>

      <QuestionCard question={question} selected={selected} onToggle={toggle} />

      <div className="flex items-center justify-between gap-3">
        <Button tone="secondary" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
          ← Câu trước
        </Button>
        {index < questions.length - 1 ? (
          <Button onClick={() => setIndex((i) => i + 1)}>Câu tiếp →</Button>
        ) : (
          <Button onClick={confirmSubmit}>Nộp bài</Button>
        )}
      </div>
    </div>
  );
}

function ExamIntro({
  label,
  kind,
  total,
  passScore,
  timeLimitMin,
  previousPass,
  history,
  onStart,
}: {
  label: string;
  kind: 'gate' | 'mock';
  total: number;
  passScore: number;
  timeLimitMin: number;
  previousPass: boolean;
  history: Attempt[];
  onStart: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <Badge tone={kind === 'mock' ? 'sky' : 'amber'}>{kind === 'mock' ? 'Thi thử' : 'Gate Quiz'}</Badge>
        <h1 className="mt-3 text-2xl font-bold text-white">{label}</h1>
        {previousPass && (
          <p className="mt-2 text-sm text-emerald-400">Bạn đã pass bài này. Có thể làm lại để ôn.</p>
        )}
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatTile label="Số câu" value={total} />
        <StatTile label="Thời gian" value={`${timeLimitMin}′`} />
        <StatTile
          label="Cần đúng"
          value={`≥${passScore}`}
          hint={`${Math.round((passScore / total) * 100)}%`}
        />
      </div>

      <Card className="p-5">
        <p className="mb-3 text-sm font-semibold text-white">Luật làm bài</p>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>· Đồng hồ chạy liên tục, hết giờ hệ thống tự nộp bài.</li>
          <li>· Không có phản hồi đúng/sai trong lúc làm — chỉ xem kết quả sau khi nộp.</li>
          <li>· Câu chưa trả lời tính là sai, không bị trừ điểm thêm nên hãy đoán hết.</li>
          <li>· Câu nhiều đáp án phải chọn đúng tất cả mới được tính điểm.</li>
          <li>· Đóng tab giữa bài sẽ mất bài làm, hãy chuẩn bị đủ {timeLimitMin} phút liền mạch.</li>
        </ul>
      </Card>

      <Button onClick={onStart} className="w-full py-3">
        Bắt đầu làm bài
      </Button>

      {history.length > 0 && (
        <Card className="p-5">
          <p className="mb-3 text-sm font-semibold text-white">Lịch sử làm bài</p>
          <div className="space-y-2">
            {history.map((attempt) => (
              <div
                key={attempt.id}
                className="flex items-center justify-between border-b border-slate-800 pb-2 text-sm last:border-0 last:pb-0"
              >
                <span className="text-slate-400">
                  {new Date(attempt.startedAt).toLocaleString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  <span className="ml-2 text-xs text-slate-600">
                    {formatDuration(attempt.finishedAt - attempt.startedAt)}
                  </span>
                </span>
                <span className={attempt.passed ? 'text-emerald-400' : 'text-rose-400'}>
                  {attempt.score}/{attempt.total} {attempt.passed ? '· Pass' : '· Chưa đạt'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function ExamResult({
  course,
  exam,
  attempt,
  onRetry,
}: {
  course: Course;
  exam: { id: string; label: string; kind: 'gate' | 'mock'; questions: Question[]; passScore: number };
  attempt: Attempt;
  onRetry: () => void;
}) {
  const { url } = useCourse();
  const [filter, setFilter] = useState<'all' | 'wrong'>('wrong');

  const byDomain = useMemo(() => {
    const map = new Map<number, { total: number; correct: number }>();
    for (const q of exam.questions) {
      if (q.domain == null) continue;
      const entry = map.get(q.domain) ?? { total: 0, correct: 0 };
      entry.total += 1;
      if (isCorrect(q, attempt.answers[q.id])) entry.correct += 1;
      map.set(q.domain, entry);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [exam.questions, attempt.answers]);

  const wrongQuestions = exam.questions.filter((q) => !isCorrect(q, attempt.answers[q.id]));
  const shown = filter === 'wrong' ? wrongQuestions : exam.questions;
  const pct = Math.round((attempt.score / attempt.total) * 100);
  const currentOrder = course.phases.find((p) => p.gateQuiz?.id === exam.id)?.order ?? 0;
  const nextPhase = course.phases.find((p) => p.order === currentOrder + 1);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card
        className={`p-6 text-center ${
          attempt.passed ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-rose-500/40 bg-rose-500/5'
        }`}
      >
        <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">{attempt.label}</p>
        <p className="mt-3 text-5xl font-bold text-white">
          {attempt.score}
          <span className="text-2xl text-slate-500">/{attempt.total}</span>
        </p>
        <p className={`mt-2 text-lg font-semibold ${attempt.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
          {pct}% — {attempt.passed ? 'ĐẠT' : 'CHƯA ĐẠT'}
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Cần ≥{attempt.passScore}/{attempt.total} · làm trong{' '}
          {formatDuration(attempt.finishedAt - attempt.startedAt)}
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Button tone="secondary" onClick={onRetry}>
            Làm lại
          </Button>
          {attempt.passed && exam.kind === 'gate' && nextPhase?.ready && (
            <ButtonLink to={url(`/phase/${nextPhase.id}/notes/${nextPhase.notes[0]?.id ?? ''}`)}>
              Sang Phase {nextPhase.order} →
            </ButtonLink>
          )}
          {!attempt.passed && <ButtonLink to={url('/review')}>Ôn câu sai</ButtonLink>}
          <ButtonLink to={url()} tone="ghost">
            Về tổng quan
          </ButtonLink>
        </div>
      </Card>

      {byDomain.length > 1 && (
        <Card className="p-5">
          <p className="mb-4 text-sm font-semibold text-white">Phân tích theo domain</p>
          <div className="space-y-3">
            {byDomain.map(([domain, stat]) => {
              const ratio = stat.correct / stat.total;
              return (
                <div key={domain}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-300">
                      Domain {domain} — {domainLabel(course, domain)}
                    </span>
                    <span
                      className={
                        ratio >= 0.7 ? 'text-emerald-400' : ratio >= 0.5 ? 'text-amber-400' : 'text-rose-400'
                      }
                    >
                      {stat.correct}/{stat.total}
                    </span>
                  </div>
                  <ProgressBar
                    value={stat.correct}
                    max={stat.total}
                    tone={ratio >= 0.7 ? 'green' : 'amber'}
                  />
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Domain nào dưới 70% thì đọc lại notes của phase tương ứng trước khi thi thật.
          </p>
        </Card>
      )}

      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-white">Xem lại bài làm</h2>
          <div className="flex gap-2">
            <Button
              tone={filter === 'wrong' ? 'primary' : 'secondary'}
              onClick={() => setFilter('wrong')}
              className="text-xs"
            >
              Câu sai ({wrongQuestions.length})
            </Button>
            <Button
              tone={filter === 'all' ? 'primary' : 'secondary'}
              onClick={() => setFilter('all')}
              className="text-xs"
            >
              Tất cả ({exam.questions.length})
            </Button>
          </div>
        </div>

        {shown.length === 0 ? (
          <Card className="p-8 text-center text-sm text-slate-400">
            Không sai câu nào. Rất tốt.
          </Card>
        ) : (
          <div className="space-y-4">
            {shown.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                selected={attempt.answers[q.id] ?? []}
                revealed
                label={`Câu ${exam.questions.indexOf(q) + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
