<script>
  import { Page, Back, Two, TextArea, Below, Code } from '../../lib/index.js'
  let text = `Je m'baladais sur l'avenue le cœur ouvert à l'inconnu
J'avais envie de dire bonjour à n'importe qui
N'importe qui et ce fut toi, je t'ai dit n'importe quoi
Il suffisait de te parler, pour t'apprivoiser
Aux Champs-Elysées, aux Champs-Elysées
Au soleil, sous la pluie, à midi ou à minuit
Il y a tout ce que vous voulez aux Champs-Elysées `
  let html = ''
  const onchange = function (txt) {
    let nlp = window.frCompromise
    let doc = nlp(txt)
    html = doc.html({
      '.nouns': '#Noun+',
      '.verbs': '#Verb+',
      '.adjectives': '#Adjective',
    })
  }
  onchange(text)
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
</style>
