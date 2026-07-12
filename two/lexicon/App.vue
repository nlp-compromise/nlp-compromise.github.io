<script setup>
import { ref } from 'vue'
import { Page, Back, Two, Below, Code, TextArea } from '../../lib/index.js'
import Graph from './Graph.vue'
// import nlp from 'compromise/two'

const example = `let words = nlp.model().one.lexicon
console.log(words)`

const text = ref('climbing')
const lex = nlp.model().one.lexicon
const tag = ref(null)
const onchange = function (txt) {
  if (lex.hasOwnProperty(txt)) {
    tag.value = '#' + lex[txt]
  }
}
onchange(text.value)
console.log(nlp.version)
</script>

<template>
  <div class="col">
    <Back href="https://compromise.cool" />
    <Page bottom="40px">
      <div class="lib">compromise/two/lexicon</div>
      <div class="down tab">our list of known-words</div>
      <div class="m3">
        <Graph />
      </div>
      <div class="m3">
        <table class="w8 mt2 center f1 grey">
          <tbody
            ><tr class="b"><td class="blue top"># of words</td><td class="red top">% coverage</td></tr><tr
              ><td>1</td><td>10%</td></tr
            ><tr><td>100</td><td>50%</td></tr><tr><td>300</td><td>65%</td></tr><tr><td>600</td><td>70%</td></tr><tr
              ><td>1,000</td><td>80%</td></tr
            ><tr><td>5,000</td><td>90%</td></tr><tr><td>10,000</td><td>98%</td></tr><tr><td>14,000</td><td>99.99%</td></tr
            ></tbody
          >
        </table>
      </div>
      <div class="m3 down f09">
        this list is created by storing a small-number of words,
        <div class="tab">and then conjugating all their various forms, at run-time.</div>
      </div>
      <Two>
        if you want to take a look at them, for whatever reason:
        <Code :js="example" width="500px" />
      </Two>

      <Two>
        <div style="flex-grow: 1">
          <div class="top">
            check if a word is in the lexicon:
            <TextArea :value="text" size="25px" :cb="onchange" width="80%" height="30px" />
          </div>
          <div class="res" style="position: relative">
            {{ tag }}
          </div>
        </div>
      </Two>
    </Page>
    <Below>
      <a href="https://observablehq.com/@spencermountain/compromise-lexicon" class="">docs</a>
      <a href="https://github.com/spencermountain/compromise#two" class="">github</a>
    </Below>
  </div>
</template>

<style scoped>
.m3 {
  margin: 3rem;
}
.center {
  text-align: center;
}
.top {
  padding: 1rem;
}

.res {
  line-height: 3.5rem;
  margin-top: 1rem;
  margin-left: 2rem;
  margin-bottom: 8rem;
  color: #cc7066;
  font-size: 2rem;
  max-width: 250px;
}
</style>
