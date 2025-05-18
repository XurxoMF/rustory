<script lang="ts">
  type CollapsibleProps = {
    children: () => any;
    title: string;
    defaultOpen?: boolean;
  };

  let { children, title, defaultOpen = true }: CollapsibleProps = $props();

  let open = $state(defaultOpen);
</script>

<div class="w-full">
  <button onclick={() => (open = !open)}>
    {title}
  </button>

  <div>
    {@render children()}
  </div>
</div>
