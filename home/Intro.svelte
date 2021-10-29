<script>
  import Page from '../lib/Page.svelte'
  import One from '../lib/One.svelte'
  import Two from '../lib/Two.svelte'
  import Three from '../lib/Three.svelte'
  import Left from '../lib/Left.svelte'
  import Row from '../lib/Row.svelte'
  import Block from '../lib/Block.svelte'
  import Grid from '../lib/Grid/Grid.svelte'
</script>

<Page>
  <One />
  <One>
    <div class="f09">okay consider that -</div>
    <div class="more f2 m1">all of our information</div>
    <div class="tab i f2 rose">is in text.</div>
    <div style="margin-top:3rem;" />
    <div class="tab down f09">and we can <i class="sea">search</i>&nbsp; it, and <i class="sea">read</i>&nbsp; it-</div>
    <div class="down">
      <span class="f09">but we can't really </span>
      <div class="tab"><i class="sea">get</i>&nbsp; the <i class="sea b">information</i> -</div>
      <div class="down tab cherry i " style="font-size:2.0rem;">... back out ?</div>
    </div>
    <div style="margin-top:3rem;" />
    <div class="down" style="font-size:1.4rem;">things get <i class="sky b">trapped</i>&nbsp; -</div>
    <div class="tab down f09">
      a <i class="sea b">single sentence</i>&nbsp; bungles it all up
      <div class="tab f09 i">in ambiguities</div>
    </div>
    <div class="tab down f09">words are one-way things,</div>
    <div class="tab f09">and text is a dead-end,</div>
    <div class="tab f09">for information.</div>
    <div class="tab down f09">which is weird actually.</div>
    <!-- <div class="f09 ">this seems like a small issue.</div> -->
    <Grid seed="6daf3fd1a93ca04509c" />
  </One>

  <Two />
  <Two>
    <div class="f09">and people</div>
    <div class="i sea tab">keep typing</div>
    <div class="f09 tab">even more of it</div>
  </Two>

  <Two>
    <div style="width:250px;" />
    <Grid seed="1a30de68df4ea7e7bef" />
  </Two>
  <Left>
    <div class="tab down">
      <!-- and there doesn't seem to be a plan to get it back. -->
      <div class="tab down">
        and this seems like an issue,
        <div class="f09">or maybe it isn't.</div>
        <!-- <div class="f09">i don't know</div> -->
      </div>
    </div>
  </Left>
  <One>
    <div class="space" />
    <div>
      <b class="sky f2">compromise</b>&nbsp; is a loose set
      <div class="tab">of tools and standards,</div>
    </div>
    <!-- <div class="tab">trying to build clever ways:</div> -->
    <ul>
      <div>
        to flip text around, and mess with it.
        <!-- <div class="i grey f09 tab2">rejig, and hack it</div> -->
      </div>
      <!-- <div class="f09">so you can make a dent -</div> -->
      <div class="sea down tab f2">like a crowbar, for text.</div>
      <div class="f09 i down">
        so you can pull information out.
        <!-- <div class="i grey f09 tab2">like a ping-pong ball.</div> -->
      </div>
      <div class="down">- or bounce random queries off -</div>
      <div class="down f09">and understand the words, a little.</div>
      <!-- <li>
        ways to make typing-interfaces
        <div class="i grey f09 tab2">make them actually good</div>
      </li> -->
    </ul>
    <div class="down" />
  </One>

  <Left accent="steelblue">
    <div class="down" />
    <hr style="height:3px; background-color:#50617A; width:250px; margin-bottom:3rem; margin-top:4rem;" />
    we think that &nbsp;<i>open-source, web-focused</i>&nbsp; tools
    <div class="tab f09 down">
      and a <a class="sea b i" href="https://github.com/spencermountain/compromise/graphs/contributors">stupidly-good</a
      >&nbsp; group of contributers -
    </div>
    <div class="down f2 fuscia tab">focusing on configurability</div>
    <div class="down f2 tulip" style="margin-top:100px; margin-left:250px;">
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
    <div class="down tab">
      is the best way to build this.
      <!-- <div class="tab">a crazy set of things.</div> -->
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
