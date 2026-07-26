import { readdir } from 'node:fs/promises';
import path from 'node:path';

const IGNORE_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  '.docusaurus',
  '.generated',
  'website',
]);

function normalizePath(filePath) {
  return filePath.split(path.sep).join('/');
}

async function collectLessonFiles(repoRoot, dir = repoRoot, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  entries.sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await collectLessonFiles(repoRoot, fullPath, files);
      continue;
    }

    const relative = normalizePath(path.relative(repoRoot, fullPath));

    if (relative === 'README.md') continue;

    if (entry.name === 'README.md' && /^0[1-3]-[^/]+\/README\.md$/.test(relative)) {
      files.push({ type: 'section', fullPath, relative });
      continue;
    }

    if (entry.name.endsWith('.js') && /^0[1-3]-[^/]+\//.test(relative)) {
      files.push({ type: 'lesson', fullPath, relative });
    }
  }

  return files;
}

export { collectLessonFiles };
