<script>
  import { Page, TextArea } from '../../lib/index.js'
  // import Code from './Code.svelte'
  let txt = ''

  // let p = fetch('./one.txt')
  let p = fetch('./three.txt')
    // let p = fetch('https://unpkg.com/compromise@13.11.4-rc4/builds/compromise.js')
    .then(response => response.text())
    .then(data => {
      console.log(data)
      txt = data
    })
</script>

<div class="m3">
  {#await p}
    <p>...waiting</p>
  {:then p}
    <!-- <Code js={txt} /> -->
    <div class="row">
      <div class="bar" />
      <div class="size col">
        <div>
          {txt}
        </div>
      </div>
      <div class="label">- 32 kb</div>
    </div>
  {/await}
</div>

<style>
  .m3 {
    margin: 3rem;
  }
  .label {
    font-size: 0.8rem;
    border-bottom: 1px solid lightgrey;
    color: grey;
    margin-left: 0.5rem;
    margin-bottom: 190px;
  }
  .bar {
    height: 185px;
    width: 7px;
    opacity: 0.75;
    background-color: steelblue;
    border-radius: 2px;
    margin-right: -2px;
    margin-bottom: 2px;
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
    padding: 0.6rem;
    font-weight: bold;
    margin-top: 3rem;
    width: 600px;
    min-height: 600px;
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
