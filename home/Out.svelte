<script>
  import Page from '../lib/Page.svelte'
  import One from '../lib/One.svelte'
  import Two from '../lib/Two.svelte'
  import Left from '../lib/Left.svelte'
  import Row from '../lib/Row.svelte'
  import Grid from '../lib/Grid/Grid.svelte'
  import Block from '../lib/Block.svelte'
  import friends from './graphs/people.js'
</script>

<!-- <Page /> -->

<Page>
  <!-- <Block color="#bfb0b3" /> -->

  <Left accent="steelblue">
    <div class="down" />
    <hr style="height:3px; background-color:#50617A; width:250px; margin-bottom:3rem; margin-top:4rem;" />

    <div>
      Compromise is an <span class="cherry">open-source</span> <br />
      <div class="tab f09">
        community created <b>in 2010</b>:
      </div>
    </div>
    <div class="f08">we've shipped >100 incremental releases.</div>
    <div>
      {#each friends as friend}
        <span class="friend">{friend}</span>
      {/each}
    </div>
    <hr style="margin-top:3rem;" />
  </Left>
  <Left>
    we think that &nbsp;<i>open-source, web-focused</i>&nbsp; tools
    <!-- <div class="tab f09 down">
      and a <a class="sea b i" href="https://github.com/spencermountain/compromise/graphs/contributors">stupidly-good</a
      >&nbsp; group of contributers -
    </div> -->
    <div class="down f2 fuscia tab">focusing on configurability</div>
    <div class="down f2 tulip" style="margin-top:100px; margin-left:25%;">
      <div class="tab">avoiding fancy engineering</div>
    </div>
    <div class="down " style="margin-top:100px; margin-left:100px;">
      and,
      <div class="tab f2 blue">keeping filesize tiny.</div>
    </div>
    <!-- <div class="down f2 sky" style="margin-top:100px; margin-left:100px;">
      <div class="tab">minimizing jargon</div>
    </div> -->
    <div style="margin-top:100px;" />
    <!-- <div class="down tab">
      that's the best way to build this.
    </div> -->
  </Left>

  <One>
    <!-- <div class="tab">we have published > 100 releases.</div> -->

    <div class="down f09">
      the benevolent dictator,
      <div class="f08  sea">and territorial benefactor</div>
      <div class="tab">
        is <a href="https://spencermounta.in/" class="sky">Spencer Kelly</a>.
      </div>
    </div>
    <!-- <div class="tab">paid work often shows up <a href="">in our public discord</a>.</div> -->
    <div class="down f09">
      PRs are always <a href="https://github.com/spencermountain/compromise/wiki/Contributing" class="link sky i"
        >well-respected.</a
      >
    </div>
  </One>
  <Two>
    <div class="f09 down">Web-Assembly <b>&lt;should definetly happen&gt;</b></div>
    <div class="down"><b class="sea">Non-english versions</b> &lt;are happening and need help&gt;.</div>
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

<style>
  .f08 {
    font-size: 0.7rem;
  }
  .friend {
    font-size: 0.8rem;
    padding: 1.2rem;
    display: inline-block;
    white-space: nowrap;
  }
  @media only screen and (max-width: 600px) {
    .friend {
      font-size: 0.7rem;
      padding: 0.9rem;
    }
  }
</style>
