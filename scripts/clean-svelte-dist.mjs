/**
 * Strip dev-only files from dist/svelte/ after svelte-package runs.
 * svelte-package doesn't expose a file-include filter, so we copy the
 * whole src/lib then prune what shouldn't ship: Storybook stories and
 * the React entry (Button.tsx + react.ts).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist', 'svelte');

const PRUNE_PATTERNS = [
  /^Button\.stories\.svelte(?:\.d\.ts(?:\.map)?)?$/,
  /^Button\.tsx$/,
  /^react\.d\.ts(?:\.map)?$/,
  /^react\.js$/,
  /^react\.js\.map$/
];

const files = await fs.readdir(DIST);
let pruned = 0;
for (const f of files) {
  if (PRUNE_PATTERNS.some((re) => re.test(f))) {
    await fs.rm(path.join(DIST, f));
    pruned++;
  }
}
console.log(`Pruned ${pruned} dev-only files from dist/svelte/`);
