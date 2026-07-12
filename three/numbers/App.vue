<script setup>
import { ref, computed } from 'vue'
import { Page, Back, Two, CodeMirror, Below, Code } from '../../lib/index.js'
// import nlp from 'compromise/three'

const text = ref(`four hundred seventy two`)
const more = computed(() => {
  return nlp(text.value).numbers().get()
})
const example = `let doc = nlp('seven hundred seaguls')
doc.numbers().toNumber()
doc.text()
// '700 seaguls'
`
console.log(nlp.version)
</script>

<template>
  <div class="col">
    <Back href="https://compromise.cool" />
    <Page bottom="40px">
      <div class="lib">compromise/three</div>
      <div class="plugin">.numbers()</div>
      <div class="down tab desc">interpret written-out numbers, in different formats</div>
      <CodeMirror v-model:text="text" />
      <div class="res">
        <div v-for="(num, i) in more" :key="i">
          {{ num }}
        </div>
      </div>
      <Two>
        <Code :js="example" width="500px" />
      </Two>
    </Page>
    <Below>
      <a href="https://observablehq.com/@spencermountain/compromise-numbers" class="">docs</a>
      <a href="https://github.com/spencermountain/compromise/" class="">github</a>
    </Below>
  </div>
</template>

<style scoped>
.res {
  line-height: 3.5rem;
  margin-top: 6rem;
  margin-left: 2rem;
  margin-bottom: 8rem;
  color: #cc7066;
  font-size: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  align-self: stretch;
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
