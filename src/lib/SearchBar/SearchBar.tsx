import * as React from 'react';

/**
 * SearchBar — React build.
 *
 * Pill-shaped text input with a leading magnifying-glass icon and a trailing
 * clear button that appears when there is text to clear. Mirrors the API and
 * markup of SearchBar.svelte; shares styles via
 * src/lib/SearchBar/SearchBar.css (imported globally by src/app.css).
 *
 * The active border is driven by `:focus-within`, so callers just pass
 * `value` + `onChange`. `state="active"` is an explicit override for
 * snapshots / Storybook.
 */

export type SearchBarState = 'default' | 'active';

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value: string;
  onChange: (value: string) => void;
  /** Forces a visual state (useful for snapshots / Storybook). */
  state?: SearchBarState;
  /** Called when the trailing clear button is pressed. Defaults to onChange(''). */
  onClear?: () => void;
}

const searchIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g transform="translate(1.858 1.858)">
      <path
        d="M16.0845 15.2001L12.1727 11.2891C13.3065 9.92798 13.8719 8.18211 13.7512 6.41472C13.6305 4.64733 12.8331 2.9945 11.5249 1.80006C10.2166 0.605618 8.49824 -0.038471 6.7272 0.00177892C4.95615 0.0420288 3.2688 0.763519 2.01616 2.01616C0.763519 3.2688 0.0420288 4.95615 0.00177892 6.7272C-0.038471 8.49824 0.605618 10.2166 1.80006 11.5249C2.9945 12.8331 4.64733 13.6305 6.41472 13.7512C8.18211 13.8719 9.92798 13.3065 11.2891 12.1727L15.2001 16.0845C15.2582 16.1425 15.3271 16.1886 15.403 16.22C15.4788 16.2514 15.5601 16.2676 15.6423 16.2676C15.7244 16.2676 15.8057 16.2514 15.8816 16.22C15.9575 16.1886 16.0264 16.1425 16.0845 16.0845C16.1425 16.0264 16.1886 15.9575 16.22 15.8816C16.2514 15.8057 16.2676 15.7244 16.2676 15.6423C16.2676 15.5601 16.2514 15.4788 16.22 15.403C16.1886 15.3271 16.1425 15.2582 16.0845 15.2001ZM1.26727 6.89227C1.26727 5.77975 1.59717 4.69221 2.21525 3.76719C2.83333 2.84216 3.71184 2.12119 4.73967 1.69545C5.76751 1.2697 6.89851 1.15831 7.98965 1.37535C9.08079 1.59239 10.0831 2.12812 10.8697 2.91479C11.6564 3.70146 12.1921 4.70374 12.4092 5.79489C12.6262 6.88603 12.5148 8.01703 12.0891 9.04486C11.6633 10.0727 10.9424 10.9512 10.0174 11.5693C9.09233 12.1874 8.00479 12.5173 6.89227 12.5173C5.40093 12.5156 3.97115 11.9225 2.91662 10.8679C1.86209 9.81338 1.26892 8.3836 1.26727 6.89227Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

const closeIcon = (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g transform="translate(3.75 3.75)">
      <path
        d="M12.3175 11.4332C12.3756 11.4912 12.4217 11.5602 12.4531 11.636C12.4845 11.7119 12.5007 11.7932 12.5007 11.8753C12.5007 11.9575 12.4845 12.0388 12.4531 12.1147C12.4217 12.1905 12.3756 12.2595 12.3175 12.3175C12.2595 12.3756 12.1905 12.4217 12.1147 12.4531C12.0388 12.4845 11.9575 12.5007 11.8753 12.5007C11.7932 12.5007 11.7119 12.4845 11.636 12.4531C11.5602 12.4217 11.4912 12.3756 11.4332 12.3175L6.25035 7.13394L1.06753 12.3175C0.95026 12.4348 0.7912 12.5007 0.625347 12.5007C0.459495 12.5007 0.300435 12.4348 0.18316 12.3175C0.0658846 12.2003 3.26935e-09 12.0412 0 11.8753C-3.26935e-09 11.7095 0.0658846 11.5504 0.18316 11.4332L5.36675 6.25035L0.18316 1.06753C0.0658846 0.95026 0 0.7912 0 0.625347C0 0.459495 0.0658846 0.300435 0.18316 0.18316C0.300435 0.0658846 0.459495 0 0.625347 0C0.7912 0 0.95026 0.0658846 1.06753 0.18316L6.25035 5.36675L11.4332 0.18316C11.5504 0.0658846 11.7095 -3.26935e-09 11.8753 0C12.0412 3.26935e-09 12.2003 0.0658846 12.3175 0.18316C12.4348 0.300435 12.5007 0.459495 12.5007 0.625347C12.5007 0.7912 12.4348 0.95026 12.3175 1.06753L7.13394 6.25035L12.3175 11.4332Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar(
    {
      value,
      onChange,
      onClear,
      placeholder = 'Search...',
      state = 'default',
      disabled = false,
      ...rest
    },
    ref
  ) {
    const handleClear = () => {
      if (onClear) onClear();
      else onChange('');
    };

    return (
      <div
        className="db-searchbar"
        data-force-state={state !== 'default' ? state : undefined}
      >
        <span className="db-searchbar__icon" aria-hidden="true">
          {searchIcon}
        </span>
        <input
          ref={ref}
          type="search"
          className="db-searchbar__input"
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...rest}
        />
        {value && (
          <button
            type="button"
            className="db-searchbar__clear"
            aria-label="Clear search"
            onClick={handleClear}
          >
            {closeIcon}
          </button>
        )}
      </div>
    );
  }
);

export default SearchBar;
