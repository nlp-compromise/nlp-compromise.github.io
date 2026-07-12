<script setup>
import { Page } from '../lib/index.js'
import Dates from '../three/dates/Dates.vue'
</script>

<template>
  <Page>
    <div id="dates" class="box">
      <Dates />
    </div>
  </Page>
</template>

<style scoped>
.box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  /* max-width: 600px; */
}
</style>
