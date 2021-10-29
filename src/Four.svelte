<script>
  import Page from './lib/Page.svelte'
  import One from './lib/One.svelte'
  import Two from './lib/Two.svelte'
  import Left from './lib/Left.svelte'
  import Row from './lib/Row.svelte'
  import Block from './lib/Block.svelte'
  import TextArea from './lib/TextArea.svelte'
  let str = `model.senses.Verb = {
    plug:{
      sell:{words: [book, biography, album]},
      stop:{words: [drain, sink, pipe], fallback:true},
    },
    strike:{
      hit: {fallback:true}
      protest: {words:[job, union, worker]}
    }
}
doc = nlp(‘plugged the drain’)
doc.match('{plug/stop} (a|the) #Noun')
  `
</script>

<Page>
  <Block color="#6699cc" />
</Page>

<Page>
  <Left>
    <kbd style="font-size:2rem; line-height:2rem">compromise/four</kbd><span class="f2">:</span>
    <div style="margin-top:2rem;" />
    <div class="tab" style="font-size:1.8rem; ">
      - <span style="border-bottom:4px solid #D68881; padding-bottom:5px">&nbsp; word-sense</span> -
    </div>
    <!-- <div class="down tab">turn your novel into JSON.</div> -->
  </Left>
  <One>
    hahaha,
    <div class="tab i">ya right.</div>
  </One>
  <!-- <One>
    Or wait, the word-sense problem? Verb frames?
    <div class="down">Oh ya, we should try that.</div>
    <div>Why not.</div>
    <TextArea value={str} width="600px" height="500px" />
  </One> -->
  <Two>
    <div>this work is in development,</div>
    <div class="f09 tab">- probably forever.</div>
    <!-- <div>This is planned for 2022.</div> -->
  </Two>
</Page>
