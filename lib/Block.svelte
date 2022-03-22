<script>
  export let color = 'steelblue'
</script>

<div class="block container" style="background-color:{color};" />

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
  .block {
    /* min-height: 1000px;
    box-shadow: 3px 12px 36px 1px rgba(0, 0, 0, 0.2);
    margin-left: 55px;
    margin-right: 55px;
    margin-bottom: 140px;
    flex-basis: 1200px;
    display: block; */
    box-shadow: 3px 12px 36px 1px rgba(0, 0, 0, 0.2);
    min-height: 150px;
    flex: 1;
    /* min-width: 100%; */
    border-radius: 5px;
  }
  /* phones */
  @media (max-width: 900px) {
    .block {
      margin: 15px;
    }
  }
</style>
