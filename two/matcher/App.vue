<script setup>
import Matcher from './Matcher.vue'
import { Page, Back } from '../../lib/index.js'
</script>

<template>
  <div>
    <Back href="https://compromise.cool" />
    <Page bottom="40px">
      <Matcher />
    </Page>
  </div>
</template>
