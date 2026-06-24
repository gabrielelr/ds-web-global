<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import PageControlItem from './PageControlItem.svelte';

  const { Story } = defineMeta({
    title: 'Lib/PageControlItem',
    component: PageControlItem,
    tags: ['autodocs'],
    render: template,
    parameters: {
      docs: {
        description: {
          component:
            'Single segment/dot atom of the PageControl widget. Pure visual: ' +
            '`type` switches between a 48×4 pill (`segment`) and a 4×4 square ' +
            'dot (`point`); `active` toggles the highlight color.'
        }
      }
    },
    argTypes: {
      type: { control: { type: 'inline-radio' }, options: ['segment', 'point'] },
      active: { control: 'boolean' }
    },
    args: { type: 'segment', active: false }
  });
</script>

{#snippet template(args)}
  <PageControlItem {...args} />
{/snippet}

<Story name="Segment / Default" args={{ type: 'segment' }} />
<Story name="Segment / Active" args={{ type: 'segment', active: true }} />
<Story name="Point / Default" args={{ type: 'point' }} />
<Story name="Point / Active" args={{ type: 'point', active: true }} />
