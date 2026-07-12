<script setup>
import Page from '../lib/Page.vue'
import One from '../lib/One.vue'
import Two from '../lib/Two.vue'
import Left from '../lib/Left.vue'
import Block from '../lib/Block.vue'
</script>

<template>
  <div>
    <Block color="#6699cc" />

    <Page>
      <Left>
        <kbd style="font-size: 2rem; line-height: 2rem">compromise/four</kbd><span class="f2">:</span>
        <div style="margin-top: 2rem" />
        <div class="tab" style="font-size: 1.8rem">
          - <span style="border-bottom: 4px solid #d68881; padding-bottom: 5px">&nbsp; word-sense</span> -
        </div>
        <!-- <div class="down tab">turn your novel into JSON.</div> -->
      </Left>
      <One>
        hahaha,
        <div class="tab i">ya right.</div>
      </One>
      <Two>
        <div>this work is in development,</div>
        <div class="f09 tab">- probably forever.</div>
        <!-- <div>This is planned for 2022.</div> -->
      </Two>
    </Page>
  </div>
</template>
