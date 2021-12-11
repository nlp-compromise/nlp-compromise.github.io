<script>
  import { Page, Back, One, Two, Three, Left, CodeMirror, Below, Code } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/two.js'
  let text = `no! we're not gonna take it..`
  let res = ''
  let json = []
  let example = `let doc = nlp('spencer\'s cool')
doc.has('spencer is')
// true

doc.terms().length
// 3

doc.contractions().expand()
doc.text()
// 'spencer is cool'

// ↓
doc = nlp('spencer\'s house')
doc.contractions().length
// 0
  `
  const onChange = function (txt) {
    let doc = nlp(txt)
    let found = doc.contractions()
    json = found.json({ offset: true })
    let offsets = json.map(obj => {
      let offset = obj.offset
      return {
        start: offset.start,
        end: offset.start + offset.length,
        tag: 'tag',
      }
    })
    found.expand()
    res = doc.text()
    return offsets
  }
  onChange()
</script>

<Back />
<Page bottom="40px">
  <div class="lib">compromise/two</div>
  <div class="plugin">contractions</div>
  <div class="down tab desc">pick-apart and work-around implicit words.</div>
  <div style="margin-top:2rem;" />
  <div class="down">
    <CodeMirror bind:text highlight={onChange} />
    <div class="res f2">
      {#each json as o}
        <div class="row" style="justify-content:flex-start; padding:2rem;">
          <div class="m2 sea" style="min-width:150px;">{o.text}:</div>
          <div class="col sky f1" style="text-align:left; margin-top:2rem;">
            {#each o.terms as t}
              <div style="margin-top:2rem;">→ {t.machine}</div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    <div class="res down f2">
      {res}
    </div>
  </div>

  <Two>
    <Code js={example} width="500px" />
  </Two>
</Page>
<Below>
  <a href="https://observablehq.com/@spencermountain/compromise-contractions" class="">docs</a>
  <a href="https://github.com/spencermountain/compromise#two" class="">github</a>
</Below>

<style>
  .res {
    margin-top: 4rem;
    margin-left: 4rem;
  }
  .right {
    margin-top: -100px;
    margin-left: 50%;
    text-align: center;
  }
</style>
