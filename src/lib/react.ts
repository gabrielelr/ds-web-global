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
} from './Button/Button';

export {
  ButtonIcon,
  type ButtonIconAppearance,
  type ButtonIconHierarchy,
  type ButtonIconProps,
  type ButtonIconSize,
  type ButtonIconState
} from './ButtonIcon/ButtonIcon';

export {
  Link,
  type LinkAppearance,
  type LinkProps,
  type LinkSize,
  type LinkState
} from './Link/Link';

export {
  PageControlItem,
  type PageControlItemProps,
  type PageControlItemType
} from './PageControlItem/PageControlItem';

export {
  PageControl,
  type PageControlProps,
  type PageControlType
} from './PageControl/PageControl';

export {
  SearchBar,
  type SearchBarProps,
  type SearchBarState
} from './SearchBar/SearchBar';

export {
  BadgeStatus,
  type BadgeStatusAppearance,
  type BadgeStatusProps,
  type BadgeStatusStatus
} from './BadgeStatus/BadgeStatus';

export {
  Heading,
  type HeadingLevel,
  type HeadingProps,
  type HeadingTag
} from './Heading/Heading';
