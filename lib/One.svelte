<script>
  export let accent = ''
  export let left = 'none'
  import colors from './_colors'
  left = colors[left] || left
  accent = colors[accent] || accent
</script>

<div class="column">
  <div class="body" style="border-left:3px solid {left};">
    {#if accent}
      <div class="line" style="background-color:{accent};" />
    {/if}
    <slot />
    <div />
  </div>
</div>

<style>
  .column {
    text-align: left;
    display: grid;
    grid-template-columns: 2fr 1fr; /* 2/3rds */
    width: 100%;
    margin-top: 150px;
    margin-bottom: 150px;
  }
  .body {
    /* border: 1px solid grey; */
    display: inline-block;
    text-align: left;
    margin-left: 0.9rem;
    padding-left: 0.9rem;
    padding-right: 1.8rem;
  }
  .line {
    width: 38.2%;
    height: 5px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  /* very-small */
  @media (max-width: 600px) {
    .column {
      grid-template-columns: 1fr; /* full-thing */
    }
  }
</style>
