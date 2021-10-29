<script>
  import Textarea from '../../lib/TextArea.svelte'
  // import text from './text.js'
  // import nlp from '/Users/spencer/mountain/compromise/builds/one/compromise-one.mjs'
  import nlp from '/Users/spencer/mountain/compromise/src/one.js'
  let text = `Maybe it's the beer talking, Marge. But you've got a butt that won't quit. They've got these big chewy pretzels here <undecipherable slurring> five dollars?! Get outta here!`
  let json = nlp(text).json({terms:{tags:false, index:false, machine:false}})
  const onchange = function (txt) {
    json = nlp(txt).json()
  }
</script>

<style >
  .json {
    font-size:10px; 
    line-height:12px; 
    max-height:250px; 
    max-width:500px; 
    overflow:scroll; 
    border:1px solid lightgrey; 
    border-radius:4px;
    box-shadow: 2px 2px 8px 0px rgba( 0, 0, 0, 0.2 );
    padding:1rem;
    color:#949a9e;
  }
</style >

<div style="min-width:800px;">
  <Textarea value={text} size="18px" cb={onchange} />
  <div class="json down">
    <pre>{JSON.stringify(json, null, 1)}</pre>
  </div>
</div>
