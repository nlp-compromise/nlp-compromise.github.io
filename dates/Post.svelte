<script>
  let nlp=window.nlp
  nlp.plugin(window.compromiseDates)
  nlp.plugin(window.compromiseNumbers)
  import CodeMirror from './CodeMirror/CodeMirror.svelte'
  import { Year } from '/Users/spencer/mountain/somehow-calendar/src'
  let text = 'next weekend'
  // import nlp from 'compromise'
  // import nlpDates from 'compromise-dates'
  // import nlpNumbers from 'compromise-numbers'


  import spacetime from 'spacetime'
  import Align from './Align.svelte'
  // nlp.plugin(nlpDates)
  // nlp.plugin(nlpNumbers)
  let days = {}
  let start = spacetime()
  let end = null
  let date = null
  let from = null

  const highlight = function(str = '') {
    let dates = nlp(str).dates()
    let json = dates.json({ offset: true })
    let offsets = json.map(obj => {
      let offset = obj.offset
      return {
        start: offset.start,
        end: offset.start + offset.length,
        tag: 'tag'
      }
    })
    if (json[0] && json[0]) {
      start = spacetime(json[0].start)
      end = spacetime(json[0].end)
      let show = start
        .minus(1, 'second')
        .every('day', end)
        .slice(0, 400)
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

  const fmt = function(s) {
    if (s) {
      return s.format('{day-short} {month-short} {date-ordinal} {time}')
    }
    return '-'
  }
  const fmtYear = function(s) {
    if (s) {
      return s.format('{year}')
    }
    return '-'
  }
</script>

<style>
  .m3 {
    margin: 3rem;
  }
  .col {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    align-self: stretch;
    width: 100%;
  }
  .months {
    width: 100%;
    max-width: 50rem;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    flex-wrap: nowrap;
    align-self: stretch;
  }
  .year {
    font-size: 1.5;
    font-weight: bold;
  }
  .link {
    text-decoration: none;
    color: steelblue;
  }
</style>

<div>
  <div class="m3 col">
    <a
      class="link"
      href="https://github.com/spencermountain/compromise/tree/master/plugins/dates">
      compromise-dates
    </a>

    <CodeMirror bind:text {highlight} />
    <div>{text}</div>
    <div class="m3 row">
      <div>
        <b>start:</b>
        {fmt(start)}
      </div>
      <div class="year">{fmtYear(start)}</div>
      <div>
        <b>end:</b>
        {fmt(end)}
      </div>
    </div>
    <div class="months">
      <!-- <Resize start={from} end={to} {days} /> -->
      <Year date={start.format('iso-short')} {days} showToday={false} />
    </div>
    <!-- <pre>${JSON.stringify(days, null, 2)}</pre> -->
  </div>
  <div class="m3">
    <hr />
    <div class="m3">
      <Align />
    </div>
  </div>
</div>
