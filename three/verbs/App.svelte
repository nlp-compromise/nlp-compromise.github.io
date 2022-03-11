<script>
  import { Page, Back, One, Two, Three, Left, CodeMirror, TextArea, Code, Below } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/three.js'
  import text from './text.js'
  let res = nlp(text) //.json({ offset: true })
  const onchange = function (txt) {
    res = nlp(txt) //.json({ offset: true })
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

  <pre class="res col">
    {@html res.html({ '.choose': res.verbs() })}
  </pre>
  <One>
    <Code js={example} width="500px" />
  </One>
</Page>
<Below>
  <a href="https://observablehq.com/@spencermountain/compromise-lookup" class="">docs</a>
  <a href="https://github.com/spencermountain/compromise#one" class="">github</a>
</Below>

<style>
  pre {
    max-width: 100%;
    overflow-x: scroll;
    border-right: 1px solid lightgrey;
    border-radius: 5px;
    padding: 0.8rem;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
  }
</style>
