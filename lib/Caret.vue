<script setup>
const props = defineProps({
  href: { type: String, default: '#' },
  color: { type: String, default: '#50617A' },
  width: { type: [String, Number], default: '65px' },
  top: { type: String, default: '0px' },
})
</script>

<template>
  <a :href="href" class="container" :style="{ position: 'relative', top: top }">
    <svg :width="width" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
      <path
        :fill="color"
        d="M1299 1088q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"
      />
    </svg>
  </a>
</template>

<style scoped>
.container {
  margin-left: 0.1rem;
  /* transition: margin-left 180ms; */
}
@media only screen and (max-width: 600px) {
  .container {
    margin-left: 0rem;
  }
}
</style>
