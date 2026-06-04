import * as React from 'react';

/**
 * Button — React build.
 *
 * Mirrors the API and markup of Button.svelte and shares styles via
 * src/lib/Button.css (imported globally by src/app.css). Any visual change
 * should happen in Button.css so both framework builds stay in sync.
 */

export type ButtonAppearance = 'brand' | 'registration';
export type ButtonHierarchy = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'sm';
/**
 * Visual state. No `focus` — focus styling is layered in by the consumer
 * (browser default outline or a custom focus ring at the app shell level).
 */
export type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  appearance?: ButtonAppearance;
  hierarchy?: ButtonHierarchy;
  size?: ButtonSize;
  /** Forces a visual state (useful for snapshots / Storybook). */
  state?: ButtonState;
  label?: string;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const defaultIcon = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm-6.011 9.751L12 18l6.011-6.001L12 6 5.989 12Z"
      fill="currentColor"
    />
  </svg>
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    appearance = 'brand',
    hierarchy = 'primary',
    size = 'md',
    state = 'default',
    label = 'Button',
    showLeftIcon = false,
    showRightIcon = false,
    leftIcon,
    rightIcon,
    disabled = false,
    children,
    type = 'button',
    ...rest
  },
  ref
) {
  const isDisabled = disabled || state === 'disabled';

  return (
    <button
      ref={ref}
      type={type}
      className="db-btn"
      data-appearance={appearance}
      data-hierarchy={hierarchy}
      data-size={size}
      data-force-state={state !== 'default' ? state : undefined}
      disabled={isDisabled}
      {...rest}
    >
      {showLeftIcon && (
        <span className="db-btn__icon db-btn__icon--left">
          {leftIcon ?? defaultIcon}
        </span>
      )}
      <span className="db-btn__label">{children ?? label}</span>
      {showRightIcon && (
        <span className="db-btn__icon db-btn__icon--right">
          {rightIcon ?? defaultIcon}
        </span>
      )}
    </button>
  );
});

export default Button;
