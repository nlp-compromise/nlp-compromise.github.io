<script setup>
import { ref, computed } from 'vue'
import { Page, Back, Two, CodeMirror, Below, Code } from '../../lib/index.js'
// import nlp from 'compromise/one'
// import speech from 'compromise-speech'
nlp.plugin(compromiseSpeech)
console.log('nlp', nlp.version)
console.log('speech', compromiseSpeech.version)

const text = ref(`edmonton oilers`)
const more = computed(() => {
  let doc = nlp(text.value).compute('syllables')
  return doc.syllables()
})
const example = `import speech from 'compromise-speech'
nlp.plugin(speech)

let doc = nlp(text)
doc.compute('syllables') //kaboom
doc.syllables()

//or alternatively,
doc.json({syllables: true})
`
console.log(nlp.version)
</script>

<template>
  <div class="col">
    <Back href="https://compromise.cool" />
    <Page bottom="40px">
      <div class="lib">compromise/one</div>
      <div class="plugin">compromise-speech</div>
      <div class="down tab desc">tokenize words into approximately spoken syllables</div>
      <CodeMirror v-model:text="text" />
      <div class="res">
        <div v-for="(list, n) in more" :key="n">
          <template v-for="(str, i) in list" :key="i">
            <span class="word">{{ str }}</span>
            <span class="dash">•</span>
          </template>
        </div>
      </div>
      <Two>
        <Code :js="example" width="500px" />
      </Two>
    </Page>
    <Below>
      <a href="https://observablehq.com/@spencermountain/compromise-syllables" class="">docs</a>
      <a href="https://github.com/spencermountain/compromise/" class="">github</a>
    </Below>
  </div>
</template>

<style scoped>
.word {
  display: inline-block;
  margin: 1rem;
  font-size: 3rem;
}
.dash {
  color: grey;
  font-size: 1rem;
}
.res {
  line-height: 3.5rem;
  margin-top: 6rem;
  margin-left: 2rem;
  margin-bottom: 8rem;
  color: #cc7066;
}
.col {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  text-align: center;
  flex-wrap: wrap;
  align-self: stretch;
}
</style>
