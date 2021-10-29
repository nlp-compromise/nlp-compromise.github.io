<script>
  import Page from './lib/Page.svelte'
  import One from './lib/One.svelte'
  import Two from './lib/Two.svelte'
  import Grid from './lib/Grid/Grid.svelte'
  import Left from './lib/Left.svelte'
  import Caret from './lib/Caret.svelte'
  import Block from './lib/Block.svelte'
  import Tokenize from './demos/Tokenize.svelte'
</script>

<Page>
  <Block color="#D68881" />
</Page>
<Page>
  <Left>
    <kbd style="font-size:2rem; line-height:2rem">compromise/one</kbd><span class="f2">:</span>
    <div style="margin-top:2rem;" />
    <div class="tab" style="font-size:1.8rem; ">
      - <span style="border-bottom:4px solid #D68881; padding-bottom:5px">&nbsp; just - splitting - it - up &nbsp;</span
      > -
    </div>
    <div class="down tab">turn your novel into JSON.</div>
  </Left>
  <One>
    <Tokenize />
  </One>
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
    <div class="down">the tokenizer's been refined over 8 ruthless github-years</div>
    <!-- <div class="tab f09">and is running at the UN, government orgs, banks, and many software companies.</div> -->
    <!-- <div>this basic thing has been refined for 8 ruthless github-years</div> -->

    <!-- <div class="down f09">it actually just works.</div>
    <div class=" f09">you're allowed to be suspicious of it, though.</div> -->
    <div class="tab down f09">when someone tells you it's impossible, give a polite shrug</div>
    <i class="tab f09">haha, i dunno man!</i>
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

  <One>
    <div class="tab">you can do:</div>
    <ul class="list down f2 blue tab">
      <div class="down">•<a href="#" class="demo"><span class="f2 blue m2">Contractions <Caret /></span></a></div>
      <div class="down">•<a href="#" class="demo"><span class="f2 blue m2">Syllable parsing<Caret /></span> </a></div>
      <div class="down">
        •<a href="#" class="demo"><span class="f2 blue m2">Lookup <Caret /></span> </a>
      </div>
      <div class="down">•<a href="#" class="demo"><span class=" f2 blue m2">Type-ahead <Caret /></span></a></div>
    </ul>
  </One>
  <div>sometimes just splitting things up is enough.</div>
  <div class="m2 sea down f09">or you can swing harder ↓</div>
</Page>

<style>
  .demo {
    margin-top: 2rem;
    text-decoration: underline;
  }
</style>
