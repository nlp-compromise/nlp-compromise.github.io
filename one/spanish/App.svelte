<script>
  import { Page, Back, Two, TextArea, Below, Code } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/es-compromise/builds/es-compromise.mjs'
  let text = `Sí, sabes que ya llevo un rato mirándote
Tengo que bailar contigo hoy
Vi que tu mirada ya estaba llamándome
Muéstrame el camino que yo voy
Oh, tú, tú eres el imán y yo soy el metal
Me voy acercando y voy armando el plan
Solo con pensarlo se acelera el pulso (oh yeah)
Ya, ya me estás gustando más de lo normal
Todos mis sentidos van pidiendo más
Esto hay que tomarlo sin ningún apuro`
  let html = ''
  const onchange = function (txt) {
    let doc = nlp(txt)
    html = doc.html({
      '.nouns': '#Noun+',
      '.verbs': '#Verb+',
      '.adjectives': '#Adjective',
    })
  }
  onchange(text)
  let example = `import pln from 'es-compromise'

let doc = pln('Tú eres el imán ..')
doc.json()
/*[{
    "text": "Tú eres el imán ..",
    "terms": [
      {
        "text": "Tú",
        "tags": ["Noun"],
        "normal": "tú",
        "chunk": "Noun"
      },
      ...
    ]
}
`
</script>

<div class="col">
  <Back href="https://compromise.cool" />
  <Page bottom="40px">
    <div class="lib">es-compromise</div>
    <div class="down tab desc">part-of speech tagging in spanish</div>
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
    <a href="https://observablehq.com/@spencermountain/es-compromise" class="">docs</a>
    <a href="https://github.com/nlp-compromise/es-compromise" class="">github</a>
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
  .res {
    margin: 4rem;
    padding: 1rem;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
    line-height: 1.8rem;
  }
</style>
