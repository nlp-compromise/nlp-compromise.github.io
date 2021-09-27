<script>
  import Page from './lib/Page.svelte'
  import One from './lib/One.svelte'
  import Two from './lib/Two.svelte'
  import Left from './lib/Left.svelte'
  import Row from './lib/Row.svelte'
  import Block from './lib/Block.svelte'
</script>

<Page>
  <Block color="#D68881" />
</Page>
<Page>
  <Left>
    <h2>Step 1: Splitting</h2>
    <div class="tab">
      <kbd>compromise/one</kbd>
    </div>
  </Left>
  <One>
    <!-- <div class="f09">promise -</div> -->
    <div>an uncontroversial way</div>
    <div class="tab">to split text into <span class="cherry">sentences</span> and <span class="rose">words</span>.</div>
    <div class="down">it's been refined over 8 ruthless github-years</div>
    <div class="tab f09">and is running at the UN, government orgs, banks, and many software companies.</div>
    <!-- <div>this basic thing has been refined for 8 ruthless github-years</div> -->

    <div class="down f09">it actually just works.</div>
    <div class="down f09">you're allowed to be suspicious of it</div>
    <div class="down f2 tab">turn your novel into JSON, <br />with a one-liner:</div>
    <div class="tab f09">when someone tells you it's impossible, give them a polite shrug</div>
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
    <div>you can do this sorta stuff:</div>
    <ul class="list">
      <li>syllable parsing</li>
      <li>text-typeahead</li>
      <li>indexing and lookup</li>
    </ul>
  </One>
  <div class="m2 slate down f09">or take a bigger bite ↓</div>
</Page>
