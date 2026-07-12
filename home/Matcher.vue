<script setup>
import { Page } from '../lib/index.js'
import Matcher from '../two/matcher/Matcher.vue'
</script>

<template>
  <Page>
    <div id="matcher" class="box">
      <Matcher />
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
