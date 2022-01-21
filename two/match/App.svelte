<script>
  import { Page, Back, One, Left, Two, CodeMirror, Below, Code, TextArea } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/two.js'
  let str = 'the #Noun is #Adjective'
  let count = 0
  let example = `const doc = nlp('simon says clean the fridge')

// detect a match
let found = doc.has('simon says') 
// true

// capture a sub-match
let m = doc.match('simon says [#Verb+]', 0)
m.text() // 'clean'
`
  let doc = nlp('')
  let res = doc.none()
  let duration = 0

  const doit = function () {
    let begin = new Date()
    res = doc.match(str)
    let end = new Date()
    duration = end.getTime() - begin.getTime()
  }

  // load on init
  let ps = []
  for (let i = 1; i < 20; i += 1) {
    const p = fetch(`https://unpkg.com/nlp-corpus@4.0.0/builds/${i}-doc.txt`)
      .then(response => response.text())
      .then(txt => nlp(txt))
    ps.push(p)
  }
  let p = Promise.all(ps).then(res => {
    console.log('downloaded')
    doc = res[0]
    // let txt=res.join('\n')
    // doc=nlp(txt)
    console.log('parsed')
    count += doc.length
    doit()
  })
</script>

<div class="col">
  <Back href="https://compromise.cool" />
  <Page bottom="40px">
    <div class="lib">compromise/two</div>
    <div class="plugin">match-syntax</div>
    <div class="down tab desc">grammar is finally useful.</div>
    <CodeMirror bind:text={str} />

    {#await p}
      <div class="col" style="align-items: center;">...loading documents</div>
    {:then p}
      <div class="col" style="align-items: center;">
        <button on:click={doit}>run</button>
        searching {count.toLocaleString()} sentences
      </div>

      <!-- sentence-list -->
      <div class="list">
        <div style="margin-bottom:2rem;">{res.length} matches in {duration}ms</div>
        {#each res.json() as o}
          <div class="sentence">• {o.text}</div>
        {/each}
      </div>
    {/await}

    <Two>
      <Code js={example} width="500px" />
    </Two>
  </Page>
  <Below>
    <a href="https://observablehq.com/@spencermountain/compromise-match-syntax" class="">docs</a>
    <a href="https://github.com/spencermountain/compromise#two" class="">github</a>
  </Below>
</div>

<style></style>
