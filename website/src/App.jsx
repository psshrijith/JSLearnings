import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import data from './generated/lessons.json';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { LessonPage } from './components/LessonPage';

const STORAGE_DONE_KEY = 'jslearnings:done-ids';
const STORAGE_LAST_KEY = 'jslearnings:last-visited';

const AppContext = createContext(null);

function readArray(key) {
  if (typeof window === 'undefined') return [];
  try {
    const value = window.localStorage.getItem(key);
    if (!value) return [];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeArray(key, values) {
  try {
    window.localStorage.setItem(key, JSON.stringify(values));
  } catch {
    // Ignore storage failures in private mode or restricted browsers.
  }
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside AppContext');
  }
  return context;
}

function AppShell() {
  const location = useLocation();
  const [doneIds, setDoneIds] = useState(() => readArray(STORAGE_DONE_KEY));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lastVisited, setLastVisited] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem(STORAGE_LAST_KEY) || '';
  });

  useEffect(() => {
    writeArray(STORAGE_DONE_KEY, doneIds);
  }, [doneIds]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (location.pathname !== '/') {
      window.localStorage.setItem(STORAGE_LAST_KEY, location.pathname);
      setLastVisited(location.pathname);
    }
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const lessonsByRoute = useMemo(
    () => new Map(data.lessons.map((lesson) => [lesson.route, lesson])),
    [],
  );

  const lessonsById = useMemo(
    () => new Map(data.lessons.map((lesson) => [lesson.id, lesson])),
    [],
  );

  const sections = useMemo(
    () =>
      data.sections.map((section) => ({
        ...section,
        doneCount: section.lessons.filter((lesson) => doneIds.includes(lesson.id)).length,
      })),
    [doneIds],
  );

  const totalCount = data.lessons.length;
  const doneCount = doneIds.length;

  const value = {
    data,
    doneIds,
    setDoneIds,
    lastVisited,
    lessonsByRoute,
    lessonsById,
  };

  const markDone = (id) => {
    setDoneIds((current) => (current.includes(id) ? current : [...current, id]));
  };

  const markUndone = (id) => {
    setDoneIds((current) => current.filter((entry) => entry !== id));
  };

  return (
    <AppContext.Provider value={{ ...value, markDone, markUndone }}>
      <div className="min-h-screen xl:grid xl:grid-cols-[340px_minmax(0,1fr)]">
        {isSidebarOpen ? (
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] xl:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        ) : null}

        <aside
          className={[
            'fixed inset-y-0 left-0 z-50 w-[86vw] max-w-sm p-4 transition-transform duration-200 ease-out xl:sticky xl:top-0 xl:z-auto xl:h-screen xl:w-auto xl:max-w-none xl:translate-x-0 xl:pr-0 xl:pl-5 xl:py-5',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0',
          ].join(' ')}
        >
          <Sidebar
            sections={sections}
            doneCount={doneCount}
            totalCount={totalCount}
            doneIds={doneIds}
            currentPath={location.pathname}
            onNavigate={() => setIsSidebarOpen(false)}
            onClose={() => setIsSidebarOpen(false)}
          />
        </aside>
        <main className="order-1 min-w-0 px-4 pb-4 pt-0 xl:order-2 xl:px-5 xl:py-5 xl:pl-4">
          <header className="mb-4 flex min-h-[78px] items-center justify-between gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-50 transition hover:bg-white/10 xl:hidden"
                aria-label={isSidebarOpen ? 'Hide contents' : 'Show contents'}
                onClick={() => setIsSidebarOpen((current) => !current)}
              >
                <FontAwesomeIcon icon={isSidebarOpen ? faXmark : faBars} />
              </button>
              <Link className="flex min-w-0 items-center gap-4" to="/">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-400/20 to-sky-400/20 font-bold text-slate-50">
                  JS
                </span>
                <span>
                  <strong className="block text-base font-semibold">JS Learnings</strong>
                  <small className="block text-sm text-slate-400">
                    Interactive practice from your repo
                  </small>
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span>{doneCount} done</span>
              <span>{totalCount - doneCount} left</span>
            </div>
          </header>
          <div className="min-w-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/learn/*" element={<LessonPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default function App() {
  return <AppShell />;
}
