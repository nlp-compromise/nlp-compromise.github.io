<script>
  import colors from './_colors'
  export let color = null
  color = colors[color] || color
  export let bottom = '140px'

  let cmp
</script>

<div class="row">
  <div class="side" />
  <div class="container" style="margin-bottom:{bottom};">
    <slot />
  </div>
  <div class="side" />
</div>

<style>
  .container {
    min-height: 800px;
    border-radius: 5px;
    text-align: left;
    padding: 2rem;
    box-shadow: 3px 12px 36px 1px rgba(0, 0, 0, 0.2);
    margin-left: 55px;
    margin-right: 55px;
    margin-bottom: 140px;
    flex-basis: 1200px;
    overflow-x: scroll;
  }
  .side {
    flex: 1;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    align-self: stretch;
  }
  /* phones */
  @media (max-width: 900px) {
    .container {
      padding: 0.5rem;
      margin: 15px;
    }
  }
</style>
