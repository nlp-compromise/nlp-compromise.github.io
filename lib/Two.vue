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
    <div />
    <div class="box">
      <div class="body" :style="{ borderLeft: `3px solid ${leftColor}` }">
        <div v-if="accentColor" class="line" :style="{ backgroundColor: accentColor }" />
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.column {
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  margin-top: 150px;
  margin-bottom: 150px;
}
.box {
  /* border: 1px solid grey; */
  text-align: center;
}
.body {
  display: inline-block;
  text-align: left;
  padding-left: 1.8rem;
  padding-right: 1.8rem;
}
.line {
  width: 33.3%;
  height: 4px;
  border-radius: 5px;
  margin-bottom: 15px;
}
/* medium */
@media (max-width: 900px) {
  .column {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 600px) {
  .column {
    margin-top: 100px;
    margin-bottom: 100px;
  }
}
</style>
