import { Link } from 'react-router-dom';
import { useAppContext } from '../App';

export function HomePage() {
  const { data } = useAppContext();

  return (
    <div className="grid gap-4">
      <section className="grid items-center gap-6 rounded-[24px] border border-white/10 bg-slate-900/80 p-7 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl xl:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.8fr)]">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
            Dark theme learning dashboard
          </p>
          <h1 className="m-0 text-[clamp(2rem,4vw,3.3rem)] leading-[0.95]">
            Build your JavaScript skills through practice.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
            Explore guided lessons with editable code and a clean section sidebar.
          </p>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {data.sections.map((section) => (
          <Link
            className="grid gap-4 rounded-[24px] border border-white/10 bg-slate-900/80 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:border-sky-400/25"
            key={section.id}
            to={section.route}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="m-0 text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
                {section.title}
              </p>
              <span className="text-xs text-slate-400">{section.count} pages</span>
            </div>
            <h3 className="m-0 text-xl font-semibold text-slate-50">{section.title}</h3>
            <p className="m-0 text-sm leading-6 text-slate-400">
              {section.lessons.length} topics, with a section landing page and live code
              pages underneath.
            </p>
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm text-slate-100">{section.route.replace('/learn/', '')}</strong>
              <span className="text-sm text-slate-400">Open section</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
