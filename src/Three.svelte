<script>
  import Page from './lib/Page.svelte'
  import One from './lib/One.svelte'
  import Two from './lib/Two.svelte'
  import Left from './lib/Left.svelte'
  import Caret from './lib/Caret.svelte'
  import Block from './lib/Block.svelte'
</script>

<Page>
  <Block color="#e6b3bc" />
</Page>

<Page>
  <Left>
    <h2>Step 3: Chunking</h2>
    <div class="tab">
      <kbd>compromise/three</kbd>
    </div>
  </Left>
  <One>
    <div>
      <div class="f2"><span class="blue">'captain of the football team'</span> is one thing.</div>
      <div class="down">so is <span class="blue i">'jet skiing'</span></div>
      <div class="down">and also <span class="blue i">'breaking up'</span></div>
      <div class="down">and <span class="blue i">'Calgary Alberta'</span>.</div>
    </div>
    <div class="mt4" />
    <div class=" tab">
      <div>it's too bad -</div>
      <div class="tab">a word can be two things, <br />or sometimes 1/3rd of a thing.</div>
      <div>words are tricky.</div>
    </div>
  </One>
  <One>
    <div>in practice, people want a phrase, a clause, or a chunk of words -</div>
    <div class="tab i">
      that do one thing.
      <div class="down f09">and not trip-over some random adverb.</div>
    </div>
    <div class="down">this is a harder, more-goofy task</div>
    <div>but it is not impossible.</div>
    <div class="down">it allows a lot of neat things to happen</div>
  </One>
  <Left>
    <div class="down " style="margin-top:100px; margin-left:250px;">
      <div class="tab f2 tulip">parse numbers:</div>
    </div>

    <div class="down " style="margin-top:100px; margin-left:100px;">
      <div class="tab f2 blue">pluck-out the details:</div>
    </div>

    <div class="down f2 sky" style="margin-top:100px; margin-left:200px;">
      <div class="tab">convert tense:</div>
    </div>
  </Left>
  <Two>
    <div>see also:</div>
    <ul class="list down">
      <li><a href="#"><span class="choose">Date parsing</span> <Caret /></a></li>
      <li><a href="#"><span class="choose">Redaction</span> <Caret /></a></li>
    </ul>
  </Two>
  <One>
    If you’re cautious, and worried this won’t work,
    <div class="tab grey">you are very clever.</div>
    <div>but remember -</div>
    <div class="f2 down">
      <span class="blue i">"ripped"</span> means <span class="rose i">torn</span> or
      <span class="red i">drunk</span>,
      <div class="down">
        but both times it's an <b>#Adjective</b>.
      </div>
    </div>
    <div class="down">that's the big problem, and it's still ahead ↓</div>
  </One>
</Page>
