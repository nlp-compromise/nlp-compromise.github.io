<script setup>
import { computed } from 'vue'
import TextArea from './TextArea.vue'
const props = defineProps({
  text: { type: String, default: '' },
})
const res = computed(() => nlp(props.text).json())
</script>

<template>
  <div>
    <TextArea :value="text" height="1.4rem" />
    <div class="res col">
      <div v-for="(p, n) in res" :key="n" class="row">
        <div v-for="(term, i) in p.terms" :key="i" class="term">
          {{ term.pre }}
          {{ term.text }}
          {{ term.post }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.res {
  min-height: 20px;
  min-width: 300px;
  margin-left: 3rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
  padding-left: 1rem;
  border-left: 2px solid steelblue;
}
.col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  align-self: stretch;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  align-self: stretch;
}
.term {
  margin: 0.5rem;
  border-bottom: 2px solid grey;
}
</style>
