<script>
  import Page from '../lib/Page.svelte'
  import One from '../lib/One.svelte'
  import Two from '../lib/Two.svelte'
  import Three from '../lib/Three.svelte'
  import Left from '../lib/Left.svelte'
  import Caret from '../lib/Caret.svelte'
  import Block from '../lib/Block.svelte'
  import Tagger from './demos/Tagger.svelte'
  import Grid from '../lib/Grid/Grid.svelte'
</script>

<Block color="#978BA3" />
<Page>
  <Left>
    <b class="sky f2">compromise/two</b>
    <div>includes <span class="plugin">tagging</span> the grammar the words.</div>

    <!-- <kbd style="font-size:2rem; line-height:2rem">compromise/two</kbd><span class="f2">:</span> -->
    <div style="margin-top:5rem;" />
    <div class="down tab">classify Noun/Verb/Adjective, etc.</div>
    <div class="tab" style="margin-top:1.5rem;font-size:1.5rem; ">
      -<span style="border-bottom:4px solid #D68881; padding-bottom:5px; ">
        &nbsp;
        <span class="sky">buffalo</span>/
        <span class="rose">buffalo</span>/
        <span class="red">buffalo</span> &nbsp;
      </span>
      -
      <div class="down f09">which is more handy than you may think.</div>
    </div>
  </Left>

  <!-- <One>
    <Tagger />
  </One> -->

  <One>
    <div class="f09">it's nice because,</div>
    <div class="tab">
      you can say that <b class="f2 sea">'buffalo'</b> and <b class="f2 sky">'hamilton'</b>
      <span class="tab">are</span>
      <span class="f2 red down" style="margin-left:10px;">#Nouns</span> -
    </div>
    <div class="tab down i">without actually knowing <span class="sky">what those things are</span></div>
    <div class="down">
      it's a pretty modest
      <div class="tab">interpretation of the words</div>
      <div class="f09">so it actually works.</div>
      <div class="tab f09 down">you don't need to know any linguistics</div>
    </div>
  </One>
  <One>
    <div>
      it's sort of like a <i>regular expression</i> for words.
    </div>
    <!-- <div class="down">and sometimes doing this is helpful:</div> -->
    <ul>
      <kbd class="blue i down">simon says #Verb+ the? #Noun+</kbd>
      <kbd class="blue i down">#FirstName is on #Ordinal</kbd>
      <kbd class="blue i">it was the #Adjective of times</kbd>
    </ul>
    <div class="tab">
      <a href="https://observablehq.com/@spencermountain/compromise-match-syntax" class="red tab down"> - match docs</a>
    </div>
  </One>
  <One>
    <div>these match-templates -</div>
    <div class="tab i">can scoop-up information -</div>
    <div class="tab sky i">like the words are some kind of little database -</div>
    <!-- <div class="down">it surprising how helpful this is.</div> -->
    <div class="down">your matches can be clumsy, ad-hoc</div>
    <div class="tab">and written by non-programmers.</div>
  </One>
  <Two>
    <div style="margin-bottom:3rem;">
      this can do helpful -
      <div class="tab f2">before some crazy <span class="red ">AI-thing</span> -</div>
      <div class="tab">just does it all,</div>
      <br />
      or more often, some person's tired eyes:
    </div>
    <ul class="list down">
      <li><a href="./two/match"><span class="choose down" style="color:white;">Match-syntax</span> <Caret /></a></li>
      <li class="down">
        <a href="./two/radaction"><span class="choose" style="color:white;">Redaction</span> <Caret /></a>
      </li>
      <li class="down">
        <a href="./two/contractions"><span class="choose" style="color:white;">Contractions</span> <Caret /></a>
      </li>
      <!-- <li class="down"><a href="#"><span class="choose" style="color:white;">Chat bots</span> <Caret /></a></li> -->
    </ul>
  </Two>

  <One>
    <div>
      <kbd>compromise/two</kbd>
      <div class="tab">is 130kb minified.</div>
    </div>
  </One>
  <Two>
    <!-- <div>knowing what's a Noun, or a Verb - this is more-handy, and less-nerdy than you'd think.</div> -->
    <div class="i">so is this gif</div>
    <img src="./build/assets/jesus.gif" alt="jesus gif" />
  </Two>
  <Three>
    <div class="row">
      <img class="clean" style="width:350px;" src="./home/img/one.jpg" alt="compromise/one filesize" />
      <img class="clean" style="width:350px;" src="./home/img/two.jpg" alt="compromise/two filesize" />
    </div>
    <div style="width:200px;" />
    <Grid seed="76b36bcb2b4e1fec394" />
  </Three>
</Page>

<style>
  .plugin {
    font-family: monospace, monospace;
    color: #cc8a66;
    margin-top: 1rem;
    margin-left: 4px;
  }
</style>
