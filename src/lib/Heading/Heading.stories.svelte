<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Heading from './Heading.svelte';
  import Link from '../Link/Link.svelte';
  import BadgeStatus from '../BadgeStatus/BadgeStatus.svelte';

  const { Story } = defineMeta({
    title: 'Lib/Heading',
    component: Heading,
    tags: ['autodocs'],
    render: template,
    parameters: {
      docs: {
        description: {
          component:
            'Heading component derived from the Antares design system. ' +
            '`level` picks the typography group (d1/d2/h1/h2/h3); `as` ' +
            'picks the rendered HTML tag (defaults to a sensible match). ' +
            'Optional left icon and trailing slot (link, badge, icon).'
        }
      }
    },
    argTypes: {
      level: {
        control: { type: 'inline-radio' },
        options: ['d1', 'd2', 'h1', 'h2', 'h3']
      },
      as: {
        control: { type: 'select' },
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'p', 'span']
      },
      text: { control: 'text' },
      showLeftIcon: { control: 'boolean' }
    },
    args: {
      level: 'h1',
      text: 'Heading',
      showLeftIcon: false
    }
  });
</script>

{#snippet template(args)}
  <Heading {...args} />
{/snippet}

<Story name="H1" args={{ level: 'h1' }} />
<Story name="H2" args={{ level: 'h2' }} />
<Story name="H3" args={{ level: 'h3' }} />
<Story name="D1 (display)" args={{ level: 'd1', text: 'Display 1' }} />
<Story name="D2 (display)" args={{ level: 'd2', text: 'Display 2' }} />
<Story name="With left icon" args={{ level: 'h2', showLeftIcon: true }} />

<Story name="With right link">
  {#snippet template(args)}
    <Heading {...args}>
      {#snippet right()}
        <Link size="sm" href="#" label="See all" />
      {/snippet}
    </Heading>
  {/snippet}
</Story>

<Story name="With right badge">
  {#snippet template(args)}
    <Heading {...args}>
      {#snippet right()}
        <BadgeStatus status="success" appearance="default" label="Live" showIcon={false} />
      {/snippet}
    </Heading>
  {/snippet}
</Story>

<Story name="All levels" parameters={{ controls: { disable: true } }}>
  {#snippet template()}
    <div style="display:flex; flex-direction:column; gap:16px; padding:24px; background:#fafbfc;">
      {#each ['d1', 'd2', 'h1', 'h2', 'h3'] as level}
        <div style="display:flex; align-items:baseline; gap:24px;">
          <span style="font:600 11px/1 system-ui; color:#64748b; text-transform:uppercase; letter-spacing:0.04em; min-width:32px;">
            {level}
          </span>
          <Heading {level} text="Heading text" />
        </div>
      {/each}
    </div>
  {/snippet}
</Story>
