<script>
  // export let x = 0
  import hljs from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'

  import 'highlight.js/styles/github.css'
  import { onMount } from 'svelte'
  console.log(javascript)
  hljs.registerLanguage('javascript', javascript)
  let str = `let x= 4; 
function cool(){
  console.log('nice')
}`

  onMount(() => {
    hljs.highlightAll()
  })
</script>

<pre><code class="language-javascript mine">{str}</code></pre>

<style>
  .mine {
    border: 1px solid lightgrey;
    border-radius: 5px;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
    display: block;
    width: 400px;
    margin-top: 4rem;
  }
</style>
