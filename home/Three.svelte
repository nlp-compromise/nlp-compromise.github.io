<script>
  import { Page, One, Two, Block, Caret, Left } from '../lib/index.js'
</script>

<Block color="#e6b3bc" />

<Page>
  <Left>
    <b id="three" class="sky f2">compromise/three</b>
    <div>helps interpret <span class="plugin">chunks</span>, or groups of words.</div>

    <!-- <kbd style="font-size:2rem; line-height:2rem">compromise/three</kbd><span class="f2">:</span> -->
    <div style="margin-top:2rem;" />
    <!-- <div class="tab" style="font-size:1.8rem; ">
      - <span style="border-bottom:4px solid #D68881; padding-bottom:5px">&nbsp; chunks / phrases / clauses</span> -
    </div> -->
    <!-- <div class="down tab">turn your novel into JSON.</div> -->
  </Left>
  <!-- <One>
    <Chunker />
  </One> -->

  <Left>
    <div>
      <div class="f2">
        <div class="blue">'captain of the football team'</div>
        <div class="tab">is one thing.</div>
      </div>
      <div class="tab">
        <div class="down tab">so is <span class="sea i">'jet skiing'</span></div>
        <div class="down"><span class="sky i">'breaking up'</span></div>
        <div class="down tab">and <span class="rose i">'Calgary Alberta'</span>.</div>
      </div>
    </div>
    <div class="mt4" />
    <div class=" tab">
      <!-- <div>it's too bad -</div> -->
      <div class="">
        a word can be two things,
        <div class="tab f09">or a 1/3rd of a thing.</div>
      </div>
    </div>
  </Left>
  <One>
    <div>in practice, people want a <i class="sea">group</i> -</div>
    <div class="tab i">
      <!-- that do a single thing. -->
      <div class="down sky">and not trip-over some #Adverb,</div>
      <div class="f09 tab">or contraction, or something.</div>
    </div>
    <!-- <div class="down">this is a harder, more-goofy task</div> -->
    <!-- <div>but it is not impossible.</div> -->
  </One>
  <!-- <Left>
    <div class="down " style="margin-top:100px; margin-left:250px;">
      <div class="tab f2 tulip">parse numbers:</div>
    </div>

    <div class="down " style="margin-top:100px; margin-left:100px;">
      <div class="tab f2 blue">pluck-out the details:</div>
    </div>

    <div class="down f2 sky" style="margin-top:100px; margin-left:200px;">
      <div class="tab">convert tense:</div>
    </div>
  </Left> -->
  <Two>
    <div class="down f09">this also lets things happen:</div>
    <ul class="list down">
      <li>
        <a href="./three/numbers" class="nowrap">
          <span class="choose" style="color:white;">Number parsing</span>
          <Caret top="1rem" />
        </a>
      </li>
      <li class="down">
        <a href="./three/redact" class="nowrap">
          <span class="choose" style="color:white;">Redaction</span>
          <Caret top="1rem" />
        </a>
      </li>
      <li class="down">
        <a href="./three/dates" class="nowrap">
          <span class="choose" style="color:white;">Date parsing</span>
          <Caret top="1rem" />
        </a>
      </li>
      <li class="down">
        <a href="./three/verbs" class="nowrap">
          <span class="choose" style="color:white;">Tense conjugation</span>
          <Caret top="1rem" />
        </a>
      </li>
    </ul>
  </Two>

  <div class="row">
    <img class="clean" style="width:250px;" src="./home/img/one.jpg" alt="compromise/one filesize" />
    <img class="clean" style="width:250px;" src="./home/img/two.jpg" alt="compromise/two filesize" />
    <img class="clean" style="width:250px;" src="./home/img/three.jpg" alt="compromise/three filesize" />
  </div>
  <One>
    If you're cautious, and worried this won't work,
    <div class="tab sea">you are very clever.</div>
    <div class="tab down">but remember -</div>
    <div class="f2 down">
      <span class="sky i">"ripped"</span>
      <div class=" tab" style="font-size:1.2rem;">
        can mean <span class="rose i">torn</span> or
        <span class="red i">drunk</span>.
      </div>
    </div>
    <div class="down">
      but both times it's just an <b class="sky i">#Adjective</b>.
    </div>
    <!-- <div class="down tab f09">so the hard problem, still ahead ↓</div> -->
  </One>
</Page>

<style>
  .plugin {
    font-family: monospace, monospace;
    color: #cc8a66;
    margin-top: 1rem;
    margin-left: 4px;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    align-self: stretch;
  }
  .nowrap {
    white-space: nowrap;
    text-decoration: none;
  }
</style>
