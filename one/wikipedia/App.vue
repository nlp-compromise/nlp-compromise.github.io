<script setup>
import { ref, computed } from 'vue'
import { Page, Back, Two, CodeMirror, Below, Code } from '../../lib/index.js'
// import nlp from 'compromise/one'
// import plg from 'compromise-wikipedia'
nlp.plugin(compromiseWikipedia)
console.log('nlp', nlp.version)
console.log('compromiseWikipedia', compromiseWikipedia.version)
const text = ref(`wait, there's a new mexico?`)
const more = computed(() => {
  let doc = nlp(text.value)
  return doc.wikipedia().json({ normal: true })
})
const example = `import stats from 'compromise-wikipedia'
nlp.plugin(stats)

let doc = nlp(text)
doc.wikipedia()
`
</script>

<template>
  <div class="col">
    <Back href="https://compromise.cool" />
    <Page bottom="40px">
      <div class="lib">compromise/one</div>
      <div class="plugin blue"><b class="">compromise-wikipedia</b> plugin</div>
      <div class="down tab desc">find common wikipedia articles appearing in a document</div>
      <div class="both">
        <div style="flex-grow: 1">
          <CodeMirror v-model:text="text" />
          <div class="res row">
            <div v-for="(m, i) in more" :key="i" class="word">
              {{ m.normal }}
            </div>
          </div>
        </div>
      </div>
      <Two>
        <Code :js="example" width="500px" />
      </Two>
    </Page>
    <Below>
      <a href="https://observablehq.com/@spencermountain/compromise-wikipedia" class="">docs</a>
      <a href="https://github.com/spencermountain/compromise/tree/master/plugins/wikipedia" class="">github</a>
    </Below>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  align-self: stretch;
}
.word {
  color: #fbfbfb;
  background-color: steelblue;
  padding: 5px;
  margin-bottom: 1.5rem;
  border-radius: 3px;
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
}
</style>
