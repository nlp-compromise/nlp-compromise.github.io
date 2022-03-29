<script>
  import { Page } from '../lib/index.js'
  import Dates from '../three/dates/Dates.svelte'
</script>

<Page>
  <div class="box">
    <Dates />
  </div>
</Page>

<style>
  .box {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    /* max-width: 600px; */
  }
</style>
