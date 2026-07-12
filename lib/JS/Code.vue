<script setup>
import { onMounted } from 'vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github.css'
const props = defineProps({
  js: { type: String, default: '' },
  width: { type: String, default: '400px' },
})

hljs.registerLanguage('javascript', javascript)
onMounted(() => {
  hljs.highlightAll()
})
</script>

<template>
  <pre><code class="language-javascript mine" :style="{ width: width }">{{ js }}</code></pre>
</template>

<style scoped>
.mine {
  border: 1px solid lightgrey;
  border-radius: 5px;
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
  display: block;
  width: 400px;
  margin-top: 4rem;
  line-height: 1.6rem;
}
</style>
