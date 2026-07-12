<script setup>
const props = defineProps({
  href: { type: String, default: 'https://compromise.cool' },
  color: { type: String, default: '#525050' },
})
const hover = false
</script>

<template>
  <a :href="href" class="container">
    <svg width="15px" height="50px" viewBox="0 0 90 170">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linejoin="round">
        <path
          d="M81.5,6 C69.8240666,23.5139001 45.8240666,49.9277635 9.5,85.2415902
        C45.7984814,120.80686 69.7984814,147.22633 81.5,164.5"
          :stroke="color"
          stroke-width="20"
          fill-rule="nonzero"
        />
      </g>
    </svg>
    <div v-if="hover" class="name">spencermountain</div>
  </a>
</template>

<style scoped>
.container {
  margin-left: 2rem;
  margin-bottom: 2rem;
  height: 40px;
}
.name {
  font-size: 0.5rem;
  color: grey;
}
</style>
