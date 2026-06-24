<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ButtonIcon from './ButtonIcon.svelte';

  const { Story } = defineMeta({
    title: 'Lib/ButtonIcon',
    component: ButtonIcon,
    tags: ['autodocs'],
    render: template,
    parameters: {
      docs: {
        description: {
          component:
            'Square, icon-only button derived from the Antares design system. ' +
            'Shares tokens with Button; same matrix of appearance, hierarchy, ' +
            'size and state. Note: `registration` ships only `primary` and ' +
            '`secondary` — no ghost. Pass `aria-label` for accessibility.'
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
      disabled: { control: 'boolean' }
    },
    args: {
      appearance: 'brand',
      hierarchy: 'primary',
      size: 'md',
      state: 'default',
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
  <ButtonIcon aria-label="Placeholder action" {...args} />
{/snippet}

<Story name="Brand / Primary" args={{ appearance: 'brand', hierarchy: 'primary' }} />
<Story name="Brand / Secondary" args={{ appearance: 'brand', hierarchy: 'secondary' }} />
<Story name="Brand / Ghost" args={{ appearance: 'brand', hierarchy: 'ghost' }} />
<Story name="Registration / Primary" args={{ appearance: 'registration', hierarchy: 'primary' }} />
<Story name="Registration / Secondary" args={{ appearance: 'registration', hierarchy: 'secondary' }} />
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
              <ButtonIcon
                {appearance}
                {hierarchy}
                {size}
                {state}
                aria-label="Placeholder action"
              />
            {/each}
          {/each}
        {/each}
      {/each}
    </div>
  {/snippet}
</Story>
