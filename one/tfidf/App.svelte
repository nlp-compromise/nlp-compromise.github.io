<script>
  import { Page, Back, Two, CodeMirror, Below, Code } from '../../lib/index.js'
  // import nlp from 'compromise/one'
  import plg from 'compromise-stats'
  nlp.plugin(plg)
  import { interpolateGnBu } from 'd3-scale-chromatic'
  // interpolateYlOrRd
  // console.log(interpolateYlOrRd)
  let res = []
  let max = 7
  let text = `i pronounce it to be the most whimsical take of the season`
  $: more = () => {
    let doc = nlp(text)
    doc.compute('tfidf')
    return doc.terms().json()
  }
  let example = `import stats from 'compromise-stats'
  nlp.plugin(stats)
  
  let doc = nlp(text)
  doc.tfidf()
  
  // or alternatively,
  doc.compute('tfidf').json()
  `
  console.log(nlp.version)
</script>

<div class="col">
  <Back href="https://compromise.cool" />
  <Page bottom="40px">
    <div class="lib">compromise/two</div>
    <div class="plugin blue"><b class="">compromise-stats</b> plugin</div>
    <div class="plugin">tfidf</div>
    <div class="down tab desc">find the least-common words in a document</div>
    <div class="both">
      <div style="flex-grow:1">
        <CodeMirror bind:text />
        <div class="res row">
          {#each more() as obj}
            <div>
              {#each obj.terms as o, i}
                <div class="word" style="background-color:{interpolateGnBu(o.tfidf / max)}">
                  <div>
                    {o.normal}
                  </div>
                  <div class="smol">{o.tfidf}</div>
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    </div>
    <Two>
      <Code js={example} width="500px" />
    </Two>
  </Page>
  <Below>
    <a href="https://observablehq.com/@spencermountain/compromise-stats" class="">docs</a>
    <a href="https://github.com/spencermountain/compromise/tree/master/plugins/stats" class="">github</a>
  </Below>
</div>

<style>
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    align-self: stretch;
  }
  .word {
    color: #fbfbfb;
    padding: 5px;
    margin-bottom: 1.5rem;
    border-radius: 3px;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
  }
  .smol {
    font-size: 0.8rem;
  }
</style>
