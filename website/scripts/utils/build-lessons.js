import path from 'node:path';
import {
  SECTION_ORDER,
  getLessonId,
  getLessonRoute,
  getSectionId,
  getSectionLabel,
  getSectionRoute,
  toTitleCase,
} from './lesson-paths.js';

/**
 * 
 * @param {*} code 
 * @returns the description from the code input
 * 
 * const code = `
  // DESCRIPTION: Adds two numbers
  // Returns the sum
  // Used in calculator

  function add(a, b) {
    return a + b;
  }
`;
 */
function extractDescription(code) {
  const match = code.match(
    /\/\/ DESCRIPTION:\s*(.*(?:\r?\n\/\/.*)*)/
  );

  if (!match) return "";

  return match[1]
    .replace(/^\/\/\s?/gm, "")
    .trim();
}

async function buildLessonMetadata(rawFiles, readFile) {
  const items = [];

  for (const file of rawFiles) {
    const content = await readFile(file.fullPath, 'utf8');
    const sectionId = getSectionId(file.relative);
    const sectionLabel = getSectionLabel(sectionId);
    const baseEntry = {
      id: getLessonId(file.relative),
      sectionId,
      sectionLabel,
      sourcePath: file.relative,
    };

    if (file.type === 'section') {
      items.push({
        ...baseEntry,
        kind: 'section',
        title: sectionLabel,
        route: getSectionRoute(sectionId),
        content,
      });
      continue;
    }

    items.push({
      ...baseEntry,
      kind: 'lesson',
      title: toTitleCase(path.basename(file.relative, '.js')),
      route: getLessonRoute(file.relative),
      description: extractDescription(content),
      code: content,
    });
  }

  items.sort((a, b) => {
    const sectionDiff = SECTION_ORDER.indexOf(a.sectionId) - SECTION_ORDER.indexOf(b.sectionId);
    if (sectionDiff !== 0) return sectionDiff;
    if (a.kind !== b.kind) return a.kind === 'section' ? -1 : 1;
    return a.sourcePath.localeCompare(b.sourcePath);
  });

  const lessons = items.map((item, index) => {
    const prev = items[index - 1];
    const next = items[index + 1];

    return {
      ...item,
      prev: prev ? { id: prev.id, title: prev.title, route: prev.route } : null,
      next: next ? { id: next.id, title: next.title, route: next.route } : null,
    };
  });

  const bySection = SECTION_ORDER.map((sectionId) => {
    const sectionLessons = lessons.filter((item) => item.sectionId === sectionId);

    if (sectionLessons.length === 0) {
      return null;
    }

    return {
      id: sectionId,
      title: getSectionLabel(sectionId),
      route: getSectionRoute(sectionId),
      count: sectionLessons.length,
      lessons: sectionLessons.map(({ id, title, route, kind, sourcePath }) => ({
        id,
        title,
        route,
        kind,
        sourcePath,
      })),
    };
  }).filter(Boolean);

  return {
    generatedAt: new Date().toISOString(),
    sections: bySection,
    lessons,
    total: lessons.length,
  };
}

export { buildLessonMetadata };
