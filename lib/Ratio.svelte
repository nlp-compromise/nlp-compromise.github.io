<script>
  export let ratio = 0.5
  let clientWidth = 100
  $: height = clientWidth / ratio
</script>

<div class="container" style="height:{height}px;" bind:clientWidth>
  <slot />
</div>

<style>
  .container {
    /* border: 1px solid lightgrey; */
    width: 100%;
    height: 50px;
  }
</style>
