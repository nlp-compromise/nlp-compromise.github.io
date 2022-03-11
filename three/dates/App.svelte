<script>
  import { Page, Back, One, Code, CodeMirror, Below } from '../../lib/index.js'
  import { Year } from '/Users/spencer/mountain/somehow-calendar/src/index.mjs'
  import spacetime from 'spacetime'
  import nlp from '/Users/spencer/mountain/compromise/src/three.js'
  import nlpDates from '/Users/spencer/mountain/compromise/plugins/dates/builds/compromise-dates.mjs'
  nlp.plugin(nlpDates)
  let text = 'next weekend'

  let example = `let doc = nlp('sometime next tuesday')
doc.dates().json()
/*[{ 
text: 'next tuesday',
date: {
  start: '2022-03-28',
  end: '2022-03-28'
}
}]*/
`
  let days = {}
  let start = spacetime()
  let end = null

  const highlight = function (str = '') {
    let dates = nlp(str).dates()
    let json = dates.json({ offset: true })
    let offsets = json.map(obj => {
      let offset = obj.offset
      return {
        start: offset.start,
        end: offset.start + offset.length,
        tag: 'tag',
      }
    })
    if (json[0] && json[0]) {
      start = spacetime(json[0].dates.start)
      end = spacetime(json[0].dates.end)
      days = {}
      let show = start.minus(1, 'second').every('day', end).slice(0, 400)
      show.forEach(s => {
        let iso = s.format('iso-short')
        days[iso] = 'blue'
      })
    } else {
      days = []
    }
    return offsets
  }
</script>

<Back href="https://compromise.cool" />
<Page bottom="40px">
  <div class="lib">compromise/three/dates</div>
  <div class="down tab desc">parse natural-language dates -</div>
  <div style="margin:2rem;">
    <CodeMirror bind:text {highlight} />
    <div class="months">
      <Year date={start.format('iso-short')} {days} showToday={false} />
    </div>
  </div>
  <One>
    <Code js={example} width="500px" />
  </One>
</Page>
<Below>
  <a href="https://observablehq.com/@spencermountain/compromise-dates" class="">docs</a>
  <a href="https://github.com/spencermountain/compromise/tree/master/plugins/dates" class="">github</a>
</Below>

<style></style>
