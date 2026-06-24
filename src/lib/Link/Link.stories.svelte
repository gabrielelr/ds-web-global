<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Link from './Link.svelte';

  const { Story } = defineMeta({
    title: 'Lib/Link',
    component: Link,
    tags: ['autodocs'],
    render: template,
    parameters: {
      docs: {
        description: {
          component:
            'Link component derived from the Antares design system. ' +
            'Two appearances (`neutral`, `brand`), two sizes (`md`, `sm`) and ' +
            'three states (`default`, `hover`, `disabled`). When `disabled` ' +
            'is true the anchor drops its `href` and exposes `aria-disabled`.'
        }
      }
    },
    argTypes: {
      appearance: {
        control: { type: 'inline-radio' },
        options: ['neutral', 'brand']
      },
      size: {
        control: { type: 'inline-radio' },
        options: ['md', 'sm']
      },
      state: {
        control: { type: 'inline-radio' },
        options: ['default', 'hover', 'disabled'],
        description: 'Forces a visual state (useful for snapshots).'
      },
      label: { control: 'text' },
      href: { control: 'text' },
      showLeftIcon: { control: 'boolean' },
      showRightIcon: { control: 'boolean' },
      disabled: { control: 'boolean' }
    },
    args: {
      appearance: 'neutral',
      size: 'md',
      state: 'default',
      label: 'Link',
      href: '#',
      showLeftIcon: false,
      showRightIcon: false,
      disabled: false
    }
  });
</script>

{#snippet template(args)}
  <Link {...args} />
{/snippet}

<Story name="Neutral" args={{ appearance: 'neutral' }} />
<Story name="Brand" args={{ appearance: 'brand' }} />
<Story name="With left icon" args={{ showLeftIcon: true }} />
<Story name="With right icon" args={{ showRightIcon: true }} />
<Story name="With both icons" args={{ showLeftIcon: true, showRightIcon: true }} />
<Story name="Small" args={{ size: 'sm' }} />
<Story name="Disabled" args={{ disabled: true }} />

<Story name="All variants" parameters={{ controls: { disable: true } }}>
  {#snippet template()}
    <div
      style="display:grid; grid-template-columns: max-content repeat(3, max-content); column-gap:24px; row-gap:20px; align-items:center; padding:24px; background:#fafbfc;"
    >
      <span></span>
      {#each ['default', 'hover', 'disabled'] as state}
        <span
          style="font:600 11px/1 system-ui; color:#64748b; text-transform:uppercase; letter-spacing:0.04em;"
        >
          {state}
        </span>
      {/each}

      {#each ['neutral', 'brand'] as appearance, idx}
        <div
          style="grid-column: 1 / -1; font:700 11px/1 system-ui; color:#0f172a; letter-spacing:0.04em; text-transform:uppercase; padding:8px 0 0; border-top:{idx === 0 ? 'none' : '1px solid #e2e8f0'};"
        >
          appearance · {appearance}
        </div>

        {#each ['md', 'sm'] as size}
          <span
            style="font:600 11px/1 system-ui; color:#64748b; text-transform:uppercase; letter-spacing:0.04em; justify-self:end;"
          >
            {size}
          </span>
          {#each ['default', 'hover', 'disabled'] as state}
            <Link {appearance} {size} {state} href="#" label="Link" />
          {/each}
        {/each}
      {/each}
    </div>
  {/snippet}
</Story>
