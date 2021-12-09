<script>
  import { onMount } from 'svelte'
  import hljs from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'
  import 'highlight.js/styles/github.css'
  export let js = ''
  export let width = '400px'

  hljs.registerLanguage('javascript', javascript)
  onMount(() => {
    hljs.highlightAll()
  })
</script>

<pre><code class="language-javascript mine" style="width:{width}">{js}</code></pre>

<style>
  .mine {
    border: 1px solid lightgrey;
    border-radius: 5px;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
    display: block;
    width: 400px;
    margin-top: 4rem;
    line-height: 1.6rem;
  }
</style>
