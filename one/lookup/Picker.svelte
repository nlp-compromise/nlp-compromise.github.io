<script>
  export let choice = 0
  export let title = ''
  export let doc = ''
  let list = [
    { file: './sotu/Bush_1989.txt', name: 'Bush 1989' },
    { file: './sotu/Bush_1990.txt', name: 'Bush 1990' },
    { file: './sotu/Bush_1991.txt', name: 'Bush 1991' },
    { file: './sotu/Bush_1992.txt', name: 'Bush 1992' },
    { file: './sotu/Clinton_1993.txt', name: 'Clinton 1993' },
    { file: './sotu/Clinton_1994.txt', name: 'Clinton 1994' },
    { file: './sotu/Clinton_1995.txt', name: 'Clinton 1995' },
    { file: './sotu/Clinton_1996.txt', name: 'Clinton 1996' },
    { file: './sotu/Clinton_1997.txt', name: 'Clinton 1997' },
    { file: './sotu/Clinton_1998.txt', name: 'Clinton 1998' },
    { file: './sotu/Clinton_1999.txt', name: 'Clinton 1999' },
    { file: './sotu/Clinton_2000.txt', name: 'Clinton 2000' },
    { file: './sotu/Bush_2001.txt', name: 'Bush 2001' },
    { file: './sotu/Bush_2002.txt', name: 'Bush 2002' },
    { file: './sotu/Bush_2003.txt', name: 'Bush 2003' },
    { file: './sotu/Bush_2004.txt', name: 'Bush 2004' },
    { file: './sotu/Bush_2005.txt', name: 'Bush 2005' },
    { file: './sotu/Bush_2006.txt', name: 'Bush 2006' },
    { file: './sotu/Bush_2007.txt', name: 'Bush 2007' },
    { file: './sotu/Bush_2008.txt', name: 'Bush 2008' },
    { file: './sotu/Obama_2009.txt', name: 'Obama 2009' },
    { file: './sotu/Obama_2010.txt', name: 'Obama 2010' },
    { file: './sotu/Obama_2011.txt', name: 'Obama 2011' },
    { file: './sotu/Obama_2012.txt', name: 'Obama 2012' },
  ]
  let ps = list.map(o => {
    return fetch(o.file).then(response => response.text())
  })
  let p = Promise.all(ps).then(docs => {
    console.log(docs.length + ' documents loaded')
    docs.forEach((txt, i) => {
      list[i].doc = nlp(txt)
    })
    doc = list[choice].doc
  })

  function onClick(i) {
    choice = i
    doc = list[i].doc
  }
</script>

<div class="count" style="text-align:left;">{title}</div>
<div class="col container">
  {#await p}
    <p>...loading</p>
  {:then p}
    {#each list as o, i}
      <div class="choice" class:chosen={i === choice} on:click={() => onClick(i)}>
        {o.name}
      </div>
    {/each}
  {/await}
</div>
<div class="count">{doc.terms().length.toLocaleString()} words</div>

<style>
  .container {
    border-radius: 5px;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
    overflow-y: scroll;
    max-height: 400px;
    min-height: 400px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    border-bottom: 2px solid transparent;
    border-left: 4px solid lightgrey;
    color: #577c97;
    box-shadow: 2px 1px 5px 0 rgba(0, 0, 0, 0.2);
    border-bottom: 2px solid lightsteelblue;
  }
  .col {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    text-align: center;
    flex-wrap: nowrap;
    align-self: stretch;
  }
  .choice {
    border: 1px solid lightgrey;
    min-height: 40px;
    border-radius: 3px;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.2);
    margin: 5px;
    padding: 5px;
    /* background-color: #d7d5d2; */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    align-self: stretch;
    cursor: pointer;
    background-color: #afb7bd;
    color: #d7d5d2;
  }
  .choice:hover {
    background-color: #81b4c7;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.3);
  }
  .chosen {
    background-color: #6699ad;
    color: #d7d5d2;
  }
  .count {
    color: #949a9e;
    font-size: 12px;
    text-align: right;
    margin-right: 1rem;
  }
</style>
