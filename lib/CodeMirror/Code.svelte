<script>
  import { onMount } from 'svelte'
  import './style.css'
  import CodeMirror from './lib.js'
  export let text = 'let x=5;'
  export let autofocus = false
  let editor
  let el

  onMount(() => {
    // create codemirror instance
    editor = CodeMirror.fromTextArea(el, {
      value: 'hello',
      autofocus: autofocus,
      viewportMargin: Infinity,
    })

    setTimeout(() => {
      editor.focus()
      editor.setCursor(editor.lineCount(), 0)
    }, 500)
  })
</script>

<div class="outside">
  <textarea class="textarea" bind:this={el} tabindex="0 " />
</div>

<style>
  .outside {
    margin: 2rem;
  }
  :global(.CodeMirror) {
    height: auto;
    border-left: 4px solid lightsteelblue !important;
    border-bottom: none !important;
    text-align: left !important;
  }
  :global(.tag) {
    color: #2d85a8;
    /* background-color: #2d85a8; */
    /* color: #d9d9d9 !important; */
    /* margin: 5px; */
    /* padding: 5px; */
    border-radius: 5px;
    opacity: 1;
  }
</style>
