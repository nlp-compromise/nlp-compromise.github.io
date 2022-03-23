<script>
  import { Page, One, Two, Three, Grid, Caret, Left } from '../lib/index.js'
</script>

<Page>
  <Two />

  <One>
    <div class="f09">okay consider -</div>
    <div class="more m1">
      <div class="i" style="font-size:1.8rem; line-height:2rem;">we put</div>
      <div class="tab f2">all of our information</div>
    </div>
    <div class="tab i f2 rose">into text.</div>
    <div style="margin-top:3rem;" />
    <div class="margin-left:15rem;">
      <Grid seed="45ea07497996cea6af4" />
    </div>
  </One>
  <Two>
    <div class="tab down f09 col">
      <div style="max-width:180px; margin-bottom:1rem;">
        <Grid seed="8935149fa5750c247c9" />
      </div>
      <div>
        and we can
        <span class="sky"> search</span>
        it, or <span class="sky">read</span> it-
      </div>
    </div>
  </Two>
  <One>
    <div style="">
      <span class="down i">but we can't </span>
      <div class="tab ">
        <div class="sea i f2 sky">get</div>
        <div style="position:relative; margin-top:1.2rem;">
          <span class="red "> the </span>
          <span class="red f09 i"> actual </span>
          <span class="sea b i f2" style="top:22px; left:32px; position:absolute;">information</span>
        </div>
      </div>
      <div class=" sky i " style="font-size:2.0rem; margin-left:20px; margin-top:2.3rem;">
        <sup style="font-size:12px;  ">-◡</sup>
        back
        <sub style="font-size:1.1rem;">&nbsp;?</sub>
        <span style="margin-left:0.4rem; font-size:12px;">◜</span>
        <!-- <span style="font-size:1.5rem;" class="cherry">out</span> -->
        <span style="font-size:12px;">-◡</span>
      </div>
      <div class="tab down f09"><span style="font-size:12px;">like</span>, to <i>use it</i>&nbsp; again?</div>
      <Grid seed="d6ba2837558e747e314" />
    </div>
    <div style="margin-top:3rem;" />
    <!-- <div class="down" style="font-size:1.4rem;">things are <i class="sky b">trapped</i>&nbsp; -</div> -->
    <div class="tab down f09">which is weird actually.</div>
    <div class="tab down f09">
      <!-- even in a <i class="sea b">single sentence</i> - -->
      <!-- <div class="tab f09 i">into ambiguities</div> -->
    </div>
    <!-- <div class="tab f09" >words are one-way things,</div> -->
    <!-- <div style="margin-top:2rem;" class="tab f09">text is a dead-end.</div> -->

    <!-- <div class="tab f09">for information.</div> -->
    <!-- <div class="f09 ">this seems like a small issue.</div> -->
    <Grid seed="6daf3fd1a93ca04509c" />
  </One>

  <Two />
  <Two>
    <div class="f09">yet people</div>
    <div class="i sea tab">keep typing</div>
    <div class="f09 tab">more of it.</div>
  </Two>

  <Two>
    <div style="width:250px;" />
    <Grid seed="1a30de68df4ea7e7bef" />
  </Two>
  <!-- <div>why does a sentence have to kill our information?</div> -->

  <One>
    <div class="space" />
    <div>
      <b class="sky f2">compromise</b>&nbsp; is a set
      <div class="tab" style="margin-top:1.4rem;">of tools and standards -</div>
    </div>
    <!-- <div class="tab">trying to build clever ways:</div> -->
    <ul>
      <div>
        to mess with text.
        <!-- <div class="i grey f09 tab2">rejig, and hack it</div> -->
      </div>
      <!-- <div class="f09">so you can make a dent -</div> -->
      <div class="sea down tab f2 " style="position:relative; margin:4rem;">
        like a crowbar, <div style="">for words.</div>
      </div>
      <div class="f09 i down">
        so you can pull a chunk out, or
        <!-- <div class="i grey f09 tab2">like a ping-pong ball.</div> -->
      </div>
      <div class="down">ask pop a question off -</div>
      <div class="down f09">and <i>get something back</i>, from text.</div>
      <!-- <li>
        ways to make typing-interfaces
        <div class="i grey f09 tab2">make them actually good</div>
      </li> -->
    </ul>
    <div class="down" />
  </One>

  <Left>
    <Grid seed="0e387bb94350923b76a" />
    <div class="tab some">
      <div class="sea f09">seriously -</div>
      <kbd class="src">&lt;script src="https://unpkg.com/compromise"&gt;&lt;/script&gt;</kbd>
      <kbd>npm install compromise</kbd>
    </div>
    <Grid seed="80bb8622591df22c704" />
  </Left>
  <Three>
    <div style="width:35px; margin-left:2rem; padding-top:4rem; transform: rotate(-6deg);;">
      <svg
        xmlns:svg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 130 130"
      >
        <path
          d="M 65,29 C 59,19 49,12 37,12 20,12 7,25 7,42 7,75 25,80 65,118 105,80 123,75 123,42 123,25 110,12 93,12 81,12 71,19 65,29 z"
          id="path4"
          style="fill:#cf9b97"
        />
      </svg>
    </div>
    <div class="row">
      <a href="./one/spanish" class="nowrap">
        spanish
        <span style="position:relative; top:0.4rem;"><Caret width={30} color="#72697D" /></span>
      </a>
      <a href="./one/french" style="margin-top:6rem;" class="nowrap">
        french
        <span style="position:relative; top:0.4rem;"><Caret width={30} color="#cf9b97" /></span>
      </a>
      <a href="./one/german" style="margin-top:12rem;" class="nowrap">
        german
        <span style="position:relative; top:0.4rem;"><Caret width={30} color="#2D85A8" /></span>
      </a>
    </div>
  </Three>
</Page>

<style>
  @media only screen and (max-width: 600px) {
    .src {
      font-size: 0.6rem;
    }
    .some {
      margin-left: 0px;
    }
    kbd {
      margin-left: 5px;
    }
  }
  .src {
    font-size: 0.8rem;
    white-space: nowrap;
    overflow-x: scroll;
    max-width: 70vw;
  }
  .nowrap {
    white-space: nowrap;
    font-size: 0.8rem;
  }
</style>
