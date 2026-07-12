<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
const props = defineProps({
  ratio: { type: Number, default: 0.5 },
})
const el = ref(null)
const clientWidth = ref(100)
const height = computed(() => clientWidth.value / props.ratio)
let observer = null
onMounted(() => {
  clientWidth.value = el.value.clientWidth
  observer = new ResizeObserver(() => {
    if (el.value) {
      clientWidth.value = el.value.clientWidth
    }
  })
  observer.observe(el.value)
})
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div ref="el" class="container" :style="{ height: height + 'px' }">
    <slot />
  </div>
</template>

<style scoped>
.container {
  /* border: 1px solid lightgrey; */
  width: 100%;
  height: 50px;
}
</style>
