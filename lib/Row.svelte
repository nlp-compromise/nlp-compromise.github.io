<script>
  // export let left = ''
  // export let right = ''
</script>

<div class="row">
  <slot />
</div>

<style>
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    flex-wrap: nowrap;
    align-self: stretch;
  }
</style>
