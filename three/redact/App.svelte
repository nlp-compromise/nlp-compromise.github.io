<script>
  import { Page, Back, One, Two, Three, Left, CodeMirror, TextArea } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/one.js'
  let text = `Like the time I caught the ferry over to Shelbyville - I needed a new heel for my shoe, so I decided to go to Morganville which is what they called Shelbyville in those days. So, I tied an onion to my belt which was the style at the time. Now, to take the ferry cost a nickel. And in those days, nickels had pictures of bumblebees on ‘em.`
  let res = nlp(text).text()
  const onchange = function (txt) {
    res = nlp(txt).text()
  }
</script>

<style >
  .res {
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
  .right{
    /* margin-top:-100px; */
    margin-left:50%;
    text-align:center;
  }
</style >

<Back />
<Page bottom='40px'>
  <Left>
    <kbd style="font-size:1.7rem; line-height:2rem">compromise/three/redact</kbd>
    <div style="margin-top:2rem;" />
    <div class="down tab">turn your novel into JSON -</div>
  </Left>

<One >
  <TextArea value={text} size="18px" cb={onchange} />
  <div class="res down">
    {res}
  </div>
</One>
  
</Page>
<div class="right light f09">
  <a href="https://github.com/spencermountain/compromise/" class="">github</a>
</div>