<script>
  import { Page } from '../lib/index.js'
  import Matcher from '../two/matcher/Matcher.svelte'
</script>

<Page>
  <div id="matcher" class="box">
    <Matcher />
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
