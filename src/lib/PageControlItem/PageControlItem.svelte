<script>
  /**
   * PageControlItem — Svelte 5 markup.
   *
   * Single segment/dot atom of the PageControl widget. Pure visual; no
   * interaction states (no hover/pressed/disabled). Visual styles live in
   * ./PageControlItem.css (imported globally via src/app.css).
   *
   * @typedef {'segment' | 'point'} Type
   */

  let {
    type = 'segment',
    active = false,
    ...rest
  } = $props();
</script>

<span
  class="db-page-control-item"
  data-type={type}
  data-active={active ? 'true' : null}
  {...rest}
></span>
