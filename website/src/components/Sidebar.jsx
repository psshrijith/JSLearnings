import { Link } from 'react-router-dom';
import { ProgressRing } from './ProgressRing';

function percent(doneCount, totalCount) {
  if (totalCount === 0) return 0;
  return Math.round((doneCount / totalCount) * 100);
}

export function Sidebar({ sections, doneCount, totalCount, doneIds, currentPath }) {
  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/80 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 rounded-[18px] border border-white/10 bg-slate-950/40 p-4">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
            Learning Path
          </p>
          <h1 className="m-0 text-[clamp(1.5rem,2vw,2.3rem)] leading-none">Build in public.</h1>
        </div>
        <ProgressRing value={percent(doneCount, totalCount)} label={`${doneCount}/${totalCount}`} />
      </div>

      <div className="grid gap-4 overflow-y-auto pr-1">
        {sections.map((section) => (
          <section
            key={section.id}
            className="rounded-[18px] border border-white/5 bg-slate-950/40 p-4"
          >
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="m-0 text-sm font-semibold tracking-wide text-slate-100">
                {section.title}
              </h2>
              <span className="text-xs text-slate-400">
                {section.doneCount}/{section.count}
              </span>
            </div>
            <div className="grid gap-1.5">
              {section.lessons.map((lesson) => {
                const completed = doneIds.includes(lesson.id);
                const active = currentPath === lesson.route;
                return (
                  <Link
                    className={[
                      'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition',
                      active
                        ? 'translate-x-px bg-emerald-400/10 text-slate-50'
                        : 'text-slate-400 hover:translate-x-px hover:bg-emerald-400/10 hover:text-slate-50',
                    ].join(' ')}
                    to={lesson.route}
                    key={lesson.id}
                  >
                    <span
                      className={[
                        'grid h-[18px] w-[18px] place-items-center rounded-full border text-[11px]',
                        completed
                          ? 'border-emerald-400/50 text-emerald-400'
                          : 'border-white/10 text-slate-400',
                      ].join(' ')}
                    >
                      {completed ? '✓' : '•'}
                    </span>
                    <span className="leading-tight">{lesson.title}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
