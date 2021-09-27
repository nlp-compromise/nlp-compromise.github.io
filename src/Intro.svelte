<script>
  import Page from './lib/Page.svelte'
  import One from './lib/One.svelte'
  import Two from './lib/Two.svelte'
  import Left from './lib/Left.svelte'
  import Row from './lib/Row.svelte'
  import Block from './lib/Block.svelte'
  import Grid from './lib/Grid/Grid.svelte'
</script>

<Page>
  <One />
  <One>
    <div class="f09">okay consider -</div>
    <div class="more f2 m1">all of our information</div>
    <div class="tab i f2 rose">is in text.</div>
    <div style="margin-top:3rem;" />
    <div class="down">and we can't - <span class="blue i " style="font-size:1.8rem;">get it back out</span> -</div>
    <div class="tab down f09">which is crazy actually.</div>
    <!-- <div class="f09 ">this seems like a small issue.</div> -->
    <Grid seed="6daf3fd1a93ca04509c" />
  </One>
  <Left>
    <div class="tab down f09">
      and there doesn't seem to be a plan to - get it out?
      <div class="tab ">
        which seems like an issue.
        <div>or maybe it isn't.</div>
      </div>
    </div>
  </Left>
  <One>
    <div class="space" />
    <div>compromise is a loose organization -</div>
    <div class="f09 tab">a set of standards and tools</div>
    <!-- <div class="tab">trying to build clever ways:</div> -->
    <ul>
      <li>
        ways to flip text around, and mess with it
        <div class="i grey f09 tab2">rejig, and hack it</div>
      </li>
      <li>
        ways to bounce queries off of a text
        <div class="i grey f09 tab2">like a ping-pong ball.</div>
      </li>
      <li>
        ways to make typing-interfaces
        <div class="i grey f09 tab2">make them actually good</div>
      </li>
    </ul>
  </One>
  <Left>
    we think <i>open-source, web-focused</i> tools
    <br />
    and a <a href="https://github.com/spencermountain/compromise/graphs/contributors">stupidly-good group</a> of
    contributers -
    <div class="down f2 fuscia tab">focusing on configurability</div>
    <div class="down f2 tulip" style="margin-top:100px; margin-left:250px;">
      <div class="tab">avoiding fancy engineering</div>
    </div>
    <div class="down f2 sky" style="margin-top:100px; margin-left:100px;">
      <div class="tab">minimizing jargon</div>
    </div>
    <div class="down " style="margin-top:100px; margin-left:100px;">
      and,
      <div class="tab f2 blue">keeping filesize tiny.</div>
    </div>
    <div style="margin-top:100px;" />
    <div class="down tab">
      that's the best way to build
      <div class="tab">a crazy set of things.</div>
    </div>
  </Left>
  <One>
    <Grid seed="0e387bb94350923b76a" />
    <div class="tab">
      <div class="sea f09">seriously -</div>
      <kbd>&lt;script src="https://unpkg.com/compromise"&gt;&lt;/script&gt;</kbd>
      <kbd>npm install compromise</kbd>
    </div>
    <Grid seed="80bb8622591df22c704" />
  </One>
</Page>

<style>
  .tab2 {
    margin-left: 6rem;
  }
</style>
