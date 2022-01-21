<script>
  import { Page, Back, One, Two, Three, Left, CodeMirror, TextArea, Code, Below } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/three.js'
  import text from './text.js'
  let res = nlp(text).redact().text()
  const onchange = function (txt) {
    res = nlp(txt).redact().text()
  }
  let example = `let doc = nlp('my number is 416-555-6732')
doc.redact()
doc.text()`
</script>

<Back href="https://compromise.cool" />
<Page bottom="40px">
  <div class="lib">compromise/three/redact</div>
  <div class="down tab desc">hide identifiable information in a document -</div>
  <!-- <div class="plugin">.readact()</div> -->
  <TextArea value={text} size="18px" height="400px" cb={onchange} />
  <pre class="res down">
    {res}
  </pre>
  <One>
    <Code js={example} width="500px" />
  </One>
</Page>
<Below>
  <a href="https://observablehq.com/@spencermountain/compromise-lookup" class="">docs</a>
  <a href="https://github.com/spencermountain/compromise#one" class="">github</a>
</Below>

<style></style>
