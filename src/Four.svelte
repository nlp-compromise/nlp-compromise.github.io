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
  <Left>
    <div class="tab">
      <h2>Step 4: -</h2>
      <div class="tab">
        <kbd>compromise/&lt;four&gt;</kbd>
      </div>
    </div>
  </Left>
  <One>
    Or wait, the word-sense problem? Verb frames?
    <div class="down">Oh ya, we should try that.</div>
    <div>Why not.</div>
    <TextArea value={str} width="600px" height="500px" />
  </One>
  <Two>
    <div>This work is unpublished and still in development.</div>
    <div>This is planned for 2022.</div>
  </Two>
</Page>
