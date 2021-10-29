<script>
  import Page from '../lib/Page.svelte'
  import One from '../lib/One.svelte'
  import Two from '../lib/Two.svelte'
  import Left from '../lib/Left.svelte'
  import Row from '../lib/Row.svelte'
  import Grid from '../lib/Grid/Grid.svelte'
  import Block from '../lib/Block.svelte'
</script>

<!-- <Page /> -->

<Page>
  <Block color="#bfb0b3" />
  <One>
    <div>Compromise was created <b>in 2010</b></div>
    <!-- <div class="tab">we have published > 100 releases.</div> -->

    <div class="down f09">
      the benevolent dictator,
      <div class="f09 tab sea">and territorial benefactor -</div>
      <div class="tab">
        is <a href="https://spencermounta.in/" class="sky">Spencer Kelly</a>
      </div>
    </div>
    <!-- <div class="tab">paid work often shows up <a href="">in our public discord</a>.</div> -->
    <div class="down f09">PRs are <span class="sky i">well-respected.</span></div>
  </One>
  <Two>
    <div class="f09 down">Web-Assembly <b>&lt;should definetly happen&gt;</b></div>
    <div class="down"><b class="sea">Non-english versions</b> &lt;are happening slowly&gt;.</div>
  </Two>

  <Left>
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
    </div>
  </Left>

  <One>
    <div class="row " style="font-size:1.5rem;">
      <div>
        <!-- <a href="">
          <img src="" alt="" />
          Discord
        </a> -->
      </div>
      <div>
        <a href="https://observablehq.com/@spencermountain/nlp-compromise">
          <img src="" alt="" />
          Observable
        </a>
      </div>
    </div>
  </One>
  <Two>
    <div style="width:300px;" />
    <Grid seed="114a2660d759a54cd70" />
    MIT
  </Two>
</Page>
