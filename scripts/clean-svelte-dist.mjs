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

const PRUNE_FILES = [
  'Button/Button.stories.svelte',
  'Button/Button.stories.svelte.d.ts',
  'Button/Button.stories.svelte.d.ts.map',
  'Button/Button.tsx',
  'ButtonIcon/ButtonIcon.stories.svelte',
  'ButtonIcon/ButtonIcon.stories.svelte.d.ts',
  'ButtonIcon/ButtonIcon.stories.svelte.d.ts.map',
  'ButtonIcon/ButtonIcon.tsx',
  'Link/Link.stories.svelte',
  'Link/Link.stories.svelte.d.ts',
  'Link/Link.stories.svelte.d.ts.map',
  'Link/Link.tsx',
  'PageControlItem/PageControlItem.stories.svelte',
  'PageControlItem/PageControlItem.stories.svelte.d.ts',
  'PageControlItem/PageControlItem.stories.svelte.d.ts.map',
  'PageControlItem/PageControlItem.tsx',
  'PageControl/PageControl.stories.svelte',
  'PageControl/PageControl.stories.svelte.d.ts',
  'PageControl/PageControl.stories.svelte.d.ts.map',
  'PageControl/PageControl.tsx',
  'SearchBar/SearchBar.stories.svelte',
  'SearchBar/SearchBar.stories.svelte.d.ts',
  'SearchBar/SearchBar.stories.svelte.d.ts.map',
  'SearchBar/SearchBar.tsx',
  'BadgeStatus/BadgeStatus.stories.svelte',
  'BadgeStatus/BadgeStatus.stories.svelte.d.ts',
  'BadgeStatus/BadgeStatus.stories.svelte.d.ts.map',
  'BadgeStatus/BadgeStatus.tsx',
  'Heading/Heading.stories.svelte',
  'Heading/Heading.stories.svelte.d.ts',
  'Heading/Heading.stories.svelte.d.ts.map',
  'Heading/Heading.tsx',
  'react.d.ts',
  'react.d.ts.map',
  'react.js',
  'react.js.map'
];

let pruned = 0;
for (const rel of PRUNE_FILES) {
  const abs = path.join(DIST, rel);
  try {
    await fs.rm(abs);
    pruned++;
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
}
console.log(`Pruned ${pruned} dev-only files from dist/svelte/`);
