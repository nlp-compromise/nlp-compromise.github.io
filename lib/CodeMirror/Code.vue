<script setup>
import { ref, onMounted } from 'vue'
import './style.css'
import CodeMirror from './cm.js'
const props = defineProps({
  text: { type: String, default: 'let x=5;' },
  autofocus: { type: Boolean, default: false },
})
let editor
const el = ref(null)

onMounted(() => {
  // create codemirror instance
  editor = CodeMirror.fromTextArea(el.value, {
    value: 'hello',
    autofocus: props.autofocus,
    viewportMargin: Infinity,
  })

  setTimeout(() => {
    editor.focus()
    editor.setCursor(editor.lineCount(), 0)
  }, 500)
})
</script>

<template>
  <div class="outside">
    <textarea ref="el" class="textarea" tabindex="0" />
  </div>
</template>

<style>
.outside {
  margin: 2rem;
}
.CodeMirror {
  height: auto;
  border-left: 4px solid lightsteelblue !important;
  border-bottom: none !important;
  text-align: left !important;
}
.tag {
  color: #2d85a8;
  border-radius: 5px;
  opacity: 1;
}
</style>
