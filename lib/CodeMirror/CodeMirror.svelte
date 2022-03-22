<script>
  import { onMount } from 'svelte'
  import './style.css'
  import CodeMirror from './lib.js'
  export let text = ''
  export let autofocus = true
  let editor
  let el
  export let highlight = () => {}
  export let onEnter = e => {
    return CodeMirror.Pass
  }
  const clear = function (doc) {
    doc.getAllMarks().forEach(m => m.clear())
  }

  onMount(() => {
    // create codemirror instance
    editor = CodeMirror.fromTextArea(el, {
      autofocus: autofocus,
      viewportMargin: Infinity,
      extraKeys: {
        Enter: onEnter,
      },
    })
    // update each keypress
    editor.on('change', doc => {
      clear(doc)
      text = doc.getValue()
      let offsets = highlight(text) || []
      offsets.forEach(m => {
        let start = doc.posFromIndex(m.start)
        let end = doc.posFromIndex(m.end)
        editor.markText(start, end, {
          className: m.tag,
        })
      })
    })
    CodeMirror.signal(editor, 'change', editor)

    setTimeout(() => {
      editor.focus()
      editor.setCursor(editor.lineCount(), 0)
    }, 500)
  })
</script>

<div class="outside">
  <textarea class="textarea" bind:this={el} tabindex="0 ">{text}</textarea>
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
