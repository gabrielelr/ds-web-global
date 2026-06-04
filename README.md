# @gabrielelr/ds-web-global

Antares design-system components for the web — Svelte 5 + React 19 in a
single package, sharing one CSS contract and multi-brand × theme tokens.

Currently ships:

- `Button` (`appearance` × `hierarchy` × `size` × `state`)
- 8 brand × 2 theme token sheets (Sisal, Sisal Business, Sisal Casinò,
  SNAI, PokerStars, eLoterie, MDJS, Millî Piyango × light/dark)

## Install

The package is published to **GitHub Packages**. Create a personal access
token with `read:packages` (Settings → Developer settings → Personal
access tokens) and add it to your project's `.npmrc`:

```ini
# .npmrc
@gabrielelr:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Export `GITHUB_TOKEN` in your shell (or CI). Then:

```bash
npm install @gabrielelr/ds-web-global
```

Peer deps depending on your framework:

```bash
# React side
npm install react react-dom

# Svelte side
npm install svelte
```

## Setup — load tokens

Pick the brand × theme you want and import the token sheet **once** at
your app entry. The sheet scopes its CSS variables to
`:root[data-brand="…"][data-theme="…"]`, so you also need to set those
attributes on `<html>`.

```html
<!doctype html>
<html lang="en" data-brand="sisal" data-theme="light">
  …
</html>
```

```ts
// app entry
import '@gabrielelr/ds-web-global/css';
import '@gabrielelr/ds-web-global/tokens/sisal.light.css';
```

For runtime brand switching, import every brand sheet you need and flip
the attribute on `document.documentElement`.

## Usage — React

```tsx
import { Button } from '@gabrielelr/ds-web-global';

export function Cta() {
  return (
    <Button hierarchy="primary" size="md" label="Continue" onClick={…} />
  );
}
```

API: `appearance`, `hierarchy`, `size`, `state`, `label`, `showLeftIcon`,
`showRightIcon`, `leftIcon`, `rightIcon`, `disabled`, plus every native
`<button>` attribute.

## Usage — Svelte

```svelte
<script>
  import { Button } from '@gabrielelr/ds-web-global/svelte';
</script>

<Button hierarchy="primary" size="md" label="Continue" onclick={…} />
```

Same prop set as the React version. Snippet slots `leftIcon` /
`rightIcon` if you need a custom glyph.

## Available token sheets

```
@gabrielelr/ds-web-global/tokens/sisal.{light,dark}.css
@gabrielelr/ds-web-global/tokens/sisalbusiness.{light,dark}.css
@gabrielelr/ds-web-global/tokens/sisalcasino.{light,dark}.css
@gabrielelr/ds-web-global/tokens/snai.{light,dark}.css
@gabrielelr/ds-web-global/tokens/pokerstars.{light,dark}.css
@gabrielelr/ds-web-global/tokens/eloterie.{light,dark}.css
@gabrielelr/ds-web-global/tokens/mdjs.{light,dark}.css
@gabrielelr/ds-web-global/tokens/millipiyango.{light,dark}.css
```

For temporary upstream patches (e.g. PokerStars pill radius), also
import:

```ts
import '@gabrielelr/ds-web-global/tokens-overrides.css';
```

## Contributing

```bash
npm install
npm run storybook         # Svelte playground on :6006
npm run dev               # Vite — index.html + react-playground.html on :5173
npm run build:tokens      # Recompile tokens (requires -antares-foundations/)
npm run build:lib         # Produce dist/ for publishing
```

To publish a new version:

1. Bump `version` in `package.json`.
2. `npm run build:lib`
3. `npm publish` (uses `publishConfig.registry` to target GitHub Packages).
