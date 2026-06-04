/**
 * Compile DTCG tokens from -antares-foundations/ into per-brand × theme CSS.
 *
 * Source layout (W3C DTCG, exported from Tokens Studio):
 *   primitive.json         — raw values, namespaced by brand (DBOX.Stone.50, ...)
 *   brand.<brand>.json     — semantic brand tokens (neutral.50, brand.primary.50)
 *   theme.<theme>.json     — theme tokens (color.bg.action.brand.primary.default)
 *   component.json         — component tokens (button.color.brand.primary.bg.default)
 *
 * Output: src/tokens/<brand>.<theme>.css, scoped to
 *   :root[data-brand="<brand>"][data-theme="<theme>"]
 *
 * Two workarounds applied during compilation:
 *
 * 1. Mixed parents — Style Dictionary v5 cannot resolve references to
 *    children of tokens that themselves have a `$value`. The source files
 *    use this pattern (e.g. `neutral.white = {$value, alpha: {...}}`).
 *    We rewrite mixed parents into pure groups by moving the parent's
 *    `$value` to a synthetic `base` child, and rewriting all `{X.Y}`
 *    references to `{X.Y.base}` accordingly.
 *
 * 2. Known reference typo — component.json references {cornerRadius.button}
 *    but brand files define `borderRadius.button`. We rewrite on the fly.
 */
import StyleDictionary from 'style-dictionary';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const SRC = path.join(repoRoot, '-antares-foundations');
const OUT = path.join(repoRoot, 'src/tokens');
const STAGING = path.join(repoRoot, '.tokens-staging');

const BRANDS = [
  'eloterie',
  'mdjs',
  'millipiyango',
  'pokerstars',
  'sisal',
  'sisalbusiness',
  'sisalcasino',
  'snai'
];
const THEMES = ['light', 'dark'];

const SELF_KEY = 'base';
const REF_RE = /\{([^{}]+)\}/g;

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isDtcgToken = (v) => isPlainObject(v) && '$value' in v;

function collectMixedPaths(node, prefix, out) {
  if (!isPlainObject(node)) return;
  const hasValue = '$value' in node;
  const childKeys = Object.keys(node).filter((k) => !k.startsWith('$'));
  const hasChildTokens = childKeys.some((k) => isPlainObject(node[k]));
  if (hasValue && hasChildTokens) out.add(prefix.join('.'));
  for (const k of childKeys) {
    if (isPlainObject(node[k])) collectMixedPaths(node[k], [...prefix, k], out);
  }
}

function transformMixed(node) {
  if (!isPlainObject(node)) return node;
  const meta = {};
  const groups = {};
  for (const k of Object.keys(node)) {
    if (k.startsWith('$')) meta[k] = node[k];
    else groups[k] = node[k];
  }
  const hasValue = '$value' in meta;
  const childKeys = Object.keys(groups).filter((k) => isPlainObject(groups[k]));
  const isMixed = hasValue && childKeys.length > 0;

  if (isMixed) {
    const out = {};
    out[SELF_KEY] = { ...meta };
    for (const k of Object.keys(groups)) out[k] = transformMixed(groups[k]);
    return out;
  }
  // Plain leaf or pure group
  const out = { ...meta };
  for (const k of Object.keys(groups)) out[k] = transformMixed(groups[k]);
  return out;
}

// Upstream typo / missing-primitive fixes applied during pre-process.
// Keep this map ready for future hot-patches; currently the Antares
// foundation is clean and nothing needs to be rewritten.
const REF_REWRITES = {};

function rewriteRefsInValue(value, mixedPaths) {
  if (typeof value !== 'string') return value;
  return value.replace(REF_RE, (_, ref) => {
    let r = REF_REWRITES[ref] ?? ref;
    if (mixedPaths.has(r)) r = `${r}.${SELF_KEY}`;
    return `{${r}}`;
  });
}

