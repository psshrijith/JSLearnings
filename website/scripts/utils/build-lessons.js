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

function extractDescription(code) {
  const lines = code.split(/\r?\n/);
  const description = [];
  let reading = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!reading && trimmed.startsWith('// DESCRIPTION:')) {
      reading = true;
      description.push(trimmed.replace('// DESCRIPTION:', '').trim());
      continue;
    }

    if (reading) {
      if (!trimmed.startsWith('//')) break;
      description.push(trimmed.replace(/^\/\/\s?/, '').trim());
      continue;
    }

    if (trimmed !== '') break;
  }

  return description.join('\n').trim();
}

async function buildLessonMetadata(rawFiles, readFile) {
  const entries = [];

  for (const file of rawFiles) {
    const content = await readFile(file.fullPath, 'utf8');
    const sectionId = getSectionId(file.relative);
    const sectionLabel = getSectionLabel(sectionId);

    if (file.type === 'section') {
      entries.push({
        id: getLessonId(file.relative),
        route: getSectionRoute(sectionId),
        title: sectionLabel,
        kind: 'section',
        sectionId,
        sectionLabel,
        sourcePath: file.relative,
        content,
        orderKey: `${SECTION_ORDER.indexOf(sectionId).toString().padStart(2, '0')}/00`,
      });
      continue;
    }

    const baseName = path.basename(file.relative, '.js');
    entries.push({
      id: getLessonId(file.relative),
      route: getLessonRoute(file.relative),
      title: toTitleCase(baseName),
      kind: 'lesson',
      sectionId,
      sectionLabel,
      sourcePath: file.relative,
      description: extractDescription(content),
      code: content,
      orderKey: `${SECTION_ORDER.indexOf(sectionId).toString().padStart(2, '0')}/10/${file.relative}`,
    });
  }

  entries.sort((a, b) => a.orderKey.localeCompare(b.orderKey));

  const bySection = SECTION_ORDER.map((sectionId) => {
    const lessons = entries.filter((entry) => entry.sectionId === sectionId);
    return {
      id: sectionId,
      title: getSectionLabel(sectionId),
      route: getSectionRoute(sectionId),
      count: lessons.length,
      lessons: lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        route: lesson.route,
        kind: lesson.kind,
        sourcePath: lesson.sourcePath,
      })),
    };
  }).filter((section) => section.count > 0);

  const orderedLessons = entries.filter(
    (entry) => entry.kind === 'section' || entry.kind === 'lesson',
  );

  for (let i = 0; i < orderedLessons.length; i++) {
    const current = orderedLessons[i];
    const prev = orderedLessons[i - 1];
    const next = orderedLessons[i + 1];

    current.prev = prev ? { id: prev.id, title: prev.title, route: prev.route } : null;
    current.next = next ? { id: next.id, title: next.title, route: next.route } : null;
  }

  const lessons = orderedLessons.map((lesson) => {
    const copied = { ...lesson };
    delete copied.orderKey;
    return copied;
  });

  return {
    generatedAt: new Date().toISOString(),
    sections: bySection,
    lessons,
    total: lessons.length,
  };
}

export { buildLessonMetadata };
