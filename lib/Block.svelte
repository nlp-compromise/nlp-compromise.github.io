<script>
  export let color = 'steelblue'
</script>

<div class="block" style="background-color:{color};" />

<style>
  .block {
    /* min-height: 1000px;
    box-shadow: 3px 12px 36px 1px rgba(0, 0, 0, 0.2);
    margin-left: 55px;
    margin-right: 55px;
    margin-bottom: 140px;
    flex-basis: 1200px;
    display: block; */
    box-shadow: 3px 12px 36px 1px rgba(0, 0, 0, 0.2);
    min-height: 250px;
    flex: 1;
    min-width: 100%;
    border-radius: 5px;
  }
  /* phones */
  @media (max-width: 900px) {
    .block {
      margin: 15px;
    }
  }
</style>
