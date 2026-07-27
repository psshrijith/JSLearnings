import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 md:px-8 md:py-10">
      <div className="absolute left-[-10%] top-[-8%] h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute right-[-8%] top-[12%] h-80 w-80 rounded-full bg-sky-400/20 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-12%] left-[20%] h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl items-center justify-center">
        <div className="grid w-full gap-8 rounded-[32px] border border-white/10 bg-slate-950/60 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-emerald-400">
              JS Learnings
            </p>
            <h1 className="m-0 text-[clamp(2.6rem,8vw,6rem)] font-black leading-[0.9] text-slate-50">
              Learn.
              <span className="block text-transparent bg-gradient-to-r from-emerald-300 via-sky-300 to-cyan-200 bg-clip-text">
                Build.
              </span>
              Repeat.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
              A focused space to learn JavaScript through guided lessons and hands-on practice.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 px-5 font-semibold text-slate-950 transition hover:opacity-95"
                to="/home"
              >
                Enter the app
              </Link>
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 font-semibold text-slate-100 transition hover:bg-white/10"
                to="/home"
              >
                Go to dashboard
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-emerald-400/20 via-transparent to-sky-400/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  Lesson preview
                </span>
                <span className="text-xs text-slate-500">Ready now</span>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-2/3 rounded-full bg-white/10 animate-[pulse_1.8s_ease-in-out_infinite]" />
                <div className="h-3 w-5/6 rounded-full bg-white/10 animate-[pulse_2.1s_ease-in-out_infinite]" />
                <div className="h-3 w-1/2 rounded-full bg-white/10 animate-[pulse_2.4s_ease-in-out_infinite]" />
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Topics</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-50">114</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Layout</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-50">Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
