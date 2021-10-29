<script>
  import Textarea from '../../lib/TextArea.svelte'
  // import text from './text.js'
  // import nlp from '/Users/spencer/mountain/compromise/builds/one/compromise-one.mjs'
  import nlp from '/Users/spencer/mountain/compromise/src/one.js'
  let text = `Like the time I caught the ferry over to Shelbyville - I needed a new heel for my shoe, so I decided to go to Morganville which is what they called Shelbyville in those days. So, I tied an onion to my belt which was the style at the time. Now, to take the ferry cost a nickel. And in those days, nickels had pictures of bumblebees on ‘em.`
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
    here
  </div>
</div>
