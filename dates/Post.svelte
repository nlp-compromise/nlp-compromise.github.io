<script>
  import CodeMirror from './CodeMirror/CodeMirror.svelte'
  import {
    Year,
    Quarter,
    Day
  } from '/Users/spencer/mountain/somehow-calendar/src'
  let text = 'two weeks from this friday'
  import nlp from 'compromise'
  import nlpDates from 'compromise-dates'
  import spacetime from 'spacetime'
  import nlpNumbers from 'compromise-numbers'
  nlp.plugin(nlpDates)
  nlp.plugin(nlpNumbers)
  let days = []
  let start = null
  let end = null

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
    if (json[0] && json[0].date) {
      start = spacetime(json[0].date.start)
      end = spacetime(json[0].date.end)
      days = start
        .minus(1, 'second')
        .every('day', end)
        .slice(0, 400)
      days = days.map(s => s.format('iso-short'))
      console.log('days', days)
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
</style>

<div>
  <div class="m3 col">
    compromise-dates
    <CodeMirror bind:text {highlight} />
    <div>{text}</div>
    <div class="m3 row">
      <div>
        <b>start:</b>
        {fmt(start)}
      </div>
      <div>
        <b>end:</b>
        {fmt(end)}
      </div>
    </div>
    <div class="months">
      <Year date={days[0]}>
        {#each days as d}
          <Day date={d} color="blue" />
        {/each}
      </Year>
    </div>
  </div>

</div>
