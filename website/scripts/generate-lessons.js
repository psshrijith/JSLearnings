import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectLessonFiles } from './utils/scan-lessons.js';
import { buildLessonMetadata } from './utils/build-lessons.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');
const outputDir = path.resolve(__dirname, '../src/generated');
const outputFile = path.join(outputDir, 'lessons.json');

async function main() {
  const rawFiles = await collectLessonFiles(repoRoot);
  const metadata = await buildLessonMetadata(rawFiles, readFile);
  await mkdir(outputDir, { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(metadata, null, 2)}\n`);
  console.log(`Generated ${metadata.total} lesson records at ${path.relative(repoRoot, outputFile)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
