<script setup>
import { ref, shallowRef } from 'vue'
import { Page, Back, One, Two, CodeMirror, Below, Code } from '../../lib/index.js'
// import nlp from 'compromise/two'
const str = ref('the #Noun is #Adjective')
const count = ref(0)
const example = `const doc = nlp('simon says clean the fridge')

// detect a match
let found = doc.has('simon says')
// true

// capture a sub-match
let m = doc.match('simon says [#Verb+]', 0)
m.text() // 'clean'
`
const dropDown = `let fancyMatch = '(foo bar|#Verb) #Adverb?+ end$'
let tokens = nlp.parseMatch(fancyMatch) //flat json
nlp(myText).match(tokens) //works fine
`
const doc = shallowRef(nlp(''))
const res = shallowRef(doc.value.none())
const duration = ref(0)
const loaded = ref(false)

const doit = function () {
  let begin = new Date()
  res.value = doc.value.match(str.value)
  let end = new Date()
  duration.value = end.getTime() - begin.getTime()
}

// load on init
let ps = []
for (let i = 1; i < 2; i += 1) {
  const p = fetch(`https://unpkg.com/nlp-corpus@4.0.0/builds/${i}-doc.txt`)
    .then(response => response.text())
    .then(txt => nlp(txt))
  ps.push(p)
}
Promise.all(ps).then(list => {
  console.log('downloaded')
  doc.value = list[0]
  console.log('parsed')
  count.value += doc.value.length
  doit()
  loaded.value = true
})
console.log(nlp.version)
</script>

<template>
  <div>
    <Back href="https://compromise.cool" />
    <Page bottom="40px">
      <div class="lib">compromise/two</div>
      <div class="plugin">match-syntax</div>
      <div class="down tab desc">run ad-hoc queries on english grammar</div>
      <CodeMirror v-model:text="str" />

      <div v-if="!loaded" class="col" style="align-items: center">...loading documents</div>
      <template v-else>
        <div class="col" style="align-items: center; margin-left: 3rem">
          <div class="f09">searching {{ count.toLocaleString() }} sentences</div>
          <button @click="doit">run</button>

          <!-- sentence-list -->
          <div class="list" style="justify-content: flex-start">
            <div v-for="(o, i) in res.json()" :key="i" style="margin-top: 3rem">
              <span class="choose"> {{ o.text }}</span>
            </div>
          </div>
        </div>
        <div style="margin-top: 2rem; font-size: 0.9rem">{{ res.length }} matches in {{ duration }}ms</div>
      </template>

      <Two>
        <Code :js="example" width="500px" />
      </Two>

      <One>
        The compromise <a href="https://observablehq.com/@spencermountain/compromise-match-syntax">match-syntax</a>
        is designed to vaguely resemble regular expressions:
      </One>
      <ul class="">
        <li>
          <b class="choose">foo</b> - match the word foo
        </li>
        <li>
          <b class="choose">#Noun</b> - match a term's
          <a href="https://observablehq.com/@spencermountain/compromise-tags">part-of-speech tag</a>
        </li>
        <li>
          <b class="choose">(foo|bar)</b> - match one or another
        </li>
        <li>
          <b class="choose">(foo & #Noun)</b> - multiple checks on one word
        </li>
        <li>
          <b class="choose">.</b> - match any word
        </li>
        <li>
          <b class="choose">foo?</b> - allow an optional match
        </li>
        <li>
          <b class="choose">!foo?</b> - ensure a particular word is *not there*
        </li>
        <li>
          <b class="choose">^foo</b> - ensure a word is the first word in a match
        </li>
        <li>
          <b class="choose">foo$</b> - ensure a word is the last word in a match
        </li>
        <li>
          <b class="choose">.+</b> - match any words
        </li>
        <li>
          <b class="choose">.*</b> - match any (or zero) words
        </li>
        <li>
          <b class="choose">/reg/</b> - run a regular-expression on each word
        </li>
        <li>
          <b class="choose">.{{ '{' }}2, 4{{ '}' }}</b> - match 2-to-5 consecutive words
        </li>
        <li>
          <b class="choose">[foo] bar</b> - capture a part of a match
        </li>
      </ul>
      <Two>These sytax elements can be combined to make pretty-complex queries.</Two>
      <Two>
        if you are ever frustrated with the syntax, <br />
        you can always use the internal json tokens, <br />
        for something more complex:

        <Code :js="dropDown" width="600px" />
      </Two>
    </Page>
    <Below>
      <a href="https://observablehq.com/@spencermountain/compromise-match-syntax" class="">docs</a>
      <a href="https://github.com/spencermountain/compromise#two" class="">github</a>
    </Below>
  </div>
</template>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  align-self: stretch;
}
li {
  margin-top: 2rem;
}
</style>
