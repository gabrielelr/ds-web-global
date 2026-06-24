/**
 * Svelte entry — public API surface for the Svelte build of the library.
 * Consumed at runtime as `@gabrielelr/ds-web-global/svelte`
 * (see exports in package.json).
 *
 * The consumer must have a Svelte 5 build pipeline (vite-plugin-svelte).
 */
export { default as Button } from './Button/Button.svelte';
export { default as ButtonIcon } from './ButtonIcon/ButtonIcon.svelte';
export { default as Link } from './Link/Link.svelte';
export { default as PageControlItem } from './PageControlItem/PageControlItem.svelte';
export { default as PageControl } from './PageControl/PageControl.svelte';
export { default as SearchBar } from './SearchBar/SearchBar.svelte';
export { default as BadgeStatus } from './BadgeStatus/BadgeStatus.svelte';
export { default as Heading } from './Heading/Heading.svelte';
