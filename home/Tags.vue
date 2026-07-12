<script setup>
import Page from '../lib/Page.vue'
import Tree from '../two/tags/Tree.vue'
</script>

<template>
  <Page>
    <div id="tags" class="box">
      <Tree />
    </div>
  </Page>
</template>

<style scoped>
.box {
  margin-top: 4rem;
  margin-bottom: 4rem;
}
</style>
