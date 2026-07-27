import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ProgressRing } from './ProgressRing';

function percent(doneCount, totalCount) {
  if (totalCount === 0) return 0;
  return Math.round((doneCount / totalCount) * 100);
}

function labelize(value) {
  const known = {
    linkedlist: 'Linked List',
    binarySearchTree: 'Binary Search Tree',
    twoPointers: 'Two Pointers',
    slidingWindow: 'Sliding Window',
    divideAndConquer: 'Divide and Conquer',
    frequencyCounter: 'Frequency Counter',
  };

  if (known[value]) return known[value];

  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

function buildLessonTree(lessons) {
  const root = [];

  for (const lesson of lessons) {
    const parts = lesson.sourcePath.split('/').slice(1, -1);

    if (lesson.kind === 'section') {
      root.unshift({
        type: 'overview',
        lesson,
      });
      continue;
    }

    let currentLevel = root;

    parts.forEach((part, index) => {
      const isLeaf = index === parts.length - 1;
      let node = currentLevel.find(
        (entry) => entry.type === 'folder' && entry.label === labelize(part),
      );

      if (!node) {
        node = {
          type: 'folder',
          label: labelize(part),
          children: [],
        };
        currentLevel.push(node);
      }

      if (isLeaf) {
        node.children.push({
          type: 'lesson',
          lesson,
        });
      } else {
        currentLevel = node.children;
      }
    });

    if (parts.length === 0) {
      currentLevel.push({
        type: 'lesson',
        lesson,
      });
    }
  }

  return root;
}

function LessonRow({ lesson, completed, active, onNavigate }) {
  return (
    <Link
      className={[
        'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition',
        active
          ? 'translate-x-px bg-emerald-400/10 text-slate-50'
          : 'text-slate-400 hover:translate-x-px hover:bg-emerald-400/10 hover:text-slate-50',
      ].join(' ')}
      to={lesson.route}
      onClick={onNavigate}
    >
      <span
        className={[
          'grid h-[18px] w-[18px] place-items-center rounded-full border text-[11px]',
          completed ? 'border-emerald-400/50 text-emerald-400' : 'border-white/10 text-slate-400',
        ].join(' ')}
      >
        {completed ? '✓' : '•'}
      </span>
      <span className="leading-tight">{lesson.title}</span>
    </Link>
  );
}

function FolderTree({ nodes, doneIds, currentPath, onNavigate }) {
  return (
    <div className="grid gap-2">
      {nodes.map((node) => {
        if (node.type === 'overview') {
          const completed = doneIds.includes(node.lesson.id);
          const active = currentPath === node.lesson.route;
          return (
            <LessonRow
              key={node.lesson.id}
              lesson={node.lesson}
              completed={completed}
              active={active}
              onNavigate={onNavigate}
            />
          );
        }

        if (node.type === 'lesson') {
          const completed = doneIds.includes(node.lesson.id);
          const active = currentPath === node.lesson.route;
          return (
            <LessonRow
              key={node.lesson.id}
              lesson={node.lesson}
              completed={completed}
              active={active}
              onNavigate={onNavigate}
            />
          );
        }

        return (
          <div key={node.label} className="grid gap-2 pl-1">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              {node.label}
            </div>
            <div className="grid gap-2 border-l border-white/5 pl-3">
              <FolderTree
                nodes={node.children}
                doneIds={doneIds}
                currentPath={currentPath}
                onNavigate={onNavigate}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Sidebar({
  sections,
  doneCount,
  totalCount,
  doneIds,
  currentPath,
  onNavigate,
  onClose,
}) {
  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/80 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4 rounded-[18px] border border-white/10 bg-slate-950/40 p-4">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
            Learning Path
          </p>
          <h1 className="m-0 text-[clamp(1.5rem,2vw,2.3rem)] leading-none">Build in public.</h1>
        </div>
        <div className="flex items-start gap-3">
          <ProgressRing value={percent(doneCount, totalCount)} label={`${doneCount}/${totalCount}`} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-50 transition hover:bg-white/10 xl:hidden"
            aria-label="Close contents"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
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
            <FolderTree
              nodes={buildLessonTree(section.lessons)}
              doneIds={doneIds}
              currentPath={currentPath}
              onNavigate={onNavigate}
            />
          </section>
        ))}
      </div>
    </div>
  );
}
