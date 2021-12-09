<script>
</script>

<div class="row">
  <div class="side" />
  <div class="container">
    <div class="half">
      <slot />
    </div>
  </div>
  <div class="side" />
</div>

<style>
  .half {
    width: 50%;
    display: flex;
    justify-content: space-around;
  }
  .container {
    min-height: 25px;
    margin-bottom: 140px;
    flex-basis: 1200px;
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: center;
    flex-wrap: wrap;
    align-self: flex-end;
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
  @media (max-width: 600px) {
    .half {
      width: 100%;
    }
  }
</style>
