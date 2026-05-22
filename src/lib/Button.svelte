<script>
  let { variant = 'primary', children, ...rest } = $props()

  const styles = {
    primary: 'bg-neutral-900 text-white hover:bg-neutral-700',
    secondary: 'bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-100',
    ghost: 'bg-transparent text-neutral-900 hover:bg-neutral-100',
  }
</script>

<button
  class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 {styles[variant]}"
  {...rest}
>
  {@render children?.()}
</button>
