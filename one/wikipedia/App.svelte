<script>
  import { Page, Back, Two, CodeMirror, Below, Code } from '../../lib/index.js'
  import nlp from 'compromise/one'
  // import plg from 'compromise-wikipedia'
  import plg from '/Users/spencer/mountain/compromise/plugins/wikipedia/src/plugin.js'
  nlp.plugin(plg)
  let text = `wait, there's a new mexico?`
  $: more = () => {
    let doc = nlp(text)
    return doc.wikipedia().json({ normal: true })
  }
  let example = `import stats from 'compromise-wikipedia'
nlp.plugin(stats)

let doc = nlp(text)
doc.wikipedia()
`
</script>

<div class="col">
  <Back href="https://compromise.cool" />
  <Page bottom="40px">
    <div class="lib">compromise/one</div>
    <div class="plugin blue"><b class="">compromise-wikipedia</b> plugin</div>
    <div class="down tab desc">find common wikipedia articles appearing in a document</div>
    <div class="both">
      <div style="flex-grow:1">
        <CodeMirror bind:text />
        <div class="res row">
          {#each more() as m}
            <div class="word">
              {m.normal}
            </div>
          {/each}
        </div>
      </div>
    </div>
    <Two>
      <Code js={example} width="500px" />
    </Two>
  </Page>
  <Below>
    <a href="https://observablehq.com/@spencermountain/compromise-wikipedia" class="">docs</a>
    <a href="https://github.com/spencermountain/compromise/tree/master/plugins/wikipedia" class="">github</a>
  </Below>
</div>

<style>
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    align-self: stretch;
  }
  .word {
    color: #fbfbfb;
    background-color: steelblue;
    padding: 5px;
    margin-bottom: 1.5rem;
    border-radius: 3px;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
  }
</style>
