import { useCourse } from '../lib/course';
import { bestAttempt, hasPassed, useProgress } from '../lib/progress';
import { Badge, Button, ButtonLink, Card, ProgressBar, StatTile } from '../components/ui';

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
        <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
          Lộ trình ~{course.estimatedHours} giờ · {course.code}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">{course.title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
          {course.phases.length} phase chia theo đúng tỉ lệ các domain của kỳ thi. Mỗi phase học notes,
          luyện câu hỏi thật, rồi làm Gate Quiz đạt ngưỡng mới sang phase kế tiếp.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-4">
        <StatTile
          label="Độ sẵn sàng"
          value={`${readinessWeight}%`}
          hint={`${passedPhases.length}/${course.phases.length} phase đã pass`}
        />
        <StatTile
          label="Câu hỏi trong khoá"
          value={course.questionCount}
          hint="lấy từ practice exam gốc"
        />
        <StatTile label="Câu đang sai" value={wrongCount} hint="cần ôn lại" />
        <StatTile
          label="Điểm đậu thật"
          value={`${course.exam.passScore}/${course.exam.maxScore}`}
          hint={`${course.exam.totalQuestions} câu · ${course.exam.durationMin} phút`}
        />
      </div>

      {nextPhase && (
        <Card className="flex flex-wrap items-center justify-between gap-4 border-amber-500/30 bg-amber-500/5 p-5">
          <div>
            <p className="text-xs font-semibold tracking-wide text-amber-400 uppercase">Việc tiếp theo</p>
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
            to={
              nextPhase.notes.length > 0 && !progress.notesRead[nextPhase.notes[0].id]
                ? url(`/phase/${nextPhase.id}/notes/${nextPhase.notes[0].id}`)
                : url(`/phase/${nextPhase.id}/practice`)
            }
          >
            Tiếp tục học
          </ButtonLink>
        </Card>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">{course.phases.length} phase</h2>
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
            <Card key={phase.id} className={`p-5 ${locked ? 'opacity-60' : ''}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={passed ? 'green' : locked ? 'slate' : 'amber'}>
                      Phase {phase.order}
                    </Badge>
                    <Badge tone="sky">{phase.weight}% đề thi</Badge>
                    <span className="text-xs text-slate-500">~{phase.estimatedHours}h</span>
                    {passed && <Badge tone="green">Đã pass</Badge>}
                    {locked && <Badge tone="slate">Chưa mở</Badge>}
                    {!phase.ready && <Badge tone="slate">Đang soạn</Badge>}
                  </div>
                  <h3 className="mt-2 font-semibold text-white">{phase.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Notes {notesDone}/{phase.notes.length} · Luyện tập {practiceDone}/{practiceTotal} ·
                    Gate Quiz{' '}
                    {best ? (
                      <span className={best.passed ? 'text-emerald-400' : 'text-rose-400'}>
                        {best.score}/{best.total}
                      </span>
                    ) : (
                      'chưa làm'
                    )}
                  </p>
                  {practiceTotal > 0 && (
                    <ProgressBar
                      value={practiceDone}
                      max={practiceTotal}
                      tone={passed ? 'green' : 'amber'}
                      className="mt-3 max-w-xs"
                    />
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {phase.notes.length > 0 && (
                    <ButtonLink
                      to={url(`/phase/${phase.id}/notes/${phase.notes[0].id}`)}
                      tone="secondary"
                      className="text-xs"
                    >
                      Notes
                    </ButtonLink>
                  )}
                  {phase.practice && (
                    <ButtonLink
                      to={url(`/phase/${phase.id}/practice`)}
                      tone="secondary"
                      className="text-xs"
                    >
                      Luyện tập
                    </ButtonLink>
                  )}
                  {phase.gateQuiz && (
                    <ButtonLink
                      to={url(`/exam/${phase.gateQuiz.id}`)}
                      tone={passed ? 'secondary' : 'primary'}
                      className="text-xs"
                    >
                      Gate Quiz
                    </ButtonLink>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">Thi thử</h2>
        {course.mockExams.length === 0 ? (
          <Card className="p-5 text-sm text-slate-400">
            Đề mô phỏng đang được soạn. Chạy lại <code className="text-amber-300">npm run build</code>{' '}
            sau khi file markdown xuất hiện.
          </Card>
        ) : (
          course.mockExams.map((mock) => {
            const best = bestAttempt(progress, mock.id);
            return (
              <Card key={mock.id} className="flex flex-wrap items-center justify-between gap-4 p-5">
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

      <Card className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <p className="text-sm font-medium text-white">Chế độ học tự do</p>
          <p className="mt-0.5 text-sm text-slate-400">
            Bỏ khoá thứ tự phase để vào bất kỳ phần nào. Ngưỡng pass Gate Quiz vẫn được ghi nhận như cũ.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            tone={progress.freeMode ? 'primary' : 'secondary'}
            onClick={() => setFreeMode(!progress.freeMode)}
          >
            {progress.freeMode ? 'Đang bật' : 'Đang tắt'}
          </Button>
          <Button
            tone="ghost"
            onClick={() => {
              if (confirm(`Xoá toàn bộ tiến độ của ${course.code}?`)) resetAll();
            }}
          >
            Xoá tiến độ
          </Button>
        </div>
      </Card>

      {course.warnings.length > 0 && (
        <Card className="border-rose-500/30 bg-rose-500/5 p-5">
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
