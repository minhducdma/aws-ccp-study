import {
  Badge,
  BookIcon,
  Button,
  ButtonLink,
  Card,
  CheckIcon,
  ConfirmDialog,
  FlameIcon,
  LockIcon,
  Progress,
  StatTile,
  Switch,
  TargetIcon,
  TrophyIcon,
  fadeUp,
  m,
  stagger,
} from '@study/ui';
import { useCourse } from '../lib/course';
import { bestAttempt, hasPassed, useProgress } from '../lib/progress';

export default function Dashboard() {
  const { course, url } = useCourse();
  const { progress, setFreeMode, resetAll } = useProgress(course);

  const passedPhases = course.phases.filter((p) => hasPassed(progress, p.gateQuiz?.id));
  const readinessWeight = passedPhases.reduce((sum, p) => sum + p.weight, 0);
  const wrongCount = Object.keys(progress.wrong).length;
  const nextPhase = course.phases.find((p) => p.ready && !hasPassed(progress, p.gateQuiz?.id));

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <p className="text-xs font-semibold tracking-widest text-brand-500 uppercase">
          Lộ trình ~{course.estimatedHours} giờ · {course.code}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">{course.title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
          {course.phases.length} phase chia theo đúng tỉ lệ các domain của kỳ thi. Mỗi phase học notes,
          luyện câu hỏi thật, rồi làm Gate Quiz đạt ngưỡng mới sang phase kế tiếp.
        </p>
      </header>

      <m.div
        className="grid gap-3 sm:grid-cols-4"
        variants={stagger(0.07)}
        initial="hidden"
        animate="visible"
      >
        <m.div variants={fadeUp}>
          <StatTile
            label="Độ sẵn sàng"
            value={readinessWeight}
            suffix="%"
            animate
            icon={<TargetIcon width={18} height={18} />}
            hint={`${passedPhases.length}/${course.phases.length} phase đã pass`}
          />
        </m.div>
        <m.div variants={fadeUp}>
          <StatTile
            label="Câu hỏi trong khoá"
            value={course.questionCount}
            animate
            icon={<BookIcon width={18} height={18} />}
            hint="lấy từ practice exam gốc"
          />
        </m.div>
        <m.div variants={fadeUp}>
          <StatTile
            label="Câu đang sai"
            value={wrongCount}
            animate
            icon={<FlameIcon width={18} height={18} />}
            hint="cần ôn lại"
          />
        </m.div>
        <m.div variants={fadeUp}>
          <StatTile
            label="Điểm đậu thật"
            value={`${course.exam.passScore}/${course.exam.maxScore}`}
            icon={<TrophyIcon width={18} height={18} />}
            hint={`${course.exam.totalQuestions} câu · ${course.exam.durationMin} phút`}
          />
        </m.div>
      </m.div>

      {nextPhase && (
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <Card
            inset="md"
            className="relative flex flex-wrap items-center justify-between gap-4 overflow-hidden border-brand-500/30 bg-brand-500/5"
          >
            {/* Soft moving glow so the primary call to action reads as the live one */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -right-10 size-40 animate-float rounded-full bg-brand-500/10 blur-3xl"
            />
            <div className="relative">
              <p className="text-xs font-semibold tracking-wide text-brand-400 uppercase">
                Việc tiếp theo
              </p>
              <p className="mt-1 font-semibold text-white">
                Phase {nextPhase.order}: {nextPhase.title}
              </p>
              <p className="mt-0.5 text-sm text-slate-400">
                {nextPhase.notes.length > 0 && !progress.notesRead[nextPhase.notes[0].id]
                  ? 'Bắt đầu bằng phần kiến thức trọng tâm.'
                  : 'Tiếp tục luyện tập rồi làm Gate Quiz.'}
              </p>
            </div>
            <ButtonLink
              className="relative"
              to={
                nextPhase.notes.length > 0 && !progress.notesRead[nextPhase.notes[0].id]
                  ? url(`/phase/${nextPhase.id}/notes/${nextPhase.notes[0].id}`)
                  : url(`/phase/${nextPhase.id}/practice`)
              }
            >
              Tiếp tục học
            </ButtonLink>
          </Card>
        </m.div>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">{course.phases.length} phase</h2>
        <m.div
          className="space-y-3"
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {course.phases.map((phase) => {
            const previous = course.phases.find((p) => p.order === phase.order - 1);
            const locked =
              !progress.freeMode && previous ? !hasPassed(progress, previous.gateQuiz?.id) : false;
            const passed = hasPassed(progress, phase.gateQuiz?.id);
            const best = phase.gateQuiz ? bestAttempt(progress, phase.gateQuiz.id) : undefined;
            const practiceState = phase.practice ? progress.practice[phase.practice.id] : undefined;
            const practiceDone = practiceState?.checked.length ?? 0;
            const practiceTotal = phase.practice?.questions.length ?? 0;
            const notesDone = phase.notes.filter((n) => progress.notesRead[n.id]).length;

            return (
              <m.div key={phase.id} variants={fadeUp}>
                <Card inset="md" className={locked ? 'opacity-60' : ''}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={passed ? 'green' : locked ? 'slate' : 'amber'}>
                          Phase {phase.order}
                        </Badge>
                        <Badge tone="sky">{phase.weight}% đề thi</Badge>
                        <span className="text-xs text-slate-500">~{phase.estimatedHours}h</span>
                        {passed && (
                          <Badge tone="green">
                            <CheckIcon width={12} height={12} />
                            Đã pass
                          </Badge>
                        )}
                        {locked && (
                          <Badge tone="slate">
                            <LockIcon width={12} height={12} />
                            Chưa mở
                          </Badge>
                        )}
                        {!phase.ready && <Badge tone="slate">Đang soạn</Badge>}
                      </div>
                      <h3 className="mt-2 font-semibold text-white">{phase.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">
                        Notes {notesDone}/{phase.notes.length} · Luyện tập {practiceDone}/
                        {practiceTotal} · Gate Quiz{' '}
                        {best ? (
                          <span className={best.passed ? 'text-emerald-400' : 'text-rose-400'}>
                            {best.score}/{best.total}
                          </span>
                        ) : (
                          'chưa làm'
                        )}
                      </p>
                      {practiceTotal > 0 && (
                        <Progress
                          value={practiceDone}
                          max={practiceTotal}
                          tone={passed ? 'green' : 'amber'}
                          className="mt-3 max-w-xs"
                          label={`Tiến độ luyện tập phase ${phase.order}`}
                        />
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {phase.notes.length > 0 && (
                        <ButtonLink
                          to={url(`/phase/${phase.id}/notes/${phase.notes[0].id}`)}
                          tone="secondary"
                          size="sm"
                        >
                          Notes
                        </ButtonLink>
                      )}
                      {phase.practice && (
                        <ButtonLink
                          to={url(`/phase/${phase.id}/practice`)}
                          tone="secondary"
                          size="sm"
                        >
                          Luyện tập
                        </ButtonLink>
                      )}
                      {phase.gateQuiz && (
                        <ButtonLink
                          to={url(`/exam/${phase.gateQuiz.id}`)}
                          tone={passed ? 'secondary' : 'primary'}
                          size="sm"
                        >
                          Gate Quiz
                        </ButtonLink>
                      )}
                    </div>
                  </div>
                </Card>
              </m.div>
            );
          })}
        </m.div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">Thi thử</h2>
        {course.mockExams.length === 0 ? (
          <Card inset="md" className="text-sm text-slate-400">
            Đề mô phỏng đang được soạn. Chạy lại <code className="text-brand-300">npm run build</code>{' '}
            sau khi file markdown xuất hiện.
          </Card>
        ) : (
          course.mockExams.map((mock) => {
            const best = bestAttempt(progress, mock.id);
            return (
              <Card
                key={mock.id}
                variant="interactive"
                inset="md"
                className="flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-semibold text-white">{mock.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {mock.questions.length} câu · {mock.timeLimitMin} phút · cần ≥{mock.passScore} câu
                    {best && (
                      <>
                        {' · điểm tốt nhất '}
                        <span className={best.passed ? 'text-emerald-400' : 'text-rose-400'}>
                          {best.score}/{best.total}
                        </span>
                      </>
                    )}
                  </p>
                </div>
                <ButtonLink to={url(`/exam/${mock.id}`)} tone={best?.passed ? 'secondary' : 'primary'}>
                  {best ? 'Làm lại' : 'Bắt đầu'}
                </ButtonLink>
              </Card>
            );
          })
        )}
      </section>

      <Card inset="md" className="flex flex-wrap items-center justify-between gap-4">
        <Switch
          checked={progress.freeMode}
          onCheckedChange={setFreeMode}
          label="Chế độ học tự do"
          description="Bỏ khoá thứ tự phase để vào bất kỳ phần nào. Ngưỡng pass Gate Quiz vẫn được ghi nhận như cũ."
        />
        <ConfirmDialog
          trigger={<Button tone="ghost">Xoá tiến độ</Button>}
          title={`Xoá toàn bộ tiến độ của ${course.code}?`}
          description="Điểm Gate Quiz, lịch sử thi thử, notes đã đọc và sổ tay câu sai của khoá này sẽ mất. Tiến độ của các chứng chỉ khác không bị ảnh hưởng."
          confirmLabel="Xoá tiến độ"
          onConfirm={resetAll}
        />
      </Card>

      {course.warnings.length > 0 && (
        <Card inset="md" className="border-rose-500/30 bg-rose-500/5">
          <p className="text-sm font-semibold text-rose-300">
            {course.warnings.length} cảnh báo khi đọc nội dung markdown
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-400">
            {course.warnings.slice(0, 8).map((w) => (
              <li key={w}>· {w}</li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
