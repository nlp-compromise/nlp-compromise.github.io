<script>
  import Page from './lib/Page.svelte'
  import One from './lib/One.svelte'
  import Two from './lib/Two.svelte'
  import Left from './lib/Left.svelte'
  import Caret from './lib/Caret.svelte'
  import Block from './lib/Block.svelte'
</script>

<Page>
  <Block color="#978BA3" />
</Page>
<Page>
  <Left>
    <div class="tab">
      <h2>Step 2: Light grammar</h2>
      <div class="tab">
        <kbd>compromise/two</kbd>
      </div>
    </div>
  </Left>
  <One>
    <div>you can say that <b class="f2 sky">'buffalo'</b> and <b class="f2 sky">'hamilton'</b> are <i>Nouns</i>,</div>
    <div class="tab down i">without actually knowing what they are.</div>
  </One>
  <Two>
    <div class="down">and sometimes this is helpful:</div>
    <ul>
      <kbd class="blue f2 i">it was the #Adjective of times</kbd>
      <kbd class="blue f2 i">simon says #Verb+ the? #Noun+</kbd>
      <kbd class="blue f2 i">#FirstName is on #Ordinal</kbd>
    </ul>
    <div class="tab">
      <a href="https://observablehq.com/@spencermountain/compromise-match-syntax"> - match docs</a>
    </div>
  </Two>
  <One>
    <div>creating these match-templates -</div>
    <div class="tab i">to scoop-up information -</div>
    <div class="tab sky i">like it's some kind of little database -</div>
    <div class="down">it surprising how helpful this is.</div>
    <div class="down">your matches can be clumsy, ad-hoc</div>
    <div class="tab">they can be written by product designers.</div>
  </One>
  <Two>
    <div>
      solutions like this can do a lot of leg-work -
      <div class="tab f2">before some crazy <span class="red ">AI-thing</span> -</div>
      <br />
      or more-often, some tired person's eyes
    </div>
    <ul class="list down">
      <li><a href="#"><span class="choose">Match-syntax</span> <Caret /></a></li>
      <li><a href="#"><span class="choose">Automatic Redaction</span> <Caret /></a></li>
      <li><a href="#"><span class="choose">Chat bots</span> <Caret /></a></li>
    </ul>
  </Two>

  <One>
    <div><kbd>compromise/two</kbd> is 130kb minified</div>
  </One>
  <Two>
    <!-- <div>knowing what's a Noun, or a Verb - this is more-handy, and less-nerdy than you'd think.</div> -->
    <div class="i">so is this gif</div>
    <img src="./assets/jesus.gif" alt="jesus gif" />
  </Two>
</Page>
