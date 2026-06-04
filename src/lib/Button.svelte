<script>
  /**
   * Button — Svelte 5 markup.
   *
   * Visual styles live in ./Button.css (imported globally via src/app.css).
   * The component pipes its props through to `<button class="db-btn">` data
   * attributes; the CSS does the rest. Same contract as Button.tsx.
   *
   * @typedef {'brand' | 'registration'} Appearance
   * @typedef {'primary' | 'secondary' | 'ghost'} Hierarchy
   * @typedef {'md' | 'sm'} Size
   * @typedef {'default' | 'hover' | 'pressed' | 'disabled'} State
   *
   * Note: there is no `focus` state at the component level — focus styling
   * is layered in by the consumer (browser default outline or a custom focus
   * ring at the app shell level).
   */

  let {
    appearance = 'brand',
    hierarchy = 'primary',
    size = 'md',
    /** Forces a visual state — useful for snapshots / Storybook. */
    state = 'default',
    label = 'Button',
    showLeftIcon = false,
    showRightIcon = false,
    leftIcon,
    rightIcon,
    disabled = false,
    children,
    ...rest
  } = $props();

  let isDisabled = $derived(disabled || state === 'disabled');
</script>

{#snippet defaultIcon()}
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm-6.011 9.751L12 18l6.011-6.001L12 6 5.989 12Z"
      fill="currentColor"
    />
  </svg>
{/snippet}

<button
  type="button"
  class="db-btn"
  data-appearance={appearance}
  data-hierarchy={hierarchy}
  data-size={size}
  data-force-state={state !== 'default' ? state : null}
  disabled={isDisabled}
  {...rest}
>
  {#if showLeftIcon}
    <span class="db-btn__icon db-btn__icon--left">
      {#if leftIcon}{@render leftIcon()}{:else}{@render defaultIcon()}{/if}
    </span>
  {/if}

  <span class="db-btn__label">
    {#if children}{@render children()}{:else}{label}{/if}
  </span>

  {#if showRightIcon}
    <span class="db-btn__icon db-btn__icon--right">
      {#if rightIcon}{@render rightIcon()}{:else}{@render defaultIcon()}{/if}
    </span>
  {/if}
</button>
