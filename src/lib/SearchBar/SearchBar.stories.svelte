<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SearchBar from './SearchBar.svelte';

  const { Story } = defineMeta({
    title: 'Lib/SearchBar',
    component: SearchBar,
    tags: ['autodocs'],
    render: template,
    parameters: {
      docs: {
        description: {
          component:
            'Pill-shaped text input. The active border is driven by ' +
            '`:focus-within`, so callers just bind `value` — focus the input ' +
            'to see it. The trailing clear button shows up once `value` is ' +
            'non-empty. `state="active"` forces the active visual.'
        }
      }
    },
    argTypes: {
      value: { control: 'text' },
      placeholder: { control: 'text' },
      state: { control: { type: 'inline-radio' }, options: ['default', 'active'] },
      disabled: { control: 'boolean' }
    },
    args: {
      value: '',
      placeholder: 'Search...',
      state: 'default',
      disabled: false
    }
  });
</script>

{#snippet template(args)}
  <div style="width: 341px;">
    <SearchBar {...args} />
  </div>
{/snippet}

<Story name="Empty" args={{}} />
<Story name="With text" args={{ value: 'Roulette' }} />
<Story name="Forced active (empty)" args={{ state: 'active' }} />
<Story name="Forced active (with text)" args={{ state: 'active', value: 'Roulette' }} />
<Story name="Disabled" args={{ disabled: true, placeholder: 'Search is off' }} />

<Story name="Side by side" parameters={{ controls: { disable: true } }}>
  {#snippet template()}
    <div style="display:flex; flex-direction:column; gap:24px; padding:24px; background:#fafbfc; max-width:400px;">
      <div>
        <div style="font:600 11px/1 system-ui; color:#64748b; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:8px;">
          default
        </div>
        <SearchBar value="" placeholder="Che gioco stai cercando?" />
      </div>
      <div>
        <div style="font:600 11px/1 system-ui; color:#64748b; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:8px;">
          active (forced)
        </div>
        <SearchBar state="active" value="Gioco..." />
      </div>
    </div>
  {/snippet}
</Story>
