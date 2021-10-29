<script>
  export let left = 'none'
</script>

<div class="column">
  <div class="box">
    <div class="body" style="border-left:3px solid {left};">
      <slot />
    </div>
    <div />
  </div>
</div>

<style>
  .column {
    text-align: left;
    display: grid;
    grid-template-columns: 2fr 1fr;
    width: 100%;
    margin-top: 150px;
    margin-bottom: 150px;
  }
  .box {
    /* border: 1px solid grey; */
    text-align: center;
  }
  .body {
    display: inline-block;
    text-align: left;
    padding-left: 1.8rem;
  }
  /* medium */
  @media (max-width: 900px) {
    .column {
      grid-template-columns: 1fr 1fr;
    }
  }
  /* small */
  @media (max-width: 500px) {
    .column {
      grid-template-columns: 1fr;
    }
  }
</style>
