<script setup>
import Ratio from '../Ratio.vue'
import combos from './combos'
import { generate, getNums, pick } from './seed'
const props = defineProps({
  images: { type: Array, default: () => [] },
  image: { type: String, default: null },
  ratio: { type: Number, default: 1.618 }, //0.382
  rows: { type: Number, default: 3 },
  cols: { type: Number, default: 3 },
  seed: { type: String, default: null },
})
let demo = false
let seed = props.seed
if (seed === null) {
  seed = generate()
  demo = true
}
let nums = getNums(seed, 65)
let images = props.images.slice()
if (props.image && images.length === 0) {
  images.push(props.image)
}

let colors = pick(combos, nums.pop())
let cells = []
for (let i = 0; i < props.rows * props.cols; i += 1) {
  let type = pick(['empty', 'empty', 'empty', 'color', 'image'], nums.pop())
  if (images.length === 0 && type === 'image') {
    type = 'color'
  }
  let cell = { type: type }
  if (type === 'color') {
    cell.color = pick(colors, nums.pop())
    cell.size = pick(['one', 'one', 'row2', 'col2', 'four'], nums.pop())
  }
  if (type === 'image') {
    cell.image = pick(images, nums.pop())
    cell.size = pick(['one', 'row2', 'col2', 'four'], nums.pop())
  }
  cells.push(cell)
}
</script>

<template>
  <Ratio :ratio="ratio">
    <div
      class="goldGrid"
      :style="{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }"
    >
      <template v-for="(cell, i) in cells" :key="i">
        <div v-if="cell.type === 'empty'" />
        <div
          v-else-if="cell.type === 'color'"
          class="color"
          :class="cell.size"
          :style="{ backgroundColor: cell.color }"
        />
        <div
          v-else-if="cell.type === 'image'"
          class="img"
          :class="cell.size"
          :style="{ backgroundImage: `url(${cell.image})` }"
        />
      </template>
    </div>
  </Ratio>

  <div v-if="demo" class="f1">{{ seed }}</div>
</template>

<style scoped>
.goldGrid {
  display: grid;
  height: 100%;
  margin-top: 60px;
  margin-bottom: 50px;
}
/* tablet - change grid6 to grid3 */
@media (max-width: 900px) {
  .goldGrid {
    grid-template-columns: 1fr 1.618fr 1fr 1.618fr;
    justify-self: stretch;
    /* min-height: 10rem; */
  }
}
.one {
}
.row2 {
  grid-column: span 2;
}
.col2 {
  grid-row: span 2;
}
.four {
  grid-column: span 2;
  grid-row: span 2;
}
.color {
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
}
.img {
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}
</style>
