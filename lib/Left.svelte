<script>
  export let accent = ''
  export let left = 'none'
  import colors from './_colors.js'
  left = colors[left] || left
  accent = colors[accent] || accent
</script>

<div class="column">
  <div class="body" style="border-left:3px solid {left};">
    {#if accent}
      <div class="line" style="background-color:{accent};" />
    {/if}
    <slot />
  </div>
  <div />
</div>

<style>
  .column {
    text-align: left;
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    margin-top: 150px;
    margin-bottom: 150px;
  }
  .body {
    text-align: left;
    display: inline-block;
    text-align: left;
    margin-left: 0.9rem;
    padding-left: 0.9rem;
    padding-right: 1.8rem;
  }
  .line {
    width: 33.3%;
    height: 4px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
</style>
