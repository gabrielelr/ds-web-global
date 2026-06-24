<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import PageControl from './PageControl.svelte';

  const { Story } = defineMeta({
    title: 'Lib/PageControl',
    component: PageControl,
    tags: ['autodocs'],
    render: template,
    parameters: {
      docs: {
        description: {
          component:
            'Horizontal row of PageControlItem atoms used as a carousel / ' +
            'swipe pagination indicator. Renders `count` items, with the one ' +
            'at `activeIndex` highlighted.'
        }
      }
    },
    argTypes: {
      type: { control: { type: 'inline-radio' }, options: ['segment', 'point'] },
      count: { control: { type: 'number', min: 1, max: 10, step: 1 } },
      activeIndex: { control: { type: 'number', min: 0, max: 9, step: 1 } }
    },
    args: { type: 'segment', count: 4, activeIndex: 0 }
  });
</script>

{#snippet template(args)}
  <PageControl {...args} />
{/snippet}

<Story name="Segment" args={{ type: 'segment' }} />
<Story name="Point" args={{ type: 'point' }} />
<Story name="Segment / 6 items / index 2" args={{ type: 'segment', count: 6, activeIndex: 2 }} />
<Story name="Point / 8 items / index 5" args={{ type: 'point', count: 8, activeIndex: 5 }} />
