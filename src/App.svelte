<script>
  import Button from './lib/Button.svelte'
</script>

<main class="min-h-screen bg-neutral-50 text-neutral-900 p-8 flex flex-col gap-8">
  <header>
    <h1 class="text-3xl font-semibold tracking-tight">bbox-test</h1>
    <p class="text-neutral-500 mt-1">Svelte + Vite + Tailwind v4 playground.</p>
  </header>

  <section class="flex flex-col gap-3">
    <h2 class="text-lg font-medium">Button</h2>
    <div class="flex flex-wrap gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  </section>
</main>
