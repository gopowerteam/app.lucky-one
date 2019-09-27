<template>
  <q-layout class="browser-layout" view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="less" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MobileLayout extends Vue {}
</script>
