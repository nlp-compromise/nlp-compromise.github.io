<script setup>
import { ref, shallowRef } from 'vue'
import CodeMirror from '../../lib/CodeMirror/CodeMirror.vue'
import spacetime from 'spacetime'
// NOTE: the original rendered a <Year> calendar from the (local, svelte)
// 'somehow-calendar' library - that library isn't available, so we show
// the parsed date-range as text instead.
nlp.plugin(compromiseDates)
const text = ref(`meet next weekend`)

const days = ref({})
const start = shallowRef(spacetime())
const end = shallowRef(null)
const today = spacetime.now().format('iso-short')

const highlight = function (str = '') {
  let dates = nlp(str).dates()
  let json = dates.json({ offset: true })
  let offsets = json.map(obj => {
    let offset = obj.offset
    return {
      start: offset.start,
      end: offset.start + offset.length,
      tag: 'tag',
    }
  })
  if (json[0] && json[0]) {
    start.value = spacetime(json[0].dates.start)
    end.value = spacetime(json[0].dates.end)
    let obj = {}
    obj[today] = '#D1D1D1'
    let show = start.value.minus(1, 'second').every('day', end.value).slice(0, 400)
    show.forEach(s => {
      let iso = s.format('iso-short')
      obj[iso] = 'blue'
    })
    days.value = obj
  } else {
    days.value = {}
  }
  return offsets
}
highlight(text.value)

const fmt = function (s) {
  if (s) {
    return s.format('{day-short} {month-short} {date-ordinal} {time}')
  }
  return '-'
}
</script>

<template>
  <div class="box">
    <CodeMirror v-model:text="text" :highlight="highlight" :autofocus="false" />
    <div class="months">
      <!-- <Year :year="start.year()" :date="start.format('iso-short')" :days="days" :showToday="false" /> -->
      <div class="range">
        <div><b>start:</b> {{ fmt(start) }}</div>
        <div><b>end:</b> {{ fmt(end) }}</div>
        <div class="count" v-if="Object.keys(days).length">{{ Object.keys(days).length }} days</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  flex-grow: 1;
  max-width: 500px;
}
.range {
  margin: 1rem 2rem;
  text-align: left;
  line-height: 2rem;
  color: #50617a;
}
.count {
  color: #949a9e;
  font-size: 0.8rem;
}
</style>
