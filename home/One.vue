<script setup>
import { Page, One, Two, Grid, Caret, Left } from '../lib/index.js'
import Perf from './graphs/Perf.vue'
</script>

<template>
  <!-- <Block color="#D68881" /> -->
  <Page>
    <Left>
      <b id="one" class="sky f2">compromise/one</b>
      <div>is <span class="plugin" style="margin-left: 5px">tokenization</span>.</div>
      <div style="margin-top: 2rem" />
      <div class="desc">flip a novel into JSON</div>
      <div class="tab down">
        split text into <span class="cherry">sentences</span> and <span class="rose">words</span> and
        <span class="sky">punctuation</span>.
        <div class="tab f09">in a couple milliseconds</div>
      </div>
    </Left>

    <One>
      <div class="tab down f09">
        when someone tells you it's too difficult,
        <div class="tab">give a polite shrug.</div>
        <div class="tab i f09 down">haha, i dunno man!</div>
      </div>
    </One>

    <One>
      <div>
        <kbd>compromise/one</kbd>
        <div class="tab">is 40kb of javascript:</div>
      </div>
      <Grid seed="1645e30c3c09ed478e5" />
    </One>
    <Two>
      <div class="down f09">so you can do:</div>
      <ul class="list down">
        <li class="down">
          <a href="./one/lookup" class="nowrap">
            <span class="choose" style="color: white">Quick lookups</span>
            <Caret top="1rem" />
          </a>
        </li>
        <li class="down">
          <a href="./one/typeahead" class="nowrap">
            <span class="choose" style="color: white">TypeAhead</span>
            <Caret top="1rem" />
          </a>
        </li>
        <li class="down">
          <a href="./one/syllables" class="nowrap">
            <span class="choose" style="color: white">Syllable parsing</span>
            <Caret top="1rem" />
          </a>
        </li>
        <li class="down">
          <a href="./one/tfidf" class="nowrap">
            <span class="choose" style="color: white">TFIDF</span>
            <Caret top="1rem" />
          </a>
        </li>
        <li class="down">
          <a href="./one/wikipedia" class="nowrap">
            <span class="choose" style="color: white">Wikipedia Topics</span>
            <Caret top="1rem" />
          </a>
        </li>
      </ul>
    </Two>

    <Left>
      <div class="down col">
        <div>
          <span class="lib">compromise/one</span> is <span class="sea">42kb</span>
        </div>

        <!-- <Filesize /> -->
        <img class="clean" style="width: 80%; max-width: 450px" src="/home/img/one.jpg" alt="compromise/one filesize" />
      </div>
      <div style="max-width: 600px; margin-top: 6rem">
        <Perf />
      </div>
      <div class="f09 right down">
        it does ~800kb of text per second,
        <div>or a bookshelf in 12s.</div>
      </div>
    </Left>
    <div style="margin-top: 6rem; margin-left: 2rem">
      <div>sometimes just splitting things up is enough.</div>
      <!-- <div class="m1">it feels like data now, a little.</div> -->
      <div class="m2 sea down f09">sometimes it's not ↓</div>
    </div>
  </Page>
</template>

<style scoped>
.lib {
  font-family: monospace, monospace;
  border-bottom: 1px solid grey;
  display: inline;
  margin-left: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}
.plugin {
  font-family: monospace, monospace;
  color: #cc8a66;
  margin-top: 1rem;
  margin-left: 5rem;
}
.desc {
  margin-bottom: 4rem;
  opacity: 0.9;
}
.right {
  text-align: right;
}
.clean {
  box-shadow: none;
}
.col {
  display: flex;
  flex-direction: column;
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
