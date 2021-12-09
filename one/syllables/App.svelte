<script>
  import { Page, Back, One, Two, Three, Left, CodeMirror, TextArea, Below, Code } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/one.js'
  import speech from '/Users/spencer/mountain/compromise/plugins/speech/src/plugin.js'
  nlp.plugin(speech)
  let text=`edmonton oilers`
  $: more=()=>{
    let doc=nlp(text).compute('syllables')
    return doc.syllables()
  }
</script>


<style >
  .res {
    font-size:4rem;
    line-height:4.2rem;
    margin-top:4rem;
    color:#cc7066;
  }
  .right{
    /* margin-top:-100px; */
    margin-left:50%;
    text-align:center;
  }
  .col {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  text-align:center;
  flex-wrap: wrap;
  align-self: stretch;
}
.label{
  font-family: monospace, monospace;
  border-bottom:1px solid grey;
  display:inline;
  margin-left:1rem;
  padding-left:0.2rem;
  padding-right:0.2rem;
}
.plugin{
  font-family: monospace, monospace;
  color:#cc8a66;
  margin-top:1rem;
  margin-left:5rem;
}
</style >

<div class="col">
  <Back />
  <Page bottom="40px">
      <div class="label">compromise/one</div>
      <div class="plugin">compromise-speech</div>
      <div style="margin-top:2rem;" />
      <div class="down tab">tokenize words into approximately spoken syllables</div>
    
      <CodeMirror bind:text={text}/>
      <div class="res">
        {more()}
      </div>

      <Code>
        
      </Code>
  </Page>
  <Below> 
    <a href="https://observablehq.com/@spencermountain/compromise" class="">docs</a>
    <a href="https://github.com/spencermountain/compromise/" class="">github</a>
  </Below>
</div>

