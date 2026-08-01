import { Link } from 'react-router-dom';
import { content, courses } from '../lib/content';
import { courseUrl } from '../lib/course';
import { emptyCourseProgress, hasPassed, useAllProgress } from '../lib/progress';
import { Badge, Card, ProgressBar } from '../components/ui';
import type { Course, CourseProgress } from '../types';

const LEVEL_BLURB: Record<string, string> = {
  Foundational: 'Không cần kinh nghiệm nền tảng. Điểm khởi đầu cho người mới vào AWS.',
  Associate: 'Cần khoảng một năm làm việc thực tế với AWS.',
  Professional: 'Dành cho người đã có hai năm trở lên vận hành hệ thống lớn trên AWS.',
  Specialty: 'Đi sâu vào một lĩnh vực hẹp, thường học sau khi đã có chứng chỉ Associate.',
};

function courseStats(course: Course, progress: CourseProgress) {
  const passed = course.phases.filter((p) => hasPassed(progress, p.gateQuiz?.id));
  return {
    passedPhases: passed.length,
    totalPhases: course.phases.length,
    readiness: passed.reduce((sum, p) => sum + p.weight, 0),
    started:
      passed.length > 0 ||
      progress.attempts.length > 0 ||
      Object.keys(progress.notesRead).length > 0 ||
      Object.keys(progress.practice).length > 0,
  };
}

function AvailableCard({ course, progress }: { course: Course; progress: CourseProgress }) {
  const stats = courseStats(course, progress);

  return (
    <Link
      to={courseUrl(course.id)}
      className="group block rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 transition-colors hover:border-amber-500/60 hover:bg-amber-500/10"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="amber">{course.code}</Badge>
        <Badge tone="sky">{course.level}</Badge>
        {stats.started ? (
          <Badge tone="green">Đang học</Badge>
        ) : (
          <Badge tone="slate">Sẵn sàng</Badge>
        )}
      </div>

      <h3 className="mt-3 font-semibold text-white group-hover:text-amber-200">{course.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{course.summary}</p>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            {stats.passedPhases}/{stats.totalPhases} phase đã pass
          </span>
          <span>{stats.readiness}% đề thi đã nắm</span>
        </div>
        <ProgressBar value={stats.readiness} max={100} tone="amber" />
      </div>

      <p className="mt-4 text-xs text-slate-500">
        {course.questionCount} câu hỏi · {course.mockExams.length} đề thi thử · ~
        {course.estimatedHours} giờ
      </p>
    </Link>
  );
}

function PlannedCard({ course }: { course: Course }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 opacity-70">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="slate">{course.code}</Badge>
        <Badge tone="slate">{course.level}</Badge>
        <span className="ml-auto text-slate-600" aria-label="Chưa mở">
          🔒
        </span>
      </div>

      <h3 className="mt-3 font-semibold text-slate-300">{course.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{course.summary}</p>

      <p className="mt-4 text-xs text-slate-600">
        Chưa có nội dung · {course.exam.totalQuestions} câu · {course.exam.durationMin} phút
      </p>
    </div>
  );
}

export default function CatalogPage() {
  const store = useAllProgress();

  const levels = [...new Set(courses.map((c) => c.level))].sort(
    (a, b) =>
      (courses.find((c) => c.level === a)?.levelOrder ?? 0) -
      (courses.find((c) => c.level === b)?.levelOrder ?? 0),
  );

  const available = courses.filter((c) => c.status === 'available');

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8 sm:py-14">
      <header className="mb-10">
        <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
          Lộ trình chứng chỉ AWS
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Chọn chứng chỉ để bắt đầu</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
          Mỗi chứng chỉ là một khoá học độc lập: chia phase theo đúng trọng số domain của kỳ thi, có
          notes, ngân hàng câu hỏi lấy từ đề gốc, gate quiz chặn giữa các phase và đề thi thử bấm giờ.
          Tiến độ được lưu riêng cho từng chứng chỉ.
        </p>
      </header>

      {available.length === 0 && (
        <Card className="mb-10 border-rose-500/30 bg-rose-500/5 p-5 text-sm text-slate-300">
          Chưa có khoá học nào sẵn sàng. Thêm nội dung vào <code>courses/&lt;id&gt;/</code> rồi chạy
          lại <code className="text-amber-300">npm run build</code>.
        </Card>
      )}

      <div className="space-y-10">
        {levels.map((level) => {
          const group = courses.filter((c) => c.level === level);
          return (
            <section key={level}>
              <div className="mb-4">
                <h2 className="text-lg font-bold text-white">{level}</h2>
                {LEVEL_BLURB[level] && (
                  <p className="mt-0.5 text-sm text-slate-500">{LEVEL_BLURB[level]}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {group.map((course) =>
                  course.status === 'available' ? (
                    <AvailableCard
                      key={course.id}
                      course={course}
                      progress={store.courses[course.id] ?? emptyCourseProgress}
                    />
                  ) : (
                    <PlannedCard key={course.id} course={course} />
                  ),
                )}
              </div>
            </section>
          );
        })}
      </div>

      {content.warnings.length > 0 && (
        <Card className="mt-10 border-rose-500/30 bg-rose-500/5 p-5">
          <p className="text-sm font-semibold text-rose-300">
            {content.warnings.length} cảnh báo khi đọc nội dung markdown
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-400">
            {content.warnings.slice(0, 8).map((w) => (
              <li key={w}>· {w}</li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
