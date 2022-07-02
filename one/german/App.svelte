<script>
  import { Page, Back, Two, TextArea, Below, Code, CodeMirror } from '../../lib/index.js'
  // import nlp from 'de-compromise'
  let text = `Du, könntest du schwimmen.
Wie Delphine, Delphine es tun.
Niemand gibt uns eine Chance.
Doch können wir siegen für immer und immer.
Und wir sind dann Helden für einen Tag.
Ich, ich bin dann König.
Und du, du Königin.
Obwohl sie unschlagbar scheinen.
Werden wir Helden für einen Tag.
Wir sind dann wir an diesem Tag.
Ich, ich glaubte zu träumen (zu träumen).
Die Mauer im Rücken war kalt (so kalt).
Schüsse reißen die Luft (reißen die Luft).
Doch wir küssen, als ob nichts geschieht (nichts geschieht).
Und die Scham fiel auf ihrer Seite.
Oh, wir können sie schlagen für alle Zeiten.
Dann sind wir Helden für diesen Tag.
Dann sind wir Helden.
      `
  let html = ''
  const onchange = function (txt) {
    let doc = deCompromise(txt)
    html = doc.html({
      '.nouns': '#Noun+',
      '.verbs': '#Verb+',
      '.adjectives': '#Adjective',
    })
  }
  onchange(text)

  // let numText = `Ich bin siebenunddreißig Jahre alt`
  // $: more = () => {
  //   let doc = deCompromise(numText)
  //   // doc.numbers().toNumber()
  //   return doc.text()
  // }

  let example = `import pln from 'de-compromise'

let doc = pln('Hast du etwas Zeit für mich?')
doc.json()
/*[
  {
    "text": "Hast du etwas Zeit für mich?",
    "terms": [
      {
        "text": "Hast",
        "tags": [ "Noun" ],
      },
      {
        "text": "du",
        "tags": [ "Noun", "Pronoun" ],
        "normal": "du",
      },
      ...
    ]
}
`
  console.log(deCompromise.version)
</script>

<div class="col">
  <Back href="https://compromise.cool" />
  <Page bottom="40px">
    <div class="lib">de-compromise</div>
    <div class="down tab desc">part-of speech tagging in german</div>
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

    <!-- number parsing 
    <div class="number col">
      <div style="text-align:left; align-self: flex-start; margin-left:3rem;">number-parsing:</div>
      <CodeMirror bind:text={numText} />
      <div class="show">
        {more()}
      </div>
    </div>
-->
    <Two>
      <Code js={example} width="500px" />
    </Two>
  </Page>
  <Below>
    <a href="https://observablehq.com/@spencermountain/de-compromise" class="">docs</a>
    <a href="https://github.com/nlp-compromise/de-compromise" class="">github</a>
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
