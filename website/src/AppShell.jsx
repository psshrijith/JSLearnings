import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import data from './generated/lessons.json';
import { AppContext } from './appContext';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { LessonPage } from './components/LessonPage';

function SidebarOverlay({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <button
      type="button"
      aria-label="Close sidebar"
      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] xl:hidden"
      onClick={onClose}
    />
  );
}

function ShellSidebar({ currentPath, onClose, isSidebarOpen }) {
  return (
    <aside
      className={[
        'fixed inset-y-0 left-0 z-50 w-[80vw] max-w-sm p-4 transition-transform duration-200 ease-out xl:sticky xl:top-0 xl:z-auto xl:h-screen xl:w-auto xl:max-w-none xl:translate-x-0 xl:pr-0 xl:pl-5 xl:py-5',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0',
      ].join(' ')}
    >
      <Sidebar
        sections={data.sections}
        currentPath={currentPath}
        onNavigate={onClose}
        onClose={onClose}
      />
    </aside>
  );
}

function ShellHeader({ isSidebarOpen, onToggleSidebar }) {
  return (
    <header className="mb-4 flex min-h-[78px] items-center justify-between gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-50 transition hover:bg-white/10 xl:hidden"
          aria-label={isSidebarOpen ? 'Hide contents' : 'Show contents'}
          onClick={onToggleSidebar}
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faXmark : faBars} />
        </button>
        <Link className="flex min-w-0 items-center gap-4" to="/home">
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-400/20 to-sky-400/20 font-bold text-slate-50">
            JS
          </span>
          <span>
            <strong className="block text-base font-semibold">JS Learnings</strong>
            <small className="block text-sm text-slate-400">Guided JavaScript practice</small>
          </span>
        </Link>
      </div>
    </header>
  );
}

function ShellRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/learn/*" element={<LessonPage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

function AppLayout({ currentPath, isSidebarOpen, onToggleSidebar, onCloseSidebar }) {
  return (
    <div className="min-h-screen xl:grid xl:grid-cols-[340px_minmax(0,1fr)]">
      <SidebarOverlay isOpen={isSidebarOpen} onClose={onCloseSidebar} />
      <ShellSidebar
        currentPath={currentPath}
        isSidebarOpen={isSidebarOpen}
        onClose={onCloseSidebar}
      />
      <main className="order-1 min-w-0 px-4 pb-4 pt-0 xl:order-2 xl:px-5 xl:py-5 xl:pl-4">
        <ShellHeader isSidebarOpen={isSidebarOpen} onToggleSidebar={onToggleSidebar} />
        <div className="min-w-0">
          <ShellRoutes />
        </div>
      </main>
    </div>
  );
}

export function AppShell() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
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

  const value = {
    data,
    lessonsByRoute,
    lessonsById,
  };

  return (
    <AppContext.Provider value={value}>
      <AppLayout
        currentPath={location.pathname}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((current) => !current)}
        onCloseSidebar={() => setIsSidebarOpen(false)}
      />
    </AppContext.Provider>
  );
}
