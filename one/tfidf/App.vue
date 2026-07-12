<script setup>
import { ref, computed } from 'vue'
import { Page, Back, Two, CodeMirror, Below, Code } from '../../lib/index.js'
// import nlp from 'compromise/one'
// import plg from 'compromise-stats'
import { interpolateGnBu } from 'd3-scale-chromatic'
nlp.plugin(compromiseStats)
console.log('nlp', nlp.version)
console.log('compromiseStats', compromiseStats.version)
const max = 7
const text = ref(`i pronounce it to be the most whimsical take of the season`)
const more = computed(() => {
  let doc = nlp(text.value)
  doc.compute('tfidf')
  return doc.terms().json()
})
const example = `import stats from 'compromise-stats'
  nlp.plugin(stats)

  let doc = nlp(text)
  doc.tfidf()

  // or alternatively,
  doc.compute('tfidf').json()
  `
console.log(nlp.version)
</script>

<template>
  <div class="col">
    <Back href="https://compromise.cool" />
    <Page bottom="40px">
      <div class="lib">compromise/two</div>
      <div class="plugin blue"><b class="">compromise-stats</b> plugin</div>
      <div class="plugin">tfidf</div>
      <div class="down tab desc">find the least-common words in a document</div>
      <div class="both">
        <div style="flex-grow: 1">
          <CodeMirror v-model:text="text" />
          <div class="res row">
            <div v-for="(obj, n) in more" :key="n">
              <div
                v-for="(o, i) in obj.terms"
                :key="i"
                class="word"
                :style="{ backgroundColor: interpolateGnBu(o.tfidf / max) }"
              >
                <div>
                  {{ o.normal }}
                </div>
                <div class="smol">{{ o.tfidf }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Two>
        <Code :js="example" width="500px" />
      </Two>
    </Page>
    <Below>
      <a href="https://observablehq.com/@spencermountain/compromise-stats" class="">docs</a>
      <a href="https://github.com/spencermountain/compromise/tree/master/plugins/stats" class="">github</a>
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
  padding: 5px;
  margin-bottom: 1.5rem;
  border-radius: 3px;
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
}
.smol {
  font-size: 0.8rem;
}
</style>
