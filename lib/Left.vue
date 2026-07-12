<script setup>
import colors from './_colors.js'
const props = defineProps({
  accent: { type: String, default: '' },
  left: { type: String, default: 'none' },
})
const leftColor = colors[props.left] || props.left
const accentColor = colors[props.accent] || props.accent
</script>

<template>
  <div class="column">
    <div class="body" :style="{ borderLeft: `3px solid ${leftColor}` }">
      <div v-if="accentColor" class="line" :style="{ backgroundColor: accentColor }" />
      <slot />
    </div>
    <div />
  </div>
</template>

<style scoped>
.column {
  text-align: left;
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  margin-top: 150px;
  margin-bottom: 150px;
}
.body {
  text-align: left;
  display: inline-block;
  text-align: left;
  margin-left: 0.9rem;
  padding-left: 0.9rem;
  padding-right: 1.8rem;
}
.line {
  width: 33.3%;
  height: 4px;
  border-radius: 5px;
  margin-bottom: 15px;
}
@media only screen and (max-width: 600px) {
  .body {
    padding-left: 0rem;
    padding-right: 0rem;
  }
}
</style>
