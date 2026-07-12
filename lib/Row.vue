<template>
  <div class="row">
    <slot />
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  flex-wrap: nowrap;
  align-self: stretch;
}
</style>
