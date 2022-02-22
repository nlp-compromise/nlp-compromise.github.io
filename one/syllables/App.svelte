<script>
  import { Page, Back, Two, CodeMirror, Below, Code } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/one.js'
  import speech from '/Users/spencer/mountain/compromise/plugins/speech/src/plugin.js'
  nlp.plugin(speech)

  let text = `edmonton oilers`
  $: more = () => {
    let doc = nlp(text).compute('syllables')
    return doc.syllables()
  }
  let example = `import speech from 'compromise-speech'
nlp.plugin(speech)

let doc = nlp(text)
doc.compute('syllables') //kaboom
doc.syllables()

//or alternatively,
doc.json({syllables: true})
`
</script>

<div class="col">
  <Back href="https://compromise.cool" />
  <Page bottom="40px">
    <div class="lib">compromise/one</div>
    <div class="plugin">compromise-speech</div>
    <div class="down tab desc">tokenize words into approximately spoken syllables</div>
    <CodeMirror bind:text />
    <div class="res">
      {#each more() as list}
        <div>
          {#each list as str}
            <span class="word">{str}</span>
            <span class="dash">•</span>
          {/each}
        </div>
      {/each}
    </div>
    <Two>
      <Code js={example} width="500px" />
    </Two>
  </Page>
  <Below>
    <a href="https://observablehq.com/@spencermountain/compromise" class="">docs</a>
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
    /* display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    align-self: stretch; */
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
