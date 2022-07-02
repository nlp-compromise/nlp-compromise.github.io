<script>
  import { Page, Back, Two, TextArea, Below, Code, CodeMirror } from '../../lib/index.js'
  let text = `Je m'baladais sur l'avenue le cœur ouvert à l'inconnu
J'avais envie de dire bonjour à n'importe qui
N'importe qui et ce fut toi, je t'ai dit n'importe quoi
Il suffisait de te parler, pour t'apprivoiser
Aux Champs-Elysées, aux Champs-Elysées
Au soleil, sous la pluie, à midi ou à minuit
Il y a tout ce que vous voulez aux Champs-Elysées `
  let html = ''
  const onchange = function (txt) {
    let doc = frCompromise(txt)
    html = doc.html({
      '.nouns': '#Noun+',
      '.verbs': '#Verb+',
      '.adjectives': '#Adjective',
    })
  }
  onchange(text)

  let numText = `quand j'aurai soixante quatre ans`
  $: more = () => {
    let doc = frCompromise(numText)
    doc.numbers().toNumber()
    return doc.text()
  }

  let example = `import tal from 'fr-compromise'

let doc = tal('Aux Champs-Elysées ...')
doc.json()
/*[{
  "text": "Aux Champs-Elysées",
  "terms": [
    {
      "text": "Aux",
      "tags": ["Preposition"],
      "normal": "aux",
      "implicit": "à",
    },
  ...
  ]
}]
`
  console.log(frCompromise.version)
</script>

<div class="col">
  <Back href="https://compromise.cool" />
  <Page bottom="40px">
    <div class="lib">fr-compromise</div>
    <div class="down tab desc">part-of speech tagging in french</div>
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
    <a href="https://observablehq.com/@spencermountain/fr-compromise" class="">docs</a>
    <a href="https://github.com/spencermountain/fr-compromise" class="">github</a>
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
