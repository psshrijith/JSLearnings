import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../App';
import { MarkdownRenderer } from './MarkdownRenderer';

function formatValue(value) {
  if (value instanceof Error) return value.stack || value.message;
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean' || value == null) return String(value);
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function LessonRunner({ code }) {
  const [source, setSource] = useState(code);
  const [output, setOutput] = useState([{ type: 'info', text: 'Click Run to execute the code.' }]);

  useEffect(() => {
    setSource(code);
  }, [code]);

  const run = async () => {
    const lines = [];
    const sandboxConsole = {
      log: (...args) => {
        lines.push({ type: 'log', text: args.map(formatValue).join(' ') });
      },
      info: (...args) => {
        lines.push({ type: 'info', text: args.map(formatValue).join(' ') });
      },
      warn: (...args) => {
        lines.push({ type: 'warn', text: args.map(formatValue).join(' ') });
      },
      error: (...args) => {
        lines.push({ type: 'error', text: args.map(formatValue).join(' ') });
      },
    };

    try {
      const executor = new Function(
        'console',
        `return (async () => {\n${source}\n})()`,
      );
      const result = executor(sandboxConsole);
      if (result && typeof result.then === 'function') {
        await result;
      }
      if (lines.length === 0) {
        lines.push({ type: 'info', text: 'No console output.' });
      }
    } catch (error) {
      lines.push({ type: 'error', text: formatValue(error) });
    }

    setOutput(lines);
  };

  useEffect(() => {
    void run();
  }, []);

  return (
    <div className="grid gap-4 rounded-[24px] border border-white/10 bg-slate-900/80 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 px-4 font-semibold text-slate-950 transition hover:opacity-95"
          type="button"
          onClick={() => void run()}
        >
          Run
        </button>
        <span className="text-sm text-slate-400">Browser-safe demo runner with console capture.</span>
      </div>

      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400" htmlFor="lesson-editor">
        Code editor
      </label>
      <textarea
        id="lesson-editor"
        className="min-h-[360px] w-full rounded-[18px] border border-white/10 bg-[#061018] p-4 font-mono text-sm leading-6 text-slate-100 outline-none resize-y tab-size-2"
        value={source}
        spellCheck="false"
        onChange={(event) => setSource(event.target.value)}
      />

      <div className="grid gap-2">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Output</div>
        <div className="min-h-[110px] rounded-[18px] border border-white/10 bg-slate-950/90 p-4 font-mono text-sm leading-6">
          {output.map((line, index) => (
            <div
              key={`${line.type}-${index}`}
              className={[
                'py-0.5',
                line.type === 'log'
                  ? 'text-slate-100'
                  : line.type === 'warn'
                    ? 'text-amber-300'
                    : line.type === 'error'
                      ? 'text-rose-300'
                      : 'text-cyan-300',
              ].join(' ')}
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionMarkdown({ content }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <MarkdownRenderer content={content} />
    </div>
  );
}

export function LessonPage() {
  const location = useLocation();
  const { data } = useAppContext();

  const route = location.pathname;
  const lesson = useMemo(
    () => data.lessons.find((entry) => entry.route === route),
    [data.lessons, route],
  );

  if (!lesson) {
    return (
      <div className="page">
        <div className="hero-card">
          <h1>Lesson not found</h1>
          <p>The route does not match any generated lesson.</p>
          <Link className="button button-primary" to="/">
            Go home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <section className="flex flex-col justify-between gap-4 rounded-[24px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl md:flex-row md:items-center">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
            {lesson.sectionLabel}
          </p>
          <h1 className="m-0 text-[clamp(1.7rem,3vw,2.6rem)] leading-none">{lesson.title}</h1>
          <p className="mt-3 text-sm text-slate-400">{lesson.sourcePath}</p>
        </div>
      </section>

      {lesson.kind === 'section' ? (
        <SectionMarkdown content={lesson.content} />
      ) : (
        <>
          {lesson.description ? (
            <section className="description-card">
              <p>{lesson.description}</p>
            </section>
          ) : null}
          <LessonRunner code={lesson.code} />
        </>
      )}

      <nav className="flex flex-col gap-3 md:flex-row">
        {lesson.prev ? (
          <Link
            className="flex flex-1 flex-col gap-1 rounded-[18px] border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/[0.08]"
            to={lesson.prev.route}
          >
            <span className="text-sm text-slate-400">Prev</span>
            <strong className="text-slate-100">{lesson.prev.title}</strong>
          </Link>
        ) : (
          <span className="flex flex-1 items-center rounded-[18px] border border-white/10 bg-white/5 p-4 text-slate-500">
            Start of path
          </span>
        )}
        {lesson.next ? (
          <Link
            className="flex flex-1 flex-col gap-1 rounded-[18px] border border-white/10 bg-white/5 p-4 text-right transition hover:bg-white/[0.08]"
            to={lesson.next.route}
          >
            <span className="text-sm text-slate-400">Next</span>
            <strong className="text-slate-100">{lesson.next.title}</strong>
          </Link>
        ) : (
          <span className="flex flex-1 items-center justify-end rounded-[18px] border border-white/10 bg-white/5 p-4 text-slate-500">
            End of path
          </span>
        )}
      </nav>
    </div>
  );
}
