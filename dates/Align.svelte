<script>
  import texts from './data/dates'
  import nlp from 'compromise'
  // export let text =
  let list = texts.map(txt => {
    let doc = nlp(txt).sentences(0)
    let date = doc.dates(0)
    let s = doc.splitOn(date)
    return [s.eq(0).text(), s.eq(1).text(), s.eq(2).text()]
  })
</script>

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

<div class="col">
  {#each list as a}
    <div class="row">
      <div class="side" style="text-align:right;">{a[0]}</div>
      <div class="red">{a[1]}</div>
      <div class="side" style="text-align:left;">{a[2]}</div>
    </div>
  {/each}

</div>
