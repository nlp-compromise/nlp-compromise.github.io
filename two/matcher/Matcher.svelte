<script>
  import { onMount } from 'svelte'
  // import nlp from 'compromise/two'
  let str = 'the #Adjective #Noun+'

  let doc = nlp('')
  let output = ''

  const loadMore = function (i) {
    let p = fetch(`./corpus/doc-${i}.json`)
      .then(response => response.json())
      .then(arr => {
        let txt = arr.join(' ')
        let d = nlp(txt)
        doc.concat(d)
        showText()
      })
    i += 1
    return p
  }

  const showText = function () {
    console.log('oninput')
    let obj = {}
    obj[str] = m => `<span class="show">${m.text()}</span>`
    output = doc.wrap(obj)
  }

  onMount(() => {
    setTimeout(async function () {
      console.log('calling')
      for (let i = 0; i < 8; i += 1) {
        await loadMore(i)
      }
    }, 1000)
  })
</script>

<div class="col">
  <input class="input" type="text" bind:value={str} on:input={showText} />

  <div class="scroller">{@html output}</div>
</div>

<style>
  .col {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: left;
    flex-wrap: wrap;
    align-self: stretch;
  }
  .scroller {
    font-size: 10px;
    line-height: 12px;
    width: 60%;
    padding: 1rem;
    max-height: 600px;
    border: 1px solid grey;
    border-radius: 4px;
    overflow-y: scroll;
    text-align: justify;
    resize: both;
  }
  .input {
    font-family: ui-monospace;
    color: steelblue;
    display: block;
    padding-left: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-size: 24px;
    /* padding: 2rem 2rem 2rem 2rem; */
    margin: 0.3em 0.6em 0.3rem 5px;
    max-width: 500px;
    line-height: 24px;
    outline: 0;
    border: 0;
    border-radius: 0.4rem;
    font-style: normal;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.2);
    transition: box-shadow 100ms;
    resize: none;
    border-bottom: 2px solid transparent;
    border-left: 4px solid lightgrey;
    box-shadow: 2px 1px 5px 0 rgba(0, 0, 0, 0.2);
    border-bottom: 2px solid lightsteelblue;
    height: auto;
    width: 80%;
    border-radius: 4px;
    padding-left: 1rem;
    color: #525050;
    direction: ltr;
    line-height: 2.6rem;
    font-size: 2rem;
    padding-top: 0.85rem;
    padding-bottom: 0.75rem;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
    /* white-space: nowrap; */
    /* overflow: auto; */
  }
</style>
