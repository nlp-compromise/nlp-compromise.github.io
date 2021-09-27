<script>
  import Page from './lib/Page.svelte'
  import One from './lib/One.svelte'
  import Two from './lib/Two.svelte'
  import Left from './lib/Left.svelte'
  import Row from './lib/Row.svelte'
  import Block from './lib/Block.svelte'
</script>

<Page>
  <Block color="#e6b3bc" />
</Page>

<Page>
  <Left>
    <h2>Step 3: Phrases</h2>
    <div class="tab">
      <kbd>compromise/three</kbd>
    </div>
  </Left>
  <One>
    <div>
      <div class="f2"><span class="blue">'captain of the football team'</span> is one thing.</div>
      <div class="down">so is <span class="blue i">'jet skiing'</span></div>
      <div class="down blue i">'breaking up'</div>
      <div class="down ">and <span class="blue i">'Calgary, Alberta'</span>.</div>
    </div>
    <div class="mt4" />
    <div class=" tab">
      <div>it's too bad -</div>
      <div class="tab">sometimes a word is two things, <br />sometimes a third of a thing.</div>
      <div>words are tricky.</div>
    </div>
  </One>
  <One>
    <div>in practice, people want a phrase, a clause, or a chunk of words -</div>
    <div class="tab i">that do one thing.</div>
    <div class="down">
      this is a harder, more-goofy task <div>but not impossible.</div>
    </div>
    <div class="down">it allows a lot of neat things to happen</div>
  </One>
  <Left>
    <div>
      <div>turn 'four hundred and five' into '405'</div>
      <!-- <Demo /> -->
    </div>
    <div>
      <div>pull-out the details -</div>
      <!-- <Demo /> -->
    </div>
    <div>
      <div>or throw a tense around</div>
      <!-- <Demo /> -->
    </div>
  </Left>
  <Two>
    <ul>
      <li>date parsing</li>
      <li>redaction</li>
      <li>verb-conjugation</li>
    </ul>
  </Two>
  <One>
    If you’re cautious, and worried this won’t work,
    <div class="tab">you are very clever.</div>
    <div>but remember -</div>
    <div class="f2 down">
      when <span class="blue i">"ripped"</span> means <span class="rose i">torn</span> or
      <span class="red i">drunk</span>,
      <div class="down">
        both times it is still an <b>#Adjective</b>.
      </div>
    </div>
    <div class="down">that's a big problem, but still ahead.</div>
  </One>
</Page>
