<script setup>
import colors from './_colors'
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
      <div />
    </div>
  </div>
</template>

<style scoped>
.column {
  text-align: left;
  display: grid;
  grid-template-columns: 2fr 1fr; /* 2/3rds */
  width: 100%;
  margin-top: 150px;
  margin-bottom: 150px;
}
.body {
  /* border: 1px solid grey; */
  display: inline-block;
  text-align: left;
  margin-left: 0.9rem;
  padding-left: 0.9rem;
  padding-right: 1.8rem;
}
.line {
  width: 38.2%;
  height: 5px;
  border-radius: 5px;
  margin-bottom: 15px;
}
/* very-small */
@media (max-width: 600px) {
  .column {
    grid-template-columns: 1fr; /* full-thing */
    margin-top: 100px;
    margin-bottom: 100px;
  }
}
</style>
