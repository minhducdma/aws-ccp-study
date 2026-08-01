import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Badge,
  Button,
  ButtonLink,
  Card,
  ConfirmDialog,
  EmptyState,
  MissingArt,
  Progress,
  RetryArt,
  StatTile,
  SummitArt,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  fadeUp,
  m,
  stagger,
} from '@study/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
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
        illustration={<MissingArt />}
        title="Chưa có bài thi này"
        description="Nội dung đề chưa được soạn xong. Chạy lại npm run build sau khi file markdown xuất hiện."
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
  const unanswered = questions.length - answeredCount;
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

  const submitDialog = (trigger: React.ReactNode) => (
    <ConfirmDialog
      trigger={trigger}
      title="Nộp bài và xem kết quả?"
      description={
        unanswered > 0
          ? `Còn ${unanswered} câu chưa trả lời và sẽ được tính là sai. Bạn vẫn muốn nộp bài chứ?`
          : 'Bạn đã trả lời hết các câu. Sau khi nộp sẽ không sửa được nữa.'
      }
      confirmLabel="Nộp bài"
      tone={unanswered > 0 ? 'danger' : 'primary'}
      onConfirm={() => submit(answers)}
    />
  );

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header className="sticky top-[57px] z-10 -mx-4 border-b border-line bg-canvas/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone={kind === 'mock' ? 'sky' : 'amber'}>{label}</Badge>
          <span
            role="timer"
            aria-live={urgent ? 'polite' : 'off'}
            aria-label={`Thời gian còn lại ${formatDuration(remaining)}`}
            className={`ml-auto font-mono text-lg font-bold tabular-nums transition-colors ${
              urgent ? 'animate-pulse text-rose-400' : 'text-white'
            }`}
          >
            {formatDuration(remaining)}
          </span>
          {submitDialog(
            <Button tone="secondary" size="sm">
              Nộp bài
            </Button>,
          )}
        </div>
        <div className="mt-2 flex items-center gap-3">
          <Progress value={answeredCount} max={questions.length} label="Số câu đã trả lời" />
          <span className="shrink-0 text-xs text-slate-500">
            {answeredCount}/{questions.length} đã trả lời
          </span>
        </div>
      </header>

      <Card inset="sm">
        <nav
          aria-label="Danh sách câu hỏi"
          className="grid grid-cols-8 gap-1.5 sm:grid-cols-12 lg:grid-cols-[repeat(15,minmax(0,1fr))]"
        >
          {questions.map((q, i) => {
            const answered = (answers[q.id]?.length ?? 0) > 0;
            const isFlagged = flagged.has(q.id);
            return (
              <button
                key={q.id}
                type="button"
                aria-current={i === index ? 'true' : undefined}
                aria-label={`Câu ${i + 1}${answered ? ', đã trả lời' : ', chưa trả lời'}${
                  isFlagged ? ', đã đánh dấu' : ''
                }`}
                onClick={() => {
                  setIndex(i);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`focus-ring relative h-8 rounded-md text-xs font-semibold transition-all duration-200 hover:scale-105 ${
                  i === index
                    ? 'bg-brand-500 text-slate-950'
                    : answered
                      ? 'bg-slate-700 text-white hover:bg-slate-600'
                      : 'bg-slate-800/60 text-slate-500 hover:bg-slate-800'
                }`}
              >
                {i + 1}
                {isFlagged && (
                  <span className="absolute top-0.5 right-0.5 size-1.5 rounded-full bg-sky-400" />
                )}
              </button>
            );
          })}
        </nav>
      </Card>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">
          Câu {index + 1} / {questions.length}
        </span>
        <Button
          tone="ghost"
          size="sm"
          onClick={toggleFlag}
          title="Câu được đánh dấu hiện chấm xanh trên lưới để bạn quay lại nhanh."
        >
          {flagged.has(question.id) ? '● Bỏ đánh dấu' : '○ Đánh dấu xem lại'}
        </Button>
      </div>

      {/* Keyed on the question so each one slides in; no exit animation, which would
          add a delay to every navigation in a timed exam. */}
      <m.div
        key={question.id}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22 }}
      >
        <QuestionCard question={question} selected={selected} onToggle={toggle} />
      </m.div>

      <div className="flex items-center justify-between gap-3">
        <Button
          tone="secondary"
          icon={<ArrowLeftIcon width={16} height={16} />}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          Câu trước
        </Button>
        {index < questions.length - 1 ? (
          <Button onClick={() => setIndex((i) => i + 1)}>
            Câu tiếp
            <ArrowRightIcon width={16} height={16} />
          </Button>
        ) : (
          submitDialog(<Button>Nộp bài</Button>)
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
    <m.div
      className="mx-auto max-w-2xl space-y-6"
      variants={stagger(0.07)}
      initial="hidden"
      animate="visible"
    >
      <m.header variants={fadeUp}>
        <Badge tone={kind === 'mock' ? 'sky' : 'amber'}>
          {kind === 'mock' ? 'Thi thử' : 'Gate Quiz'}
        </Badge>
        <h1 className="mt-3 text-2xl font-bold text-white">{label}</h1>
        {previousPass && (
          <p className="mt-2 text-sm text-emerald-400">Bạn đã pass bài này. Có thể làm lại để ôn.</p>
        )}
      </m.header>

      <m.div variants={fadeUp} className="grid gap-3 sm:grid-cols-3">
        <StatTile label="Số câu" value={total} animate />
        <StatTile label="Thời gian" value={`${timeLimitMin}′`} />
        <StatTile
          label="Cần đúng"
          value={`≥${passScore}`}
          hint={`${Math.round((passScore / total) * 100)}%`}
        />
      </m.div>

      <m.div variants={fadeUp}>
        <Card inset="md">
          <p className="mb-3 text-sm font-semibold text-white">Luật làm bài</p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>· Đồng hồ chạy liên tục, hết giờ hệ thống tự nộp bài.</li>
            <li>· Không có phản hồi đúng/sai trong lúc làm — chỉ xem kết quả sau khi nộp.</li>
            <li>· Câu chưa trả lời tính là sai, không bị trừ điểm thêm nên hãy đoán hết.</li>
            <li>· Câu nhiều đáp án phải chọn đúng tất cả mới được tính điểm.</li>
            <li>· Đóng tab giữa bài sẽ mất bài làm, hãy chuẩn bị đủ {timeLimitMin} phút liền mạch.</li>
          </ul>
        </Card>
      </m.div>

      <m.div variants={fadeUp}>
        <Button onClick={onStart} size="lg" block>
          Bắt đầu làm bài
        </Button>
      </m.div>

      {history.length > 0 && (
        <m.div variants={fadeUp}>
          <Card inset="md">
            <p className="mb-3 text-sm font-semibold text-white">Lịch sử làm bài</p>
            <div className="space-y-2">
              {history.map((attempt) => (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between border-b border-line pb-2 text-sm last:border-0 last:pb-0"
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
        </m.div>
      )}
    </m.div>
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
  const pct = Math.round((attempt.score / attempt.total) * 100);
  const currentOrder = course.phases.find((p) => p.gateQuiz?.id === exam.id)?.order ?? 0;
  const nextPhase = course.phases.find((p) => p.order === currentOrder + 1);

  const reviewList = (questions: Question[]) =>
    questions.length === 0 ? (
      <Card inset="lg" className="text-center text-sm text-slate-400">
        Không sai câu nào. Rất tốt.
      </Card>
    ) : (
      <div className="space-y-4">
        {questions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            selected={attempt.answers[q.id] ?? []}
            revealed
            label={`Câu ${exam.questions.indexOf(q) + 1}`}
          />
        ))}
      </div>
    );

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <m.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
        <Card
          inset="lg"
          className={`flex flex-col items-center text-center ${
            attempt.passed
              ? 'border-emerald-500/40 bg-emerald-500/5'
              : 'border-rose-500/40 bg-rose-500/5'
          }`}
        >
          {attempt.passed ? <SummitArt /> : <RetryArt />}

          <p className="mt-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">
            {attempt.label}
          </p>
          <p className="mt-3 text-5xl font-bold text-white tabular-nums">
            {attempt.score}
            <span className="text-2xl text-slate-500">/{attempt.total}</span>
          </p>
          <p
            className={`mt-2 text-lg font-semibold ${
              attempt.passed ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
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
                Sang Phase {nextPhase.order}
                <ArrowRightIcon width={16} height={16} />
              </ButtonLink>
            )}
            {!attempt.passed && <ButtonLink to={url('/review')}>Ôn câu sai</ButtonLink>}
            <ButtonLink to={url()} tone="ghost">
              Về tổng quan
            </ButtonLink>
          </div>
        </Card>
      </m.div>

      {byDomain.length > 1 && (
        <Card inset="md">
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
                        ratio >= 0.7
                          ? 'text-emerald-400'
                          : ratio >= 0.5
                            ? 'text-brand-400'
                            : 'text-rose-400'
                      }
                    >
                      {stat.correct}/{stat.total}
                    </span>
                  </div>
                  <Progress
                    value={stat.correct}
                    max={stat.total}
                    tone={ratio >= 0.7 ? 'green' : 'amber'}
                    label={`Domain ${domain}: ${domainLabel(course, domain)}`}
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
        <h2 className="mb-4 text-lg font-bold text-white">Xem lại bài làm</h2>
        <Tabs defaultValue="wrong">
          <TabsList>
            <TabsTrigger value="wrong">Câu sai ({wrongQuestions.length})</TabsTrigger>
            <TabsTrigger value="all">Tất cả ({exam.questions.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="wrong">{reviewList(wrongQuestions)}</TabsContent>
          <TabsContent value="all">{reviewList(exam.questions)}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
