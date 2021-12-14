<script>
  import { Page, TextArea } from '../../lib/index.js'
  // import Code from './Code.svelte'
  let txt = ''
  let size = '248'
  let len = 0
  export let max = '400px'
  // let p = fetch('./one.txt')
  // let p = fetch('./two.txt')
  let p = fetch('./three.txt')
    // let p = fetch('https://unpkg.com/compromise@13.11.4-rc4/builds/compromise.js')
    .then(response => response.text())
    .then(data => {
      console.log(data)
      txt = data
      len = txt.length
    })
</script>

<div class="m3">
  {#await p}
    <p>...waiting</p>
  {:then p}
    <!-- <Code js={txt} /> -->
    <div class="row">
      <div class="bar" style="height: {len / 600}px;" />
      <div class="size col" style=" min-height:{max};">
        <div class="label">- {size} kb</div>
        <div>
          {txt}
        </div>
      </div>
    </div>
  {/await}
</div>

<style>
  .m3 {
    margin: 3rem;
  }
  .label {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    text-align: center;
    margin-left: 1rem;
    /* text-decoration: underline; */
    /* border-bottom: 1px solid lightgrey; */
    color: grey;
    font-weight: 400;
    /* margin-left: 0.5rem; */
    /* margin-bottom: 190px; */
  }
  .bar {
    width: 7px;
    opacity: 0.75;
    background-color: steelblue;
    border-radius: 2px;
    margin-right: -7px;
    padding-bottom: 0.1rem;
    margin-bottom: 0.1rem;
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }
  .col {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .size {
    font-family: 'avenir next', avenir, sans-serif;
    padding: 0.3rem;
    padding-top: 1.2rem;
    padding-bottom: 0.1rem;
    font-weight: bold;
    margin-top: 3rem;
    width: 600px;
    overflow-x: hidden;
    outline: 0;
    border: 0;
    border-radius: 0.4rem;
    font-size: 1px;
    line-height: 2px;
    resize: none;
    border-bottom: 2px solid transparent;
    border-left: 4px solid lightgrey;
    color: black;
    box-shadow: 2px 1px 5px 0 rgba(0, 0, 0, 0.2);
    border-bottom: 2px solid lightsteelblue;
  }
</style>
