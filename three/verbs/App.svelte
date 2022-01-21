<script>
  import { Page, Back, One, Two, Three, Left, CodeMirror, TextArea, Code, Below } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/three.js'
  import text from './text.js'
  let res = nlp(text).json({ offset: true })
  const onchange = function (txt) {
    res = nlp(txt).json({ offset: true })
  }
  let example = `let doc = nlp('are you saying boo, or boo-urns?')
doc.verbs().json()
// [{text:'saying'}]
`
</script>

<Back href="https://compromise.cool" />
<Page bottom="40px">
  <div class="lib">compromise/three/verbs</div>
  <div class="down tab desc">find and parse the verb-phrases in a sentence -</div>
  <TextArea value={text} size="18px" height="400px" cb={onchange} />

  <div class="res col">
    {#each res as o, n}
      <div class="sentence row">
        {#each o.terms as term, i}
          <div class="term" class:verb={term.tags.includes('Verb')} />
        {/each}
      </div>
    {/each}
  </div>
  <One>
    <Code js={example} width="500px" />
  </One>
</Page>
<Below>
  <a href="https://observablehq.com/@spencermountain/compromise-lookup" class="">docs</a>
  <a href="https://github.com/spencermountain/compromise#one" class="">github</a>
</Below>

<style></style>
