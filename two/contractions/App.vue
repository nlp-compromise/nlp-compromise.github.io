<script setup>
import { ref } from 'vue'
import { Page, Back, Two, CodeMirror, Below, Code } from '../../lib/index.js'
// import nlp from 'compromise/two'
const text = ref(`no! we're not gonna take it..`)
const res = ref('')
const json = ref([])
const example = `let doc = nlp('spencer\\'s cool')
doc.has('spencer is')
// true

doc.terms().length
// 3

doc.contractions().expand()
doc.text()
// 'spencer is cool'

// ↓
doc = nlp('spencer\\'s house')
doc.contractions().length
// 0
  `
const onChange = function (txt) {
  let doc = nlp(txt)
  let found = doc.contractions()
  json.value = found.json({ offset: true })
  let offsets = json.value.map(obj => {
    let offset = obj.offset
    return {
      start: offset.start,
      end: offset.start + offset.length,
      tag: 'tag',
    }
  })
  found.expand()
  res.value = doc.text()
  return offsets
}
onChange(text.value)
console.log(nlp.version)
</script>

<template>
  <div>
    <Back href="https://compromise.cool" />
    <Page bottom="40px">
      <div class="lib">compromise/two</div>
      <div class="plugin">contractions</div>
      <div class="down tab desc">pick-apart and work-around implicit words.</div>
      <div style="margin-top: 2rem" />
      <div class="down">
        <CodeMirror v-model:text="text" :highlight="onChange" />
        <div class="res f2">
          <div v-for="(o, n) in json" :key="n" class="row" style="justify-content: flex-start; padding: 2rem">
            <div class="m2 sea" style="min-width: 150px">{{ o.text }}:</div>
            <div class="col sky f1" style="text-align: left; margin-top: 2rem">
              <div v-for="(t, i) in o.terms" :key="i" style="margin-top: 2rem">→ {{ t.machine }}</div>
            </div>
          </div>
        </div>
        <div class="res down f2">
          {{ res }}
        </div>
      </div>

      <Two>
        <Code :js="example" width="500px" />
      </Two>
    </Page>
    <Below>
      <a href="https://observablehq.com/@spencermountain/compromise-contractions" class="">docs</a>
      <a href="https://github.com/spencermountain/compromise#two" class="">github</a>
    </Below>
  </div>
</template>

<style scoped>
.res {
  margin-top: 4rem;
  margin-left: 4rem;
}
</style>
