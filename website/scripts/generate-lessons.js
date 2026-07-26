import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');
const outputDir = path.resolve(__dirname, '../src/generated');
const outputFile = path.join(outputDir, 'lessons.json');

const SECTION_ORDER = ['01-fundamentals', '02-data-structures', '03-algorithms'];
const SECTION_LABELS = {
  '01-fundamentals': 'Fundamentals',
  '02-data-structures': 'Data Structures',
  '03-algorithms': 'Algorithms',
};

const IGNORE_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  '.docusaurus',
  '.generated',
  'website',
]);

function toTitleCase(value) {
  return value
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

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

function normalizePath(filePath) {
  return filePath.split(path.sep).join('/');
}

async function collectFiles(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  entries.sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await collectFiles(fullPath, files);
      continue;
    }

    const relative = normalizePath(path.relative(repoRoot, fullPath));

    if (relative === 'README.md') continue;

    if (
      entry.name === 'README.md' &&
      /^0[1-3]-[^/]+\/README\.md$/.test(relative)
    ) {
      files.push({ type: 'section', fullPath, relative });
      continue;
    }

    if (entry.name.endsWith('.js') && /^0[1-3]-[^/]+\//.test(relative)) {
      files.push({ type: 'lesson', fullPath, relative });
    }
  }

  return files;
}

function getSectionId(relative) {
  return relative.split('/')[0];
}

function getSectionLabel(sectionId) {
  return SECTION_LABELS[sectionId] ?? toTitleCase(sectionId);
}

function getLessonId(relative) {
  return relative.replace(/\.md$/, '').replace(/\.js$/, '');
}

function getSlug(relative) {
  return `/learn/${getLessonId(relative)}`;
}

function getSectionRoute(sectionId) {
  return `/learn/${sectionId}`;
}

async function buildMetadata() {
  const rawFiles = await collectFiles(repoRoot);
  const entries = [];

  for (const file of rawFiles) {
    const content = await readFile(file.fullPath, 'utf8');
    const sectionId = getSectionId(file.relative);
    const sectionLabel = getSectionLabel(sectionId);

    if (file.type === 'section') {
      const id = getLessonId(file.relative);
      entries.push({
        id,
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
    const description = extractDescription(content);
    const title = toTitleCase(baseName);
    entries.push({
      id: getLessonId(file.relative),
      route: getSlug(file.relative),
      title,
      kind: 'lesson',
      sectionId,
      sectionLabel,
      sourcePath: file.relative,
      description,
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

  const orderedLessons = entries.filter((entry) => entry.kind === 'section' || entry.kind === 'lesson');

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

async function main() {
  const metadata = await buildMetadata();
  await mkdir(outputDir, { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(metadata, null, 2)}\n`);
  console.log(`Generated ${metadata.total} lesson records at ${path.relative(repoRoot, outputFile)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
