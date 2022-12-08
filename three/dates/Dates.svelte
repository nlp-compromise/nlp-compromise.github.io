<script>
  import { CodeMirror } from '../../lib/index.js'
  import { Year } from '/Users/spencer/mountain/somehow-calendar/src/index.mjs'
  import spacetime from 'spacetime'
  nlp.plugin(compromiseDates)
  let text = `meet next weekend`
  // console.log('nlp', nlp.version)
  // console.log('dates', compromiseDates.version)

  let days = {}
  let start = spacetime()
  let end = null
  let today = spacetime.now().format('iso-short')
  let year = start.year()

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
      days[today] = '#D1D1D1'
      let show = start.minus(1, 'second').every('day', end).slice(0, 400)
      show.forEach(s => {
        let iso = s.format('iso-short')
        days[iso] = 'blue'
      })
    } else {
      days = {}
    }
    return offsets
  }
</script>

<div class="box">
  <CodeMirror bind:text {highlight} autofocus={false} />
  <div class="months">
    <Year year={start.year()} date={start.format('iso-short')} {days} showToday={false} />
  </div>
</div>

<style>
  .box {
    flex-grow: 1;
    max-width: 500px;
  }
</style>
