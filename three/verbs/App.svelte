<script>
  import { Page, Back, One, Two, Three, Left, CodeMirror, TextArea, Code, Below } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/three.js'
  import text from './text.js'
  let res = nlp(text).json({offset:true})
  const onchange = function (txt) {
    res = nlp(txt).json({offset:true})
  }
let example=`let doc = nlp('are you saying boo, or boo-urns?')
doc.verbs().json()
// [{text:'saying'}]
`
</script>

<style >
  .res {
    font-size:1rem; 
    margin-top:5rem;
    margin-left:5rem;
    flex-shrink:1;
    line-height:1.2rem; 
    border-radius:4px;
    padding:1rem;
    color:#949a9e;
  }
  .col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align:center;
  align-self: stretch;
}
  .term{
    /* border:2px solid steelblue; */
    height:8px;
    border-radius:2px;
    width:20px;
    margin:6px;
    box-shadow: 2px 2px 4px 0px rgba( 75, 90, 102, 0.2 );
  }
  .verb{
    background-color:steelblue;
    opacity:0.8;
  }
  .row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align:center;
  flex-wrap: nowrap;
  align-self: stretch;
}
</style >

<Back />
<Page bottom='40px'>
    <div class="lib">compromise/three/verbs</div>
    <div class="down tab desc">find and parse the verb-phrases in a sentence -</div>
  <TextArea value={text} size="18px" height="400px" cb={onchange} />

  <div class="res col">
    {#each res as o, n}
    <div class="sentence row">
      {#each o.terms as term, i}
      <div class="term" class:verb="{term.tags.includes('Verb')}"></div>
      {/each}
    </div>
    {/each}
  </div>
  <One>
    <Code js={example} width="500px"/>
  </One>    
</Page>
<Below> 
  <a href="https://observablehq.com/@spencermountain/compromise-lookup" class="">docs</a>
  <a href="https://github.com/spencermountain/compromise#one" class="">github</a>
</Below>