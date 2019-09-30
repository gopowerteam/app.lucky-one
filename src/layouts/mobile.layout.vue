<template>
  <q-layout class="mobile-layout" view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="less" scoped>
.mobile-layout {
  background: url('~@/assets/images/mobile-bg.png') no-repeat;
  background-size: cover;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MobileLayout extends Vue {}
</script>
