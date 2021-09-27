<script>
  import Page from './lib/Page.svelte'
  import One from './lib/One.svelte'
  import Two from './lib/Two.svelte'
  import Left from './lib/Left.svelte'
  import Row from './lib/Row.svelte'
  import Block from './lib/Block.svelte'
</script>

<!-- <Page /> -->

<Page>
  <Block color="#bfb0b3" />
  <One>
    <div>Compromise was created in 2010 -</div>
    <div class="tab">we have published > 100 releases.</div>
    <div class="down">
      <a href="https://spencermounta.in/" class="sky">Spencer Kelly</a> is the benevolent dictator and territorial benefactor.
    </div>
    <div class="tab">paid work often shows up <a href="">in our public discord</a>.</div>
    <div class="down">PRs are <a href="">well-considered</a> and respected 🔵</div>
    <div class="down">Web-assembly <b>&lt;should definetly happen&gt;</b></div>
    <div class="down">Non-english languages &lt;are happening slowly&gt;:</div>
  </One>
  <One />

  <!-- [graphic of one/two/three lang-coverage] -->
  <div class="row " style="font-size:1.5rem;">
    <div>
      <a href="https://github.com/spencermountain/compromise/">
        <img src="" alt="" />
        Github
      </a>
    </div>
    <div>
      <a href="https://twitter.com/nlp_compromise">
        <img src="" alt="" />
        Twitter
      </a>
    </div>
    <div>
      <a href="">
        <img src="" alt="" />
        Discord
      </a>
    </div>
    <div>
      <a href="https://observablehq.com/@spencermountain/nlp-compromise">
        <img src="" alt="" />
        Observable
      </a>
    </div>
  </div>
  <Left />
</Page>
