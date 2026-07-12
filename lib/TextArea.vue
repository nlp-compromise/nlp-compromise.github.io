<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  value: { type: String, default: '' },
  cb: { type: Function, default: () => {} },
  width: { type: String, default: '60%' },
  readonly: { type: Boolean, default: undefined },
  height: { type: String, default: '' },
  size: { type: String, default: '1.2rem' },
})
const emit = defineEmits(['update:value'])
const val = ref(props.value)
watch(
  () => props.value,
  v => {
    val.value = v
  }
)
const callback = function (e) {
  val.value = e.target.value
  emit('update:value', e.target.value)
  props.cb(e.target.value)
}
</script>

<template>
  <textarea
    class="input"
    :readonly="readonly"
    :value="val"
    :style="{ width: width, height: height, fontSize: size, lineHeight: '1.5rem' }"
    spellcheck="false"
    type="text"
    @input="callback"
  />
</template>

<style scoped>
.input {
  font-family: 'avenir next', avenir, sans-serif;
  display: block;
  padding: 1rem;
  /* padding: 2rem 2rem 2rem 2rem; */
  margin: 0.3em 0.6em 0.3rem 5px;
  width: 60%;
  max-width: 50rem;
  line-height: 24px;
  outline: 0;
  border: 0;
  border-radius: 0.4rem;
  font-style: normal;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.2);
  transition: box-shadow 100ms;
  color: #c4cad5;
  resize: none;
  border-bottom: 2px solid transparent;
  border-left: 4px solid lightgrey;
  color: #577c97;
  box-shadow: 2px 1px 5px 0 rgba(0, 0, 0, 0.2);
  border-bottom: 2px solid lightsteelblue;
  /* white-space: nowrap; */
  /* overflow: auto; */
}
</style>