function rewriteRefsInTree(node, mixedPaths) {
  if (!isPlainObject(node)) return node;
  const out = Array.isArray(node) ? [] : {};
  for (const k of Object.keys(node)) {
    if (k === '$value') out[k] = rewriteRefsInValue(node[k], mixedPaths);
    else if (isPlainObject(node[k])) out[k] = rewriteRefsInTree(node[k], mixedPaths);
    else out[k] = node[k];
  }
  return out;
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

async function writeJson(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}

async function stagePreprocessed() {
  await fs.rm(STAGING, { recursive: true, force: true });
  await fs.mkdir(STAGING, { recursive: true });

  const entries = (await fs.readdir(SRC)).filter((f) => f.endsWith('.json'));
  const trees = {};
  for (const f of entries) trees[f] = await readJson(path.join(SRC, f));

  // Pass 1: collect mixed-parent paths across all files
  const mixed = new Set();
  for (const t of Object.values(trees)) collectMixedPaths(t, [], mixed);

  // Pass 2: transform mixed parents + rewrite references in every file
  for (const [f, t] of Object.entries(trees)) {
    const transformed = transformMixed(t);
    const rewritten = rewriteRefsInTree(transformed, mixed);
    await writeJson(path.join(STAGING, f), rewritten);
  }
  return { mixedCount: mixed.size };
}

async function build({ brand, theme }) {
  const sd = new StyleDictionary({
    source: [
      path.join(STAGING, 'primitive.json'),
      path.join(STAGING, `brand.${brand}.json`),
      // For the Button, typography is identical between desktop & mobile;
      // we pick desktop as the canonical source. Switch to a per-breakpoint
      // build when component-level typography starts to differ.
      path.join(STAGING, 'device.desktop.json'),
      path.join(STAGING, 'typography.json'),
      path.join(STAGING, `theme.${theme}.json`),
      path.join(STAGING, 'component.json')
    ],
    log: { verbosity: 'silent', warnings: 'disabled' },
    platforms: {
      css: {
        transformGroup: 'css',
        // Add `px` to any numeric size token (height, padding, radius, gap,
        // border-width, icon size, fontSize, lineHeight). Without this
        // transform values are emitted unitless and CSS treats them as 0
        // in length contexts. fontWeight stays unitless.
        transforms: ['attribute/cti', 'name/kebab', 'size/px-unit'],
        buildPath: OUT + path.sep,
        files: [
          {
            destination: `${brand}.${theme}.css`,
            format: 'css/variables',
            filter: (token) => {
              const root = token.path[0];
              if (root === 'buttonGroup') return true;
              if (root === 'button' || root === 'link') {
                // Skip composite-typography parent tokens — they have no
                // useful CSS representation; the leaf tokens (fontSize,
                // lineHeight, fontFamily, fontWeight) cover everything.
                const last = token.path[token.path.length - 1];
                const composite = ['fontFamily', 'fontWeight', 'fontSize', 'lineHeight'];
                if (composite.includes(last)) return true;
                // For button.* (non-typography paths), let the rest through.
                return root === 'button';
              }
              return false;
            },
            options: {
              selector: `:root[data-brand="${brand}"][data-theme="${theme}"]`,
              outputReferences: false
            }
          }
        ]
      }
    }
  });
  sd.registerTransform({
    name: 'size/px-unit',
    type: 'value',
    transitive: true,
    filter: (token) => {
      const v = token.$value ?? token.value;
      const isNumeric =
        typeof v === 'number' ||
        (typeof v === 'string' && /^-?\d+(\.\d+)?$/.test(v));
      if (!isNumeric) return false;

      const last = token.path[token.path.length - 1];
      // fontWeight is unitless.
      if (last === 'fontWeight') return false;
      // Typography metrics: fontSize, lineHeight.
      if (last === 'fontSize' || last === 'lineHeight') return true;
      // Component-size tokens (button.size.*).
      return token.path[0] === 'button' && token.path[1] === 'size';
    },
    transform: (token) => `${token.$value ?? token.value}px`
  });
  await sd.buildAllPlatforms();
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const { mixedCount } = await stagePreprocessed();
  console.log(`Pre-processed ${mixedCount} mixed-parent tokens.\n`);

  let n = 0;
  for (const brand of BRANDS) {
    for (const theme of THEMES) {
      await build({ brand, theme });
      n++;
      console.log(`  ✓ src/tokens/${brand}.${theme}.css`);
    }
  }
  console.log(`\nGenerated ${n} CSS files.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
