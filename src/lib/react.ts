/**
 * React entry — public API surface for the React build of the library.
 * Consumed at runtime as `@gabrielelr/ds-web-global` (see exports in package.json).
 *
 * The package ships pre-compiled JS + .d.ts; CSS is shipped separately
 * (subpath `@gabrielelr/ds-web-global/css`).
 */
export {
  Button,
  default as ButtonDefault,
  type ButtonAppearance,
  type ButtonHierarchy,
  type ButtonProps,
  type ButtonSize,
  type ButtonState
} from './Button';
