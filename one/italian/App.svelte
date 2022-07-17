<script>
  window.itCompromise = window.itCompromise || window.frCompromise //oops

  import { Page, Back, Two, TextArea, Below, Code, CodeMirror } from '../../lib/index.js'
  let text = `Lasciatemi cantare, con la chitarra in mano. Lasciatemi cantare, sono un italiano.
Buongiorno Italia, gli spaghetti al dente, e un partigiano come presidente.
Con l'autoradio sempre nella mano destra, un canarino sopra la finestra`
  let html = ''
  const onchange = function (txt) {
    let doc = itCompromise(txt)
    html = doc.html({
      '.nouns': '#Noun+',
      '.verbs': '#Verb+',
      '.adjectives': '#Adjective',
    })
  }
  onchange(text)

  let numText = `quando avrò sessantaquattro anni`
  $: more = () => {
    let doc = itCompromise(numText)
    doc.numbers().toNumber()
    return doc.text()
  }

  let example = `import tal from 'it-compromise'

let doc = tal('Con la chitarra in mano ...')
doc.json()
/*[{
  "text": "Con la chitarra in mano",
  "terms": [
    {
      "text": "Con",
      "tags": ["Preposition"],
      "normal": "con",
    },
  ...
  ]
}]
`
  console.log(itCompromise.version)
</script>

<div class="col">
  <Back href="https://compromise.cool" />
  <Page bottom="40px">
    <div class="lib">it-compromise</div>
    <div class="down tab desc">part-of speech tagging in italian</div>
    <div class="both">
      <div style="flex-grow:1">
        <div class="top">
          <TextArea value={text} size="18px" cb={onchange} width="80%" height="130px" />
        </div>
        <div class="res" style="position:relative;">
          {@html html}
        </div>
      </div>
    </div>
    <!-- number parsing -->
    <div class="number col">
      <div style="text-align:left; align-self: flex-start; margin-left:3rem;">number-parsing:</div>
      <CodeMirror bind:text={numText} />
      <div class="show">
        {more()}
      </div>
    </div>
    <!-- example code -->
    <Two>
      <Code js={example} width="500px" />
    </Two>
  </Page>
  <Below>
    <a href="https://observablehq.com/@spencermountain/it-compromise" class="">docs</a>
    <a href="https://github.com/spencermountain/it-compromise" class="">github</a>
  </Below>
</div>

<style>
  .res {
    margin: 4rem;
    padding: 1rem;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
    line-height: 1.8rem;
  }
  .show {
    color: steelblue;
    font-size: 32px;
    line-height: 2.5rem;
  }
  .number {
    margin-top: 12rem;
    justify-content: flex-end;
    margin-top: 12rem;
    justify-content: flex-end;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    align-self: stretch;
  }
</style>
