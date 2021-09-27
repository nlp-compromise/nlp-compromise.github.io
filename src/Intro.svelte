<script>
  import Page from './lib/Page.svelte'
  import One from './lib/One.svelte'
  import Two from './lib/Two.svelte'
  import Left from './lib/Left.svelte'
  import Row from './lib/Row.svelte'
  import Block from './lib/Block.svelte'
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
  </One>
  <Left>
    <div class="tab down f09">
      and there doesn't seem to be a plan to -
      <div class="tab ">which seems like an issue.</div>
      or maybe it isn't
    </div>
  </Left>
  <One>
    <div class="space" />
    <div>compromise is a loose organization of standards,</div>
    <!-- <div class="tab">trying to build clever ways:</div> -->
    <ul>
      <li>ways to flip text around, and mess with it</li>
      <li>ways to bounce queries off of it</li>
      <li>ways to make text-interfaces less painful</li>
    </ul>
    <One>
      we think <i>open-source, web-focused</i> tools
      <br />
      and a <a href="https://github.com/spencermountain/compromise/graphs/contributors">stupidly-good group</a> of
      contributers -
      <div class="down f2 fuscia tab">focusing on configurability</div>
      <div class="down f2 tulip" style="margin-top:100px; margin-left:200px;">
        <div class="tab">avoiding really fancy engineering.</div>
      </div>
      <div style="margin-top:100px;" />
      <!-- <div class="down tab">with less-fancy engineering</div> -->
      <div class="down tab">
        that's the best way to build
        <div class="tab">such a crazy set of things.</div>
      </div>
    </One>
  </One>
  <One>
    <div class="sea f09">seriously -</div>
    <kbd>&lt;script src="https://unpkg.com/compromise"&gt;&lt;/script&gt;</kbd>
    <div />
    <kbd>npm install compromise</kbd>
  </One>
</Page>
