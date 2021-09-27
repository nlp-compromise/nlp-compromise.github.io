<script>
  import Page from './lib/Page.svelte'
  import One from './lib/One.svelte'
  import Two from './lib/Two.svelte'
  import Left from './lib/Left.svelte'
  import Row from './lib/Row.svelte'
  import Block from './lib/Block.svelte'
</script>

<Page>
  <h2>step 4: -</h2>
  <div>compromise/&lt;four&gt;</div>
  <div>Or wait, the word-sense problem? Verb frames? <br/> Oh ya, we should try that. 
  <div>Why not.</div>
  </div>
  <pre >
model.senses.Verb =
{
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
doc.match(‘{plug/stop} (a/the) Noun’)
</pre>
<div >This work is unpublished and in development.</div>
</Page> 
