<script>
  import { onMount } from 'svelte'
  let cmp
  onMount(() => {
    let options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    }
    // const cb = function (entries) {
    //   if (entries[0].intersectionRatio > 0.2) {
    //     if (history.pushState) {
    //       history.pushState(null, null, '#' + name)
    //     } else {
    //       location.hash = '#' + name
    //     }
    //   }
    // }
    // let observer = new IntersectionObserver(cb, options)
    // observer.observe(cmp)
  })
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
    min-height: 1000px;
    box-shadow: 3px 12px 36px 1px rgba(0, 0, 0, 0.2);
    margin-left: 55px;
    margin-right: 55px;
    margin-bottom: 140px;
    flex-basis: 1200px;
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
