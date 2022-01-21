<script>
  import { Page, Back, One, Two, Three, Left, CodeMirror } from '../../lib/index.js'
  import { Year } from '/Users/spencer/mountain/somehow-calendar/src/index.mjs'
  let text = 'next weekend'
  // import Textarea from '../../lib/TextArea.svelte'
  import nlp from '/Users/spencer/mountain/compromise/src/three.js'

  import spacetime from 'spacetime'
  // import Align from './Align.svelte'
  // nlp.plugin(nlpDates)
  // nlp.plugin(nlpNumbers)
  let days = {}
  let start = spacetime()
  let end = null
  let date = null
  let from = null

  const highlight = function (str = '') {
    // let dates = nlp(str).dates()
    // let json = dates.json({ offset: true })
    let json = nlp(str).match('. [.]', 0).json({ offset: true }) //temp
    let offsets = json.map(obj => {
      let offset = obj.offset
      return {
        start: offset.start,
        end: offset.start + offset.length,
        tag: 'tag',
      }
    })
    if (json[0] && json[0]) {
      start = spacetime(json[0].start)
      end = spacetime(json[0].end)
      let show = start.minus(1, 'second').every('day', end).slice(0, 400)
      // from = show[0]
      // to = show[show.length - 1]
      days = {}
      show.forEach(s => {
        let iso = s.format('iso-short')
        days[iso] = 'blue'
      })
      from = Object.keys(days)[0]
    } else {
      days = []
    }

    return offsets
  }

  const fmt = function (s) {
    if (s) {
      return s.format('{day-short} {month-short} {date-ordinal} {time}')
    }
    return '-'
  }
  const fmtYear = function (s) {
    if (s) {
      return s.format('{year}')
    }
    return '-'
  }
</script>

<Back href="https://compromise.cool" />
<Page bottom="40px">
  <Left>
    <kbd style="font-size:1.7rem; line-height:2rem">compromise/three/dates</kbd>
    <div style="margin-top:2rem;" />
    <div class="down tab">parse natural-language dates-</div>
  </Left>

  <One>
    <CodeMirror bind:text {highlight} />
    <div class="months">
      <!-- <Resize start={from} end={to} {days} /> -->
      <Year date={start.format('iso-short')} {days} showToday={false} />
    </div>
  </One>

  <One>
    <!-- <Align/> -->
  </One>
</Page>
<div class="right light f09">
  <a href="https://github.com/spencermountain/compromise/" class="">github</a>
</div>

<style></style>
