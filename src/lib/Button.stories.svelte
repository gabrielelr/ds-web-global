<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from './Button.svelte';

  const { Story } = defineMeta({
    title: 'Lib/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['primary', 'secondary', 'ghost'],
      },
    },
  });
</script>

{#snippet template(args)}
  <Button {...args}>Click me</Button>
{/snippet}

<Story name="Primary" args={{ variant: 'primary' }} children={template} />
<Story name="Secondary" args={{ variant: 'secondary' }} children={template} />
<Story name="Ghost" args={{ variant: 'ghost' }} children={template} />
