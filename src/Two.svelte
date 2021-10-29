<script>
  import Page from './lib/Page.svelte'
  import One from './lib/One.svelte'
  import Two from './lib/Two.svelte'
  import Three from './lib/Three.svelte'
  import Left from './lib/Left.svelte'
  import Caret from './lib/Caret.svelte'
  import Block from './lib/Block.svelte'
  import Tagger from './demos/Tagger.svelte'
  import Grid from './lib/Grid/Grid.svelte'
</script>

<Page>
  <Block color="#978BA3" />
</Page>
<Page>
  <Left>
    <kbd style="font-size:2rem; line-height:2rem">compromise/two</kbd><span class="f2">:</span>
    <div style="margin-top:2rem;" />
    <div class="tab" style="font-size:1.5rem; color:#949a9e;">
      - <span style="border-bottom:4px solid #D68881; padding-bottom:5px; ">
        &nbsp;
        <span class="sky">buffalo</span>/
        <span class="rose">buffalo</span>/
        <span class="red">buffalo</span> &nbsp;
      </span> -
    </div>
    <div class="down tab">identify words as Noun/Verb/Adjective</div>
    <div class="down f09">which is more handy than you may think -</div>
  </Left>

  <One>
    <Tagger />
  </One>

  <One>
    <div class="f09">it's nice because,</div>
    <div class="tab">
      you can say that <b class="f2 sea">'buffalo'</b> and <b class="f2 sky">'hamilton'</b>
      <div class="tab">are</div>
      <div class="f2 red tab down">#Nouns</div>
    </div>
    <div class="tab down i">without actually knowing what those things are.</div>
  </One>
  <Two>
    <div class="down">and sometimes this is helpful:</div>
    <ul>
      <kbd class="blue f2 i">it was the #Adjective of times</kbd>
      <kbd class="blue f2 i down">simon says [#Verb+ the? &lt;Noun&gt;]</kbd>
      <kbd class="blue f2 i down">#FirstName is on #Ordinal</kbd>
    </ul>
    <div class="tab">
      <a href="https://observablehq.com/@spencermountain/compromise-match-syntax" class="red tab"> - match docs</a>
    </div>
  </Two>
  <One>
    <div>these match-templates -</div>
    <div class="tab i">can scoop-up information -</div>
    <div class="tab sky i">like some kind of little database -</div>
    <!-- <div class="down">it surprising how helpful this is.</div> -->
    <div class="down">your matches can be clumsy, ad-hoc</div>
    <div class="tab">they can be written by non-programmers.</div>
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
      <li><a href="#"><span class="choose down" style="color:white;">Match-syntax</span> <Caret /></a></li>
      <li class="down">
        <a href="#"><span class="choose" style="color:white;">Automated Redaction</span> <Caret /></a>
      </li>
      <li class="down"><a href="#"><span class="choose" style="color:white;">Chat bots</span> <Caret /></a></li>
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
    <img src="./assets/jesus.gif" alt="jesus gif" />
  </Two>
  <Three>
    <div style="width:200px;" />
    <Grid seed="76b36bcb2b4e1fec394" />
  </Three>
</Page>
