<script>
  import { onMount } from 'svelte'
  export let value = ''
  let el
  export let cb = () => {}

  onMount(() => {
    el.focus()
  })
  export let width = '60%'
  export let height = '162px'
  export let size = '2.2rem'
  const callback = function(e) {
    cb(e.target.value)
  }
</script>

<style>
  .input {
    font-family: 'avenir next', avenir, sans-serif;
    display: block;
    padding: 2rem 3rem 2rem 3rem;
    margin: 0.3em 0.6em 0.3rem 5px;
    width: 60%;
    max-width: 50rem;
    /* line-height: 2; */
    outline: 0;
    border: 0;
    border-radius: 0.4rem;
    font-style: normal;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.2);
    transition: box-shadow 100ms;
    color: #c4cad5;
    resize: none;
    border-bottom: 2px solid transparent;
    border-left: 4px solid lightgrey;
    color: #577c97;
    box-shadow: 2px 1px 5px 0 rgba(0, 0, 0, 0.2);
    border-bottom: 2px solid lightsteelblue;
    /* white-space: nowrap; */
    /* overflow: auto; */
  }
</style>

<textarea
  class="input"
  on:input={callback}
  style="width:{width}; height:{height}; font-size:{size};"
  spellcheck="false"
  type="text"
  bind:value
  bind:this={el} />
