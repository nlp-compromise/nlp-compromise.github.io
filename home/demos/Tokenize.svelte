<script>
  import { CodeMirror } from '../../lib/index.js'
  // import nlp from 'compromise/two'
  let str = `i have two questions. 'Why lie?' and 'Lies, why?'`

  $: res = nlp(str).json()

  const doit = function () {
    console.log('=-=-=-= here -=-=-=-')
    res = nlp(str).json()
  }

  const showSpaces = function (str) {
    str = str.replace(/ /g, '_')
    str = str.replace(/\r?\n/g, '⏎')
    return str
  }
  const showText = function (term) {
    if (term.machine) {
      return `[${term.machine}]`
    }
    return term.text
  }
</script>

<div class="col">
  <CodeMirror bind:text={str} />

  <div class="res col">
    {#each res as o, n}
      <div class="sentence row">
        {#each o.terms as term, i}
          <div class="space pre" class:empty={!term.pre}>{showSpaces(term.pre)}</div>
          <div class="term">{showText(term)}</div>
          <div class="space post" class:empty={!term.post}>{showSpaces(term.post)}</div>
        {/each}
      </div>
      {#if res[n + 1]}
        <div class="div" />
      {/if}
    {/each}
  </div>
</div>

<style></style>
