<template>
  <q-layout class="browser-layout" view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="less" scoped>
.browser-layout {
  background: url('~@/assets/images/browser-bg.png') no-repeat;
  background-size: cover;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BrowserLayout extends Vue {}
</script>
