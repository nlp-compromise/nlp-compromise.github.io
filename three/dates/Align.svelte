<script>
  import texts from './data/dates.js'
  // import nlp from 'compromise'
  let nlp = window.nlp
  nlp.plugin(window.compromiseDates)
  nlp.plugin(window.compromiseNumbers)
  // export let text =
  let list = texts.map(txt => {
    let doc = nlp(txt).sentences(0)
    let date = doc.dates(0)
    if (!date.found) {
      return null
    }
    let s = doc.splitOn(date)
    // console.log(s.out('array'))
    if (s.length < 2) {
      return null
    }
    if (s.length === 2) {
      if (s.eq(1).has('^#Date+$')) {
        return [s.eq(0).text(), s.eq(1).text(), '']
      } else {
        return ['', s.eq(0).text(), s.eq(1).text()]
      }
    }
    return [s.eq(0).text(), s.eq(1).text(), s.eq(2).text()]
  })
  list = list.filter(l => l)
  // truncate strings on both sides
  const max = 80
  list = list.map(a => {
    if (a[0].length > max) {
      a[0] = a[0].substr(a[0].length - max, a[0].length)
    }
    if (a[1].length > max) {
      a[1] = a[1].substr(0, max)
    }
    if (a[2].length > max) {
      a[2] = a[2].substr(0, max)
    }
    return a
  })
</script>

<div class="col">
  {#each list as a}
    <div class="row">
      <div class="side" style="text-align:right;">{a[0]}</div>
      <div class="red">{a[1]}</div>
      <div class="side" style="text-align:left;">{a[2]}</div>
    </div>
  {/each}
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    align-self: stretch;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    align-self: stretch;
  }
  .red {
    background-color: #ab5850;
    color: white;
    padding: 5px;
    margin: 5px;
    border-radius: 5px;
  }
  .side {
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    flex: 1 1 0;
  }
</style>
