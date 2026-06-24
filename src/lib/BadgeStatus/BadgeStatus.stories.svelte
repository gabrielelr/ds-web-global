<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import BadgeStatus from './BadgeStatus.svelte';

  const { Story } = defineMeta({
    title: 'Lib/BadgeStatus',
    component: BadgeStatus,
    tags: ['autodocs'],
    render: template,
    parameters: {
      docs: {
        description: {
          component:
            'Status badge from the Antares design system. Four statuses ' +
            '(`success`, `failed`, `warning`, `neutral`) crossed with three ' +
            'appearances (`filled`, `default`, `subtle`) = 12 visual cells. ' +
            'Icon is optional; falls back to the Antares placeholder when ' +
            'no `icon` snippet is passed.'
        }
      }
    },
    argTypes: {
      status: {
        control: { type: 'inline-radio' },
        options: ['success', 'failed', 'warning', 'neutral']
      },
      appearance: {
        control: { type: 'inline-radio' },
        options: ['filled', 'default', 'subtle']
      },
      label: { control: 'text' },
      showIcon: { control: 'boolean' }
    },
    args: {
      status: 'neutral',
      appearance: 'default',
      label: 'Label',
      showIcon: true
    }
  });
</script>

{#snippet template(args)}
  <BadgeStatus {...args} />
{/snippet}

<Story name="Success" args={{ status: 'success' }} />
<Story name="Failed" args={{ status: 'failed' }} />
<Story name="Warning" args={{ status: 'warning' }} />
<Story name="Neutral" args={{ status: 'neutral' }} />
<Story name="Without icon" args={{ showIcon: false }} />

<Story name="All variants" parameters={{ controls: { disable: true } }}>
  {#snippet template()}
    <div
      style="display:grid; grid-template-columns: max-content repeat(4, max-content); column-gap:24px; row-gap:20px; align-items:center; padding:24px; background:#fafbfc;"
    >
      <span></span>
      {#each ['success', 'failed', 'warning', 'neutral'] as status}
        <span
          style="font:600 11px/1 system-ui; color:#64748b; text-transform:uppercase; letter-spacing:0.04em;"
        >
          {status}
        </span>
      {/each}

      {#each ['filled', 'default', 'subtle'] as appearance}
        <span
          style="font:600 11px/1 system-ui; color:#64748b; text-transform:uppercase; letter-spacing:0.04em; justify-self:end;"
        >
          {appearance}
        </span>
        {#each ['success', 'failed', 'warning', 'neutral'] as status}
          <BadgeStatus {status} {appearance} label="Label" />
        {/each}
      {/each}
    </div>
  {/snippet}
</Story>
