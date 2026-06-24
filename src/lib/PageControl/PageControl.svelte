<script>
  /**
   * PageControl — Svelte 5 markup.
   *
   * Horizontal row of PageControlItem atoms (carousel/swipe pagination
   * indicator). Renders `count` items with the item at `activeIndex`
   * highlighted. Purely presentational; consumer wires up click handlers
   * or keyboard navigation as needed.
   *
   * @typedef {'segment' | 'point'} Type
   */
  import PageControlItem from '../PageControlItem/PageControlItem.svelte';

  let {
    type = 'segment',
    count = 4,
    activeIndex = 0,
    ...rest
  } = $props();
</script>

<div class="db-page-control" data-type={type} {...rest}>
  {#each { length: count } as _, i}
    <PageControlItem {type} active={i === activeIndex} />
  {/each}
</div>
