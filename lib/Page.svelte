<script>
  import colors from './_colors'
  export let color = null
  color = colors[color] || color

  let cmp
</script>

<div class="row">
  <div class="side" />
  <div class="container">
    <slot />
  </div>
  <div class="side" />
</div>

<style>
  .container {
    min-height: 200px;
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
      margin: 15px;
    }
  }
</style>
