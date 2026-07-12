<script setup>
import { ref, computed } from 'vue'
import { Page, Back, Two, CodeMirror, Below, Code, TextArea } from '../../lib/index.js'
// import nlp from 'compromise/one'

const words = [
  `bedfordshire`,
  `aberdeenshire`,
  `buckinghamshire`,
  `argyllshire`,
  `bambridgeshire`,
  `cheshire`,
  `ayrshire`,
]
nlp.typeahead(words)

const text = ref(`argyl`)
const more = computed(() => {
  let doc = nlp(text.value).compute('typeahead')
  doc.autoFill()
  return doc.text()
})
const example = `nlp.typeAhead(['argyllshire','bambridgeshire'])

let doc = nlp(text)
doc.compute('typeahead') //kaboom
doc.has('argyllshire') // true
doc.text() // 'argyl'

// make it official
doc.autoFill()
doc.text() // 'argyllshire'
`
console.log(nlp.version)
</script>

<template>
  <div class="col">
    <Back href="https://compromise.cool" />
    <Page bottom="40px">
      <div class="lib">compromise/one</div>
      <div class="plugin">type-ahead</div>
      <div class="down tab desc">assume a word, before it is fully-typed</div>
      <div class="both">
        <div style="flex-grow: 1">
          <CodeMirror v-model:text="text" />
          <div class="res">
            {{ more }}
          </div>
        </div>
        <TextArea width="140px" height="250px" :value="words.join('\n')" size="0.9rem" :readonly="true" />
      </div>
      <Two>
        <Code :js="example" width="500px" />
      </Two>
    </Page>
    <Below>
      <a href="https://observablehq.com/@spencermountain/compromise-typeahead" class="">docs</a>
      <a href="https://github.com/spencermountain/compromise#one" class="">github</a>
    </Below>
  </div>
</template>

<style scoped>
.res {
  line-height: 2.5rem;
  font-size: 2.2rem;
  margin-top: 6rem;
  margin-left: 2rem;
  margin-bottom: 5rem;
  color: #cc7066;
}
</style>
