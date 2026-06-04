import { defineConfig } from 'tsup';

/**
 * Build the React entry into dist/react/.
 *   - ESM + CJS for maximum compat
 *   - .d.ts emitted via tsc
 *   - React kept external (peer dep)
 *
 * The Svelte build is handled separately by `svelte-package`.
 */
export default defineConfig({
  entry: ['src/lib/react.ts'],
  outDir: 'dist/react',
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true
});
