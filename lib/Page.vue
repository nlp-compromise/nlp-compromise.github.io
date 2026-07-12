<script setup>
import colors from './_colors'
const props = defineProps({
  color: { type: String, default: null },
  bottom: { type: String, default: '140px' },
})
const colorHex = colors[props.color] || props.color
</script>

<template>
  <div class="row">
    <div class="side" />
    <div class="container" :style="{ marginBottom: bottom }">
      <slot />
    </div>
    <div class="side" />
  </div>
</template>

<style scoped>
.container {
  min-height: 800px;
  border-radius: 5px;
  text-align: left;
  padding: 2rem;
  box-shadow: 3px 12px 36px 1px rgba(0, 0, 0, 0.2);
  margin-left: 55px;
  margin-right: 55px;
  margin-bottom: 140px;
  flex-basis: 1200px;
  overflow-x: scroll;
}
.side {
  flex: 1;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  align-self: stretch;
}
/* phones */
@media (max-width: 900px) {
  .container {
    padding: 0.5rem;
    margin: 15px;
  }
}
</style>
