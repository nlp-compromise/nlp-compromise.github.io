<script setup>
import { ref, computed } from 'vue'
import { CodeMirror } from '../../lib/index.js'
// import nlp from 'compromise/two'
const str = ref(`i have two questions. 'Why lie?' and 'Lies, why?'`)

const res = computed(() => nlp(str.value).json())

const showSpaces = function (str) {
  str = str.replace(/ /g, '_')
  str = str.replace(/\r?\n/g, '⏎')
  return str
}
const showText = function (term) {
  if (term.machine) {
    return `[${term.machine}]`
  }
  return term.text
}
</script>

<template>
  <div class="col">
    <CodeMirror v-model:text="str" />

    <div class="res col">
      <template v-for="(o, n) in res" :key="n">
        <div class="sentence row">
          <template v-for="(term, i) in o.terms" :key="i">
            <div class="space pre" :class="{ empty: !term.pre }">{{ showSpaces(term.pre) }}</div>
            <div class="term">{{ showText(term) }}</div>
            <div class="space post" :class="{ empty: !term.post }">{{ showSpaces(term.post) }}</div>
          </template>
        </div>
        <div v-if="res[n + 1]" class="div" />
      </template>
    </div>
  </div>
</template>
