<script setup>
import { ref, onMounted } from 'vue'
import './style.css'
import CodeMirror from './cm.js'
const props = defineProps({
  text: { type: String, default: '' },
  autofocus: { type: Boolean, default: false },
  onChange: { type: Function, default: null },
  highlight: { type: Function, default: () => {} },
  onEnter: {
    type: Function,
    default: e => {
      return CodeMirror.Pass
    },
  },
})
const emit = defineEmits(['update:text'])
let editor
const el = ref(null)
const clear = function (doc) {
  doc.getAllMarks().forEach(m => m.clear())
}

onMounted(() => {
  // create codemirror instance
  editor = CodeMirror.fromTextArea(el.value, {
    autofocus: false,
    viewportMargin: Infinity,
    extraKeys: {
      Enter: props.onEnter,
    },
  })
  // update each keypress
  editor.on('change', doc => {
    if (props.onChange) {
      props.onChange()
    }
    clear(doc)
    let text = doc.getValue()
    emit('update:text', text)
    let offsets = props.highlight(text) || []
    offsets.forEach(m => {
      let start = doc.posFromIndex(m.start)
      let end = doc.posFromIndex(m.end)
      editor.markText(start, end, {
        className: m.tag,
      })
    })
  })
  CodeMirror.signal(editor, 'change', editor)
  if (props.autofocus === true) {
    setTimeout(() => {
      editor.focus()
      editor.setCursor(editor.lineCount(), 0)
    }, 500)
  }
})
</script>

<template>
  <div class="outside">
    <textarea ref="el" class="textarea" tabindex="0" :value="text" />
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
