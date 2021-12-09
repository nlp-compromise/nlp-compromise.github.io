<script>
  import Page from '../lib/Page.svelte'
  import One from '../lib/One.svelte'
  import Two from '../lib/Two.svelte'
  import Grid from '../lib/Grid/Grid.svelte'
  import Left from '../lib/Left.svelte'
  import Caret from '../lib/Caret.svelte'
  import Block from '../lib/Block.svelte'
  import Tokenize from './demos/Tokenize.svelte'
</script>

<Page>
  <Block color="#D68881" />
</Page>
<Page>
  <Left>
    <kbd style="font-size:2rem; line-height:2rem">compromise/one</kbd><span class="f2">:</span>
    <div style="margin-top:2rem;" />
    <div class="tab" style="font-size:1rem; ">
      - <span style="border-bottom:4px solid #D68881; padding-bottom:5px">&nbsp; splitting - it - up &nbsp;</span> -
    </div>
    <div class="down tab">turn your novel into JSON -</div>
    <div class="" style="margin-top:4.5rem;">
      <Tokenize />
    </div>
  </Left>
  <One>
    <!-- <div class="f09">promise -</div> -->
    <!-- <div><kbd>compromise/one</kbd> is a completely uncontroversial way</div> -->
    <!-- <div class="f09">you can</div> -->
    <div class="tab">
      with a one-liner-

      <div class="tab">in a couple milliseconds</div>
    </div>
    <div class="tab">
      split text into <span class="cherry">sentences</span> and <span class="rose">words</span> and
      <span class="sky">punctuation</span>.
    </div>
  </One>

  <One>
    <div class="down">the tokenizer's been refined over 10 ruthless github-years</div>
    <!-- <div class="tab f09">and is running at the UN, government orgs, banks, and many software companies.</div> -->
    <!-- <div>this basic thing has been refined for 8 ruthless github-years</div> -->

    <!-- <div class="down f09">it actually just works.</div>
    <div class=" f09">you're allowed to be suspicious of it, though.</div> -->
    <div class="tab down f09">
      when someone tells you it's impossible,
      <div class="tab">give a polite shrug.</div>
      <div class="tab i f09 down">haha, i dunno man!</div>
    </div>
  </One>

  <One>
    <div>
      <kbd>compromise/one</kbd>
      <div class="tab">is 20kb of javascript:</div>
    </div>
    <Grid seed="1645e30c3c09ed478e5" />
  </One>
  <!-- <Left>
    <Row>
      <div>it's like 20kb of javascript</div>
      <div>+ symmetric tools</div>
    </Row>
  </Left> -->
  <Two>
    <div class="down f09">so you can do:</div>
    <ul class="list down">
      <li><a href="#"><span class="choose" style="color:white;">Contractions</span> <Caret /></a></li>
      <li class="down"><a href="#"><span class="choose" style="color:white;">Syllable parsing</span> <Caret /></a></li>
      <li class="down"><a href="#"><span class="choose" style="color:white;">Phrase Lookup</span> <Caret /></a></li>
      <li class="down"><a href="#"><span class="choose" style="color:white;">TypeAhead</span> <Caret /></a></li>
    </ul>
  </Two>

  <div>sometimes just splitting things up is enough.</div>
  <div class="m1">it feels like data now, a little.</div>
  <div class="m2 sea down f09">or swing harder ↓</div>
</Page>

<style>
  .demo {
    margin-top: 2rem;
    text-decoration: underline;
  }
</style>
