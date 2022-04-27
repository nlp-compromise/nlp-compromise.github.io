<script>
  import { Page, Back, Two, CodeMirror, Below, Code } from '../../lib/index.js'
  import nlp from 'compromise/three'

  let text = `four hundred seventy two`
  $: more = () => {
    return nlp(text).numbers().get()
  }
  let example = `let doc = nlp('seven hundred seaguls')
doc.numbers().toNumber()
doc.text()
// '700 seaguls'
`
</script>

<div class="col">
  <Back href="https://compromise.cool" />
  <Page bottom="40px">
    <div class="lib">compromise/three</div>
    <div class="plugin">.numbers()</div>
    <div class="down tab desc">interpret written-out numbers, in different formats</div>
    <CodeMirror bind:text />
    <div class="res">
      {#each more() as num}
        <div>
          {num}
        </div>
      {/each}
    </div>
    <Two>
      <Code js={example} width="500px" />
    </Two>
  </Page>
  <Below>
    <a href="https://observablehq.com/@spencermountain/compromise-numbers" class="">docs</a>
    <a href="https://github.com/spencermountain/compromise/" class="">github</a>
  </Below>
</div>

<style>
  .word {
    display: inline-block;
    margin: 1rem;
    font-size: 3rem;
  }
  .dash {
    color: grey;
    font-size: 1rem;
  }
  .res {
    line-height: 3.5rem;
    margin-top: 6rem;
    margin-left: 2rem;
    margin-bottom: 8rem;
    color: #cc7066;
    font-size: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    align-self: stretch;
  }
  .col {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    text-align: center;
    flex-wrap: wrap;
    align-self: stretch;
  }
</style>
