<script>
  import Page from './lib/Page.svelte'
  import One from './lib/One.svelte'
  import Two from './lib/Two.svelte'
  import Left from './lib/Left.svelte'
  import Caret from './lib/Caret.svelte'
  import Block from './lib/Block.svelte'
</script>

<Page>
  <Block color="#D68881" />
</Page>
<Page>
  <Left>
    <kbd style="font-size:3rem; line-height:3rem">compromise/one</kbd>
    <h2>
      <div class="tab">Splitting up text</div>
    </h2>
  </Left>
  <One>
    <!-- <div class="f09">promise -</div> -->
    <!-- <div><kbd>compromise/one</kbd> is a completely uncontroversial way</div> -->
    <div class="f09">you can</div>
    <div class="down f2 tab">turn your novel into JSON</div>
    <div class="tab">
      with a one-liner-

      <div class="tab">in a couple milliseconds</div>
    </div>
    <div class="tab">
      split text into <span class="cherry">sentences</span> and <span class="rose">words</span> and
      <span class="sky">punctuation</span>.
    </div>
    <div class="down">it's been refined over 8 ruthless github-years</div>
    <!-- <div class="tab f09">and is running at the UN, government orgs, banks, and many software companies.</div> -->
    <!-- <div>this basic thing has been refined for 8 ruthless github-years</div> -->

    <!-- <div class="down f09">it actually just works.</div>
    <div class=" f09">you're allowed to be suspicious of it, though.</div> -->
    <div class="tab down f09">when someone tells you it's impossible, give a polite shrug</div>
    <i class="tab f09">haha, i dunno man!</i>
  </One>

  <One>
    <div><kbd>compromise/one</kbd> is like 20kb of javascript:</div>
  </One>
  <!-- <Left>
    <Row>
      <div>it's like 20kb of javascript</div>
      <div>+ symmetric tools</div>
    </Row>
  </Left> -->

  <!-- <Demo /> -->
  <One>
    <div>sometimes tokenization is enough</div>
    <div class="tab">you can do this sorta stuff:</div>
    <ul class="list down">
      <li><a href="#"><span class="choose">Contractions</span> <Caret /></a></li>
      <li><a href="#"><span class="choose">Type-ahead</span> <Caret /></a></li>
      <li><a href="#syllables"><span class="choose">Syllable parsing</span> <Caret /></a></li>
      <li><a href="#"><span class="choose">Indexing and lookup</span> <Caret /></a></li>
    </ul>
  </One>
  <div class="m2 slate down f09">or take a bigger bite ↓</div>
</Page>
