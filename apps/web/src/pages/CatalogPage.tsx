import {
  Badge,
  Card,
  ChevronRightIcon,
  ClockIcon,
  LevelGlyph,
  LockIcon,
  Progress,
  ProgressRing,
  RoadmapArt,
  fadeUp,
  m,
  stagger,
  type CourseLevel,
} from '@study/ui';
import { Link } from 'react-router-dom';
import { content, courses } from '../lib/content';
import { courseUrl } from '../lib/course';
import { emptyCourseProgress, hasPassed, useAllProgress } from '../lib/progress';
import type { Course, CourseProgress } from '../types';

const LEVEL_BLURB: Record<string, string> = {
  Foundational: 'Không cần kinh nghiệm nền tảng. Điểm khởi đầu cho người mới vào AWS.',
  Associate: 'Cần khoảng một năm làm việc thực tế với AWS.',
  Professional: 'Dành cho người đã có hai năm trở lên vận hành hệ thống lớn trên AWS.',
  Specialty: 'Đi sâu vào một lĩnh vực hẹp, thường học sau khi đã có chứng chỉ Associate.',
};

function levelKey(level: string): CourseLevel {
  const key = level.toLowerCase();
  return (['foundational', 'associate', 'professional', 'specialty'].includes(key)
    ? key
    : 'foundational') as CourseLevel;
}

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
    <m.li variants={fadeUp} whileHover={{ y: -4 }} whileTap={{ scale: 0.99 }} className="list-none">
      <Link
        to={courseUrl(course.id)}
        className={[
          'group focus-ring relative block h-full overflow-hidden rounded-2xl border border-brand-500/30 p-5',
          'bg-gradient-to-br from-brand-500/10 via-surface/40 to-surface/40',
          'transition-colors duration-200 hover:border-brand-500/60',
        ].join(' ')}
      >
        {/* Sheen that sweeps across on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 ease-out-expo group-hover:translate-x-full"
        />

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="amber">{course.code}</Badge>
            <Badge tone="sky" className="gap-1.5">
              <LevelGlyph level={levelKey(course.level)} />
              {course.level}
            </Badge>
            {stats.started ? (
              <Badge tone="green" dot>
                Đang học
              </Badge>
            ) : (
              <Badge tone="slate">Sẵn sàng</Badge>
            )}
          </div>
          {stats.readiness > 0 && (
            <ProgressRing
              value={stats.readiness}
              max={100}
              size={52}
              label={`Mức sẵn sàng ${course.code}`}
            />
          )}
        </div>

        <h3 className="mt-3 font-semibold text-white transition-colors group-hover:text-brand-200">
          {course.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{course.summary}</p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              {stats.passedPhases}/{stats.totalPhases} phase đã pass
            </span>
            <span>{stats.readiness}% đề thi đã nắm</span>
          </div>
          <Progress
            value={stats.readiness}
            max={100}
            tone="amber"
            label={`Mức sẵn sàng cho ${course.title}`}
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon width={14} height={14} />
            {course.questionCount} câu · {course.mockExams.length} đề thử · ~{course.estimatedHours} giờ
          </span>
          <ChevronRightIcon
            width={16}
            height={16}
            className="text-slate-600 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-400"
          />
        </div>
      </Link>
    </m.li>
  );
}

function PlannedCard({ course }: { course: Course }) {
  return (
    <m.li variants={fadeUp} className="list-none">
      <Card variant="muted" inset="md" className="h-full">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="slate">{course.code}</Badge>
          <Badge tone="slate" className="gap-1.5">
            <LevelGlyph level={levelKey(course.level)} />
            {course.level}
          </Badge>
          <span className="ml-auto text-slate-600">
            <LockIcon width={16} height={16} />
            <span className="sr-only">Chưa mở</span>
          </span>
        </div>

        <h3 className="mt-3 font-semibold text-slate-300">{course.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{course.summary}</p>

        <p className="mt-4 text-xs text-slate-600">
          Chưa mở vì nội dung đang được soạn · {course.exam.totalQuestions} câu ·{' '}
          {course.exam.durationMin} phút
        </p>
      </Card>
    </m.li>
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
      <m.header
        className="mb-12 grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]"
        variants={stagger(0.08)}
        initial="hidden"
        animate="visible"
      >
        <div>
          <m.p
            variants={fadeUp}
            className="text-xs font-semibold tracking-widest text-brand-500 uppercase"
          >
            Lộ trình chứng chỉ AWS
          </m.p>
          <m.h1 variants={fadeUp} className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Chọn chứng chỉ để bắt đầu
          </m.h1>
          <m.p variants={fadeUp} className="mt-3 text-sm leading-relaxed text-slate-400">
            Mỗi chứng chỉ là một khoá học độc lập: chia phase theo đúng trọng số domain của kỳ thi, có
            notes, ngân hàng câu hỏi lấy từ đề gốc, gate quiz chặn giữa các phase và đề thi thử bấm giờ.
            Tiến độ được lưu riêng cho từng chứng chỉ.
          </m.p>
        </div>
        <m.div variants={fadeUp} className="hidden md:block">
          <RoadmapArt />
        </m.div>
      </m.header>

      {available.length === 0 && (
        <Card inset="md" className="mb-10 border-rose-500/30 bg-rose-500/5 text-sm text-slate-300">
          Chưa có khoá học nào sẵn sàng. Thêm nội dung vào <code>courses/&lt;id&gt;/</code> rồi chạy lại{' '}
          <code className="text-brand-300">npm run build</code>.
        </Card>
      )}

      <div className="space-y-10">
        {levels.map((level) => {
          const group = courses.filter((c) => c.level === level);
          return (
            <section key={level} aria-labelledby={`level-${level}`}>
              <div className="mb-4">
                <h2 id={`level-${level}`} className="flex items-center gap-2 text-lg font-bold text-white">
                  <LevelGlyph level={levelKey(level)} />
                  {level}
                </h2>
                {LEVEL_BLURB[level] && (
                  <p className="mt-0.5 text-sm text-slate-500">{LEVEL_BLURB[level]}</p>
                )}
              </div>

              <m.ul
                className="grid gap-4 sm:grid-cols-2"
                variants={stagger(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
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
              </m.ul>
            </section>
          );
        })}
      </div>

      {content.warnings.length > 0 && (
        <Card inset="md" className="mt-10 border-rose-500/30 bg-rose-500/5">
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
