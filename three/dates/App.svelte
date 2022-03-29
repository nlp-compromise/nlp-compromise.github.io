<script>
  import { Page, Back, One, Code, Below, Left } from '../../lib/index.js'
  import Dates from './Dates.svelte'
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
  let options = `doc.dates({
  today:'1992-02-03', //stub-in another 'now'
  timezone:'Asia/Shanghai', //for tz computation
  dayStart: '8:00am', //for assumed morning/evening times
  dayEnd: '8:00pm',
  punt: { weeks: 2 } //implied length for 'after june 2nd'
})
`
</script>

<Back href="https://compromise.cool" />
<Page bottom="40px">
  <div class="lib">compromise/three/dates</div>
  <div class="down tab desc">parse natural-language dates -</div>
  <div style="margin:2rem; " class="box">
    <Dates />
  </div>
  <One>
    <Code js={example} width="500px" />
  </One>
  <Left>
    options that you can pass into the <b>.dates()</b> method include:
    <Code js={options} width="630px" />
  </Left>
</Page>
<Below>
  <a href="https://observablehq.com/@spencermountain/compromise-dates" class="">docs</a>
  <a href="https://github.com/spencermountain/compromise/tree/master/plugins/dates" class="">github</a>
</Below>

<style>
  .box {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    /* max-width: 600px; */
  }
</style>
