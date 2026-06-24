<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from './Button.svelte';

  const { Story } = defineMeta({
    title: 'Lib/Button',
    component: Button,
    tags: ['autodocs'],
    render: template,
    parameters: {
      docs: {
        description: {
          component:
            'Button component derived from the Antares design system. ' +
            'Two appearances (`brand`, `registration`), three hierarchies, ' +
            'two sizes and four states. Note: `registration` ships only ' +
            '`primary` and `secondary` — no ghost.'
        }
      }
    },
    argTypes: {
      appearance: {
        control: { type: 'inline-radio' },
        options: ['brand', 'registration']
      },
      hierarchy: {
        control: { type: 'inline-radio' },
        options: ['primary', 'secondary', 'ghost']
      },
      size: {
        control: { type: 'inline-radio' },
        options: ['md', 'sm']
      },
      state: {
        control: { type: 'inline-radio' },
        options: ['default', 'hover', 'pressed', 'disabled'],
        description: 'Forces a visual state (useful for snapshots).'
      },
      label: { control: 'text' },
      showLeftIcon: { control: 'boolean' },
      showRightIcon: { control: 'boolean' },
      disabled: { control: 'boolean' }
    },
    args: {
      appearance: 'brand',
      hierarchy: 'primary',
      size: 'md',
      state: 'default',
      label: 'Button',
      showLeftIcon: false,
      showRightIcon: false,
      disabled: false
    }
  });

  // Per Antares, registration only ships primary and secondary
  const HIERARCHIES_BY_APPEARANCE = {
    brand: ['primary', 'secondary', 'ghost'],
    registration: ['primary', 'secondary']
  };
</script>

{#snippet template(args)}
  <Button {...args} />
{/snippet}

<Story name="Brand / Primary" args={{ appearance: 'brand', hierarchy: 'primary' }} />
<Story name="Brand / Secondary" args={{ appearance: 'brand', hierarchy: 'secondary' }} />
<Story name="Brand / Ghost" args={{ appearance: 'brand', hierarchy: 'ghost' }} />
<Story name="Registration / Primary" args={{ appearance: 'registration', hierarchy: 'primary' }} />
<Story name="Registration / Secondary" args={{ appearance: 'registration', hierarchy: 'secondary' }} />
<Story name="With left icon" args={{ showLeftIcon: true }} />
<Story name="With right icon" args={{ showRightIcon: true }} />
<Story name="With both icons" args={{ showLeftIcon: true, showRightIcon: true }} />
<Story name="Small" args={{ size: 'sm' }} />
<Story name="Disabled" args={{ disabled: true }} />

<Story name="All variants" parameters={{ controls: { disable: true } }}>
  {#snippet template()}
    <div
      style="display:grid; grid-template-columns: max-content repeat(4, max-content); column-gap:24px; row-gap:20px; align-items:center; padding:24px; background:#fafbfc;"
    >
      <span></span>
      {#each ['default', 'hover', 'pressed', 'disabled'] as state}
        <span
          style="font:600 11px/1 system-ui; color:#64748b; text-transform:uppercase; letter-spacing:0.04em;"
        >
          {state}
        </span>
      {/each}

      {#each ['brand', 'registration'] as appearance, idx}
        <!-- appearance divider -->
        <div
          style="grid-column: 1 / -1; font:700 11px/1 system-ui; color:#0f172a; letter-spacing:0.04em; text-transform:uppercase; padding:8px 0 0; border-top:{idx === 0 ? 'none' : '1px solid #e2e8f0'};"
        >
          appearance · {appearance}
        </div>

        {#each HIERARCHIES_BY_APPEARANCE[appearance] as hierarchy}
          {#each ['md', 'sm'] as size}
            <span
              style="font:600 11px/1 system-ui; color:#64748b; text-transform:uppercase; letter-spacing:0.04em; justify-self:end;"
            >
              {hierarchy} · {size}
            </span>
            {#each ['default', 'hover', 'pressed', 'disabled'] as state}
              <Button {appearance} {hierarchy} {size} {state} label="Button" />
            {/each}
          {/each}
        {/each}
      {/each}
    </div>
  {/snippet}
</Story>
